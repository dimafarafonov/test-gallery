import "./picker.css";
import { useEffect, useRef, useState } from "react";
import { parseQueryDateTime } from "./utils";

const VISIBLE_AREA = 30;
const scrollStyles = {
  scrollSnapType: "y mandatory",
  overflow: "scroll",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  transition: "0.5s ease",
  padding: "55px 0px 55px 0px",
  height: VISIBLE_AREA,
  fontSize: 20,
  color: "black",
} as React.CSSProperties;

const Overlay = () => {
  return (
    <>
      <div
        style={{
          borderRadius: 10,
          top: 0,
          left: 0,
          height: "45%",
          width: "100%",
          position: "absolute",
          background: "inherit",
          opacity: 0.7,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          borderRadius: 10,
          bottom: 0,
          left: 0,
          height: "45%",
          width: "100%",
          position: "absolute",
          background: "inherit",
          opacity: 0.7,
          pointerEvents: "none",
        }}
      />
    </>
  );
};

const debounceTimers: {
  unit: undefined | number;
  day: undefined | number;
  hour: undefined | number;
  min: undefined | number;
} = {
  unit: undefined,
  day: undefined,
  hour: undefined,
  min: undefined,
};

type DebounceKeys = keyof typeof debounceTimers;

export const ScrollDatePicker = () => {
  const [test, setTest] = useState({ min: null, day: null, hour: null, unit: null });

  const minutesRef = useRef(null);
  const daysRef = useRef(null);
  const hourRef = useRef(null);
  const unitRef = useRef(null);

  const all = parseQueryDateTime(window.location.search);
  useEffect(() => {
    const columns = [minutesRef.current, daysRef.current, hourRef.current, unitRef.current];
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          // @ts-expect-error exists
          entry.target.style.transform = `rotateX(45deg)`;
        } else {
          const [, parentId] = entry.target.className.split(" ");
          clearTimeout(debounceTimers[parentId as DebounceKeys]);
          debounceTimers[parentId as DebounceKeys] = setTimeout(() => {
            setTest((prev) => {
              return {
                ...prev,
                [parentId]: entry.target.textContent,
              };
            });
          }, 2000);
          // @ts-expect-error exists
          entry.target.style.transform = ``;
        }
      });
    };

    const toDisconnect = columns.map((ref) => {
      const options = {
        root: ref,
        rootMargin: "0px",
        scrollMargin: "-45% 0px -45% 0px",
      };
      // @ts-expect-error exists
      const children = ref!.querySelectorAll(".child");
      const observer = new IntersectionObserver(callback, options);
      children.forEach((child: Element) => observer.observe(child));
      return observer;
    });
    return () => toDisconnect.forEach((item) => item.disconnect());
  }, []);

  useEffect(() => {
    const columns = [minutesRef.current, daysRef.current, hourRef.current, unitRef.current];

    columns.forEach((ref) => {
      const elems = ref!.querySelectorAll(".child");
      elems.forEach((element: Element) => {
        const [, parentId] = element.className.split(" ");
        if (all[parentId] === element.textContent) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    });
  }, []);

  console.log("all", all);
  return (
    <>
      <div
        id="container"
        style={{
          display: "flex",
          gap: 20,
          position: "relative",
          background: "white",
          borderRadius: 10,
          padding: 40,
        }}
      >
        {/* day */}
        <div style={scrollStyles} className="hide" id="day" ref={daysRef}>
          {Array.from({ length: 25 }, (_, i) => i + 1).map((item, index) => (
            <div className="child day" key={index}>
              {item}
            </div>
          ))}
        </div>
        {/* hour */}

        <div style={scrollStyles} className="hide" id="hour" ref={hourRef}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((item, index) => (
            <div className="child hour" key={index}>
              {item}
            </div>
          ))}
        </div>
        {/* minutes */}

        <div style={scrollStyles} className="hide" id="min" ref={minutesRef}>
          {Array.from({ length: 12 }, (_, i) => i * 5).map((item, index) => (
            <div key={index} className="child min">
              {item || "00"}
            </div>
          ))}
        </div>
        <div style={scrollStyles} className="hide" id="unit" ref={unitRef}>
          <div className="child unit">am</div>
          <div className="child unit">pm</div>
        </div>
        <Overlay />

        {/* daytime */}
      </div>
      <button onClick={() => console.log(test)} type="button">
        Submit
      </button>
    </>
  );
};
