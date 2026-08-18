export type Ticker = {
  sym: string;
  name: string;
  /** Base price. The widget nudges this by a small random drift on an interval. */
  px: number;
  /** Base percentage change, drifted alongside the price. */
  chg: number;
  pe: string;
  cap: string;
  roe: string;
  alert: string;
};

export const watchlist: Ticker[] = [
  {
    sym: "NVDA",
    name: "NVIDIA Corp",
    px: 178.6,
    chg: 2.13,
    pe: "51.2",
    cap: "$4.31T",
    roe: "118%",
    alert: "> $180",
  },
  {
    sym: "AAPL",
    name: "Apple Inc",
    px: 241.18,
    chg: 0.84,
    pe: "37.4",
    cap: "$3.58T",
    roe: "147%",
    alert: "< $230",
  },
  {
    sym: "MSFT",
    name: "Microsoft Corp",
    px: 512.07,
    chg: -0.42,
    pe: "34.9",
    cap: "$3.80T",
    roe: "34%",
    alert: "> $520",
  },
  {
    sym: "AMD",
    name: "Advanced Micro Devices",
    px: 168.79,
    chg: -1.24,
    pe: "88.1",
    cap: "$273B",
    roe: "8%",
    alert: "none",
  },
];

export const WATCHLIST_TICK_MS = 1800;
export const SPARK_BARS = 12;

/**
 * Deterministic bar heights — the same formula runs on the server and on the
 * client, so the first paint matches and hydration stays clean. Drift is 0
 * until the interval starts in the browser.
 */
export function sparkHeights(rowIndex: number, drift: number): number[] {
  return Array.from(
    { length: SPARK_BARS },
    (_, k) => 26 + ((k * 37 + rowIndex * 53 + Math.round(drift * 40)) % 74)
  );
}
