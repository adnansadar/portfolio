"use client";

import * as React from "react";

const DOT_MASK = "radial-gradient(58% 52% at 50% 44%, #000, transparent 76%)";
const GLOW_SIZE = 520;
const LERP = 0.14;

/**
 * The page's ambient layer: a parallaxing dot grid, two slowly drifting orbs,
 * and a cursor glow that eases toward the pointer.
 *
 * All four are driven by one rAF loop that writes straight to `element.style`.
 * Nothing here touches React state — at 60fps that would re-render the tree
 * every frame.
 *
 * Renders nothing at all on touch devices (a cursor glow with no cursor) or
 * under prefers-reduced-motion, and registers no listeners in those cases.
 */
export function AmbientField() {
  const [enabled, setEnabled] = React.useState(false);
  const fieldRef = React.useRef<HTMLDivElement>(null);
  const glowRef = React.useRef<HTMLDivElement>(null);
  const orbARef = React.useRef<HTMLDivElement>(null);
  const orbBRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const evaluate = () => setEnabled(!reduced.matches && finePointer.matches);
    evaluate();

    reduced.addEventListener("change", evaluate);
    finePointer.addEventListener("change", evaluate);
    return () => {
      reduced.removeEventListener("change", evaluate);
      finePointer.removeEventListener("change", evaluate);
    };
  }, []);

  React.useEffect(() => {
    if (!enabled) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let frame = 0;

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (glowRef.current) glowRef.current.style.opacity = "1";
    };

    const tick = () => {
      x += (targetX - x) * LERP;
      y += (targetY - y) * LERP;

      const nx = x / window.innerWidth - 0.5;
      const ny = y / window.innerHeight - 0.5;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x - GLOW_SIZE / 2}px, ${
          y - GLOW_SIZE / 2
        }px, 0)`;
      }
      if (fieldRef.current) {
        fieldRef.current.style.transform = `translate3d(${nx * -22}px, ${
          ny * -22
        }px, 0)`;
      }
      // The orbs already own their transform via the drift keyframes, so they
      // are nudged with margins instead.
      if (orbARef.current) orbARef.current.style.marginLeft = `${nx * 46}px`;
      if (orbBRef.current) orbBRef.current.style.marginRight = `${nx * 52}px`;

      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden>
      <div
        ref={fieldRef}
        className="pointer-events-none fixed -inset-[60px] z-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
          maskImage: DOT_MASK,
          WebkitMaskImage: DOT_MASK,
        }}
      />
      <div
        ref={orbARef}
        className="animate-drift-slow pointer-events-none fixed -top-[14vh] -left-[8vw] z-0 h-[52vw] w-[52vw] rounded-full blur-[12px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,.03), transparent 62%)",
        }}
      />
      <div
        ref={orbBRef}
        className="animate-drift-slower pointer-events-none fixed -right-[10vw] -bottom-[22vh] z-0 h-[46vw] w-[46vw] rounded-full blur-[14px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,.025), transparent 64%)",
        }}
      />
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 z-60 rounded-full opacity-0 transition-opacity duration-400"
        style={{
          width: GLOW_SIZE,
          height: GLOW_SIZE,
          background:
            "radial-gradient(circle, rgba(255,255,255,.09), rgba(255,255,255,.03) 42%, transparent 68%)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
