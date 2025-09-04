import type { JSX } from "react";
import { dateIncreament } from "./utils";

export const timePickerValues: Record<"day" | "hour" | "min" | "unit", JSX.Element[]> = {
  day: Array.from({ length: 30 }, (_, i) => {
    const item = dateIncreament(Date.now(), i);
    return (
      <div className="child day" key={i}>
        {item}
      </div>
    );
  }),

  hour: Array.from({ length: 12 }, (_, i) => (
    <div className="child hour" key={i}>
      {i + 1}
    </div>
  )),

  min: Array.from({ length: 12 }, (_, i) => {
    const val = i * 5;
    return (
      <div key={i} className="child min">
        {val || "00"}
      </div>
    );
  }),

  unit: [
    <div key="am" className="child unit">
      am
    </div>,
    <div key="pm" className="child unit">
      pm
    </div>,
  ],
};
