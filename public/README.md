# Images

All present. Nothing to do here unless you're swapping photos.

| File | Used by | Intrinsic size |
| --- | --- | --- |
| `hero.jpeg` | Hero portrait | 4975×7462 (2:3 portrait) |
| `gallery-01.jpg` | Filmstrip — Niagara Falls State Park | 3072×4080 |
| `gallery-02.jpg` | Filmstrip — Portrait by Niagara Falls | 3072×4080 |
| `gallery-03.jpg` | Filmstrip — UB South Campus | 3072×4080 |
| `gallery-04.jpg` | Filmstrip — Lake Erie cruise | 3072×4080 |
| `gallery-05.jpg` | Filmstrip — UB commencement | 4080×3072 |
| `gallery-06.png` | Filmstrip — Presenting at UB | 570×1008 |
| `gallery-07.jpg` | Filmstrip — Eternal Flame Falls | 3072×4080 |
| `gallery-08.jpg` | Filmstrip — First snow | 2458×3264 |
| `gallery-09.jpg` | Filmstrip — Hills at sunset | 4608×3456 |
| `gallery-10.jpg` | Filmstrip — Lake LaSalle | 3000×4000 |
| `resume.pdf` | All four Download Resume buttons | — |
| `og-image.jpg` | Social card | — |

## Swapping or adding a photo

Each slide's intrinsic `width` and `height` are recorded in
[`src/content/gallery.ts`](../src/content/gallery.ts) — the filmstrip uses them
to set each card's `aspect-ratio`, which is what lets portrait and landscape
photos sit in one row uncropped. **If you replace a file, update its
width/height there too**, or that card will be the wrong shape.

Mixed orientations are fine by design. `gallery-06` is a 9:16 phone still and
renders as a narrow card — that variation is the point.

## A note on sizes

These are camera originals (~38 MB total, hero.jpeg is 37 megapixels).
`next/image` resizes on request, so visitors never download them at full size —
a 1920px hero comes out around 165 KB. The cost is repo weight and a slower
first request per unique size. Resizing the long edges to ~2400px would cut the
folder to 2–3 MB with no visible difference; left as-is deliberately.
