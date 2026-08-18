/**
 * A small TypeScript tokenizer using VS Code's Dark+ token colours.
 *
 * Deliberately hand-rolled rather than pulling in Shiki or Prism: this
 * highlights exactly one short, fixed snippet, and a real highlighter would
 * cost far more bundle than the 18 lines it renders.
 */

/** Dark+ token colours, straight from the theme. */
const C = {
  plain: "#D4D4D4",
  keyword: "#569CD6",
  string: "#CE9178",
  number: "#B5CEA8",
  comment: "#6A9955",
  fn: "#DCDCAA",
  ident: "#9CDCFE",
} as const;

export type Token = { text: string; color: string };

const KEYWORDS =
  "export|const|let|var|return|function|new|async|await|import|from|default|class|extends|typeof|instanceof|if|else|for|while|of|in";

const TOKEN = new RegExp(
  [
    String.raw`(?<comment>\/\/[^\n]*|\/\*[\s\S]*?\*\/)`,
    String.raw`(?<template>\`(?:[^\`\\]|\\.)*\`)`,
    String.raw`(?<string>"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')`,
    String.raw`(?<number>\b\d+(?:\.\d+)?\b)`,
    String.raw`(?<keyword>\b(?:${KEYWORDS})\b)`,
    // An identifier followed by a colon is an object key.
    String.raw`(?<prop>[A-Za-z_$][\w$]*(?=\s*:))`,
    // An identifier followed by a paren is being called.
    String.raw`(?<fn>[A-Za-z_$][\w$]*(?=\s*\())`,
    String.raw`(?<ident>[A-Za-z_$][\w$]*)`,
    String.raw`(?<other>[\s\S])`,
  ].join("|"),
  "gy"
);

/** Template literals need a second pass so `${...}` isn't swallowed as string. */
function template(raw: string): Token[] {
  const out: Token[] = [];
  const parts = raw.split(/(\$\{[^}]*\})/g);

  for (const part of parts) {
    if (!part) continue;

    if (part.startsWith("${")) {
      out.push({ text: "${", color: C.keyword });
      out.push({ text: part.slice(2, -1), color: C.ident });
      out.push({ text: "}", color: C.keyword });
    } else {
      out.push({ text: part, color: C.string });
    }
  }

  return out;
}

export function tokenize(source: string): Token[] {
  const out: Token[] = [];
  TOKEN.lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = TOKEN.exec(source)) !== null) {
    const g = match.groups!;

    if (g.template) out.push(...template(g.template));
    else if (g.comment) out.push({ text: g.comment, color: C.comment });
    else if (g.string) out.push({ text: g.string, color: C.string });
    else if (g.number) out.push({ text: g.number, color: C.number });
    else if (g.keyword) out.push({ text: g.keyword, color: C.keyword });
    else if (g.prop) out.push({ text: g.prop, color: C.ident });
    else if (g.fn) out.push({ text: g.fn, color: C.fn });
    else if (g.ident) out.push({ text: g.ident, color: C.ident });
    else out.push({ text: match[0], color: C.plain });
  }

  // Merge neighbouring same-colour tokens so the typewriter renders far fewer
  // spans per frame.
  return out.reduce<Token[]>((acc, token) => {
    const last = acc[acc.length - 1];
    if (last && last.color === token.color) last.text += token.text;
    else acc.push({ ...token });
    return acc;
  }, []);
}

/**
 * Takes the first `n` characters of an already-tokenized source.
 *
 * Tokenizing the whole snippet once and slicing the result is what keeps the
 * colours stable — re-tokenizing a half-typed line would repaint it on every
 * keystroke as the parser changed its mind about unterminated strings.
 */
export function sliceTokens(tokens: Token[], n: number): Token[] {
  const out: Token[] = [];
  let used = 0;

  for (const token of tokens) {
    if (used >= n) break;

    const room = n - used;
    if (token.text.length <= room) {
      out.push(token);
      used += token.text.length;
    } else {
      out.push({ text: token.text.slice(0, room), color: token.color });
      used = n;
    }
  }

  return out;
}
