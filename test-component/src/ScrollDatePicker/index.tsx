import "./picker.css";
import { useEffect, useRef } from "react";

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
  transformStyle: "preserve-3d",
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

export const ScrollDatePicker = () => {
  const minutesRef = useRef(null);

  useEffect(() => {
    const options = {
      root: minutesRef.current!,
      rootMargin: "0px",
      scrollMargin: "-45% 0px -45% 0px",
    };

    const children = minutesRef.current!.querySelectorAll(".child");

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          // console.log(`Hidden: ${entry.target.textContent}`);
          // // Trigger your event here
          entry.target.style.transform = `rotateX(45deg)`;
        } else {
          entry.target.style.transform = ``;
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    children.forEach((child: Element) => observer.observe(child));
    return () => observer.disconnect();
  }, [minutesRef]);

  return (
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
      <div style={scrollStyles} className="hide" id="day">
        {Array.from({ length: 25 }, (_, i) => i + 1).map((item) => (
          <div className="child">{item}</div>
        ))}
      </div>
      {/* hour */}

      <div style={scrollStyles} className="hide" id="hour">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((item) => (
          <div className="child">{item}</div>
        ))}
      </div>
      {/* minutes */}

      <div style={scrollStyles} className="hide" id="min" ref={minutesRef}>
        {Array.from({ length: 12 }, (_, i) => i * 5).map((item) => (
          <div className="child">{item || "00"}</div>
        ))}
      </div>
      <div style={scrollStyles} className="hide" id="unit">
        <div className="child">am</div>
        <div className="child">pm</div>
      </div>
      <Overlay />

      {/* daytime */}
    </div>
  );
};
