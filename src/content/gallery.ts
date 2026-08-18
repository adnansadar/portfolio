export type Slide = {
  src: string;
  alt: string;
  title: string;
  caption: string;
};

export const gallery: Slide[] = [
  {
    src: "/gallery-01.jpg",
    alt: "Niagara Falls seen from the American side on an overcast day",
    title: "Niagara Falls State Park",
    caption: "The American side, on an overcast October afternoon.",
  },
  {
    src: "/gallery-02.jpg",
    alt: "Adnan standing at the upper rapids of Niagara Falls",
    title: "Portrait by Niagara Falls",
    caption: "Early morning at the upper rapids.",
  },
  {
    src: "/gallery-03.jpg",
    alt: "Hayes Hall at the University at Buffalo South Campus",
    title: "UB South Campus",
    caption: "Hayes Hall — University at Buffalo.",
  },
  {
    src: "/gallery-04.jpg",
    alt: "Buffalo harbour from a Lake Erie cruise boat",
    title: "Lake Erie cruise",
    caption: "Buffalo harbour, first American summer.",
  },
  {
    src: "/gallery-05.jpg",
    alt: "Adnan at the University at Buffalo commencement ceremony",
    title: "UB commencement",
    caption: "MS Computer Science, University at Buffalo — December 2025.",
  },
];

export const galleryEyebrow = "OFF THE CLOCK — BUFFALO, NIAGARA & IN BETWEEN";
export const GALLERY_INTERVAL_MS = 3000;
