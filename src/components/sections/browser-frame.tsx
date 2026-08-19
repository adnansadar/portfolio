import Image from "next/image";

import { WindowChrome } from "@/components/sections/window-chrome";
import type { Shot } from "@/content/case-studies";

/**
 * A case-study screenshot in a fake browser window — the same chrome as the
 * editor in `TypedCode`, with the live domain where the filename goes.
 *
 * The frame is not decoration: these screenshots run full colour, and the dark
 * bar plus hairline border is what keeps the bright PeopleBlox marketing page
 * from reading as a hole punched in a near-black layout.
 *
 * The domain here is a label, not a link. The Visit button in the study's header
 * band is the single affordance, so there's one obvious way through to the site.
 */
export function BrowserFrame({ shot, domain }: { shot: Shot; domain: string }) {
  return (
    <figure className="panel rounded-[18px] border border-white/[0.09] px-[clamp(22px,3vw,32px)] py-[clamp(22px,3vw,30px)]">
      <div className="rounded-[14px] border border-white/[0.12] bg-[#0A0B0E] px-[18px] pt-4 pb-[18px]">
        <WindowChrome label={domain} />

        {/*
          Aspect ratio comes from the file's intrinsic size, so the shot is
          never cropped whatever the column width.
        */}
        <div
          className="relative mt-3 overflow-hidden rounded-lg border border-white/[0.07]"
          style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
        >
          {/*
            The frame spans the full `shell`, so the hint tracks it:
            min(viewport, 1400px) − 2 × clamp(20px, 5vw, 56px). Left at the old
            half-column `45vw` the browser would pick a candidate at half the
            resolution the frame now renders at.
          */}
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="(min-width: 1400px) 1288px, (min-width: 1120px) calc(100vw - 112px), 90vw"
            className="object-cover object-top"
          />
        </div>
      </div>

      <figcaption className="mt-3.5 text-[12.5px] leading-snug text-ink-400">
        {shot.caption}
      </figcaption>
    </figure>
  );
}
