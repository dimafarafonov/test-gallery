import "./picker.css";
import { useDatePicker } from "./useDatePicker";

import { dateIncreament } from "./utils";

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

export const ScrollDatePicker = () => {
  const { minutesRef, unitRef, hourRef, pickerDate, daysRef } = useDatePicker();

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
          {Array.from({ length: 30 }, (_, i) => dateIncreament(Date.now(), i)).map((item, index) => (
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
      <button onClick={() => console.log(pickerDate)} type="button">
        Submit
      </button>
    </>
  );
};
