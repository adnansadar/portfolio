export type Stat = {
  /** The numeric part that counts up on scroll. */
  value: number;
  /** Rendered before the number, e.g. the minus in "−30%". */
  prefix?: string;
  /** Rendered after the number in a dimmer colour, e.g. "+" or "%". */
  suffix?: string;
  label: string;
};

export const stats: Stat[] = [
  {
    value: 10000,
    suffix: "+",
    label: "US equities served with live ratios & charting",
  },
  {
    value: 5,
    label: "Frontend engineers led as founding engineer",
  },
  {
    value: 30,
    suffix: "%",
    label: "Fewer server API calls via RTK Query caching",
  },
  {
    value: 25,
    suffix: "%",
    label: "Delivery-workflow efficiency gain across teams",
  },
];

export const statsRule = "01 — WHAT THE NUMBERS SAY";
