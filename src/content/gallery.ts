export type Slide = {
  src: string;
  /** Intrinsic size — drives each card's aspect ratio so nothing is cropped. */
  width: number;
  height: number;
  alt: string;
  title: string;
  caption: string;
};

/**
 * Mixed portrait and landscape on purpose: the filmstrip sizes every card to a
 * fixed height and lets the width follow the aspect ratio, so the varied
 * shapes read as intentional rather than as bad crops.
 *
 * Titles and captions for 01–05 come from the design. Those for 06–10 were
 * written from the photos themselves — worth a pass to correct the locations.
 */
export const gallery: Slide[] = [
  {
    src: "/gallery-01.jpg",
    width: 3072,
    height: 4080,
    alt: "Niagara Falls seen from the American side on an overcast day",
    title: "Niagara Falls State Park",
    caption: "The American side, on an overcast October afternoon.",
  },
  {
    src: "/gallery-02.jpg",
    width: 3072,
    height: 4080,
    alt: "Adnan standing at the upper rapids of Niagara Falls",
    title: "Portrait by Niagara Falls",
    caption: "Early morning at the upper rapids.",
  },
  {
    src: "/gallery-03.jpg",
    width: 3072,
    height: 4080,
    alt: "Hayes Hall at the University at Buffalo South Campus",
    title: "UB South Campus",
    caption: "Hayes Hall — University at Buffalo.",
  },
  {
    src: "/gallery-04.jpg",
    width: 3072,
    height: 4080,
    alt: "Buffalo harbour seen from a Lake Erie cruise boat",
    title: "Lake Erie cruise",
    caption: "Buffalo harbour, first American summer.",
  },
  {
    src: "/gallery-05.jpg",
    width: 4080,
    height: 3072,
    alt: "Adnan at the University at Buffalo commencement ceremony",
    title: "UB commencement",
    caption: "MS Computer Science, University at Buffalo — December 2025.",
  },
  {
    src: "/gallery-06.png",
    width: 570,
    height: 1008,
    alt: "Adnan presenting at a podium in a University at Buffalo lecture hall",
    title: "Presenting at UB",
    caption: "Talking through a project in a Davis Hall lecture theatre.",
  },
  {
    src: "/gallery-07.jpg",
    width: 3072,
    height: 4080,
    alt: "Adnan standing in front of a layered shale waterfall in an autumn gorge",
    title: "Gorge trail",
    caption: "Shale ledges and a thin waterfall, late in the season.",
  },
  {
    src: "/gallery-08.jpg",
    width: 2458,
    height: 3264,
    alt: "Adnan standing in fresh snow beneath a tree still holding autumn leaves",
    title: "First snow",
    caption: "The leaves hadn't fallen yet and the snow already had.",
  },
  {
    src: "/gallery-09.jpg",
    width: 4608,
    height: 3456,
    alt: "A figure silhouetted against a hazy sunset over rolling hills",
    title: "Hills at sunset",
    caption: "Hazy ridgelines, a long way from Buffalo.",
  },
  {
    src: "/gallery-10.jpg",
    width: 3000,
    height: 4000,
    alt: "Adnan by a lake on a clear day, a white monument on the far bank",
    title: "By the water",
    caption: "Blue sky, still water, a monument on the far bank.",
  },
];

export const galleryEyebrow = "OFF THE CLOCK — BUFFALO, NIAGARA & IN BETWEEN";

/** One full pass of the strip. Slow enough to read as drift, not motion. */
export const MARQUEE_SECONDS = 80;
