import "./picker.css";
import { Overlay } from "./Overlay";
import { timePickerValues } from "./parts";
import { useDatePicker } from "./useDatePicker";

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
        <div style={scrollStyles} className="hide" id="day" ref={daysRef}>
          {timePickerValues.day}
        </div>

        <div style={scrollStyles} className="hide" id="hour" ref={hourRef}>
          {timePickerValues.hour}
        </div>

        <div style={scrollStyles} className="hide" id="min" ref={minutesRef}>
          {timePickerValues.min}
        </div>
        <div style={scrollStyles} className="hide" id="unit" ref={unitRef}>
          {timePickerValues.unit}
        </div>
        <Overlay />
      </div>
      <button onClick={() => console.log(pickerDate)} type="button">
        Submit
      </button>
    </>
  );
};
