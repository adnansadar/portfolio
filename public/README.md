# Photos to drop in here

Six images are referenced by the site but are **not** in the repo. They live in
the Claude Design project and exceed the design API's 256 KiB per-file fetch
cap, so they had to be left for a manual export.

Export them from
<https://claude.ai/design/p/8be10e99-7f22-4f78-9a3a-388043bd5eaf> (the
`uploads/` folder) and save them here under **exactly** these names:

| File | Used by | Shape |
| --- | --- | --- |
| `hero.jpeg` | Hero portrait | Portrait / square. Focal point near the top — it is cropped at `object-position: 50% 22%` and rendered greyscale until hover. |
| `gallery-01.jpg` | Gallery — Niagara Falls State Park | Landscape, full-bleed |
| `gallery-02.jpg` | Gallery — Portrait by Niagara Falls | Landscape, full-bleed |
| `gallery-03.jpg` | Gallery — UB South Campus | Landscape, full-bleed |
| `gallery-04.jpg` | Gallery — Lake Erie cruise | Landscape, full-bleed |
| `gallery-05.jpg` | Gallery — UB commencement | Landscape, full-bleed |

The gallery slides are `100vw × 100vh` covers, so anything ~2400px wide is
plenty — `next/image` handles the resizing from there.

**Until these exist**, the hero frame and the gallery render as empty dark
boxes and `/_next/image` returns 400 for each. Nothing else on the page is
affected, and no code change is needed once the files land.

Alt text and captions are already written, in
[`src/content/gallery.ts`](../src/content/gallery.ts) and
[`src/content/site.ts`](../src/content/site.ts).

## Already here

- `resume.pdf` — pulled from the design project, linked by all four Download
  Resume buttons.
- `og-image.jpg` — carried over from the previous portfolio.
