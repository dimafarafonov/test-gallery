import "./picker.css";

const VISIBLE_AREA = 30;

const scrollStyles = {
  scrollSnapType: "y mandatory",
  overflow: "scroll",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  transition: "0.5s ease",
  width: "fit-content",
  paddingTop: 50,
  paddingBottom: 50,
  paddingLeft: 10,
  paddingRight: 10,
  height: VISIBLE_AREA,
  fontSize: 20,
} as React.CSSProperties;

export const ScrollDatePicker = () => {
  return (
    <div style={{ display: "flex", gap: 20, position: "relative" }}>
      {/* day */}
      <div style={scrollStyles} className="hide" id="day">
        <div className="child">Wed Jul 11</div>
        <div className="child">Wed Jul 11</div>
        <div className="child">Wed Jul 11</div>
        <div className="child">Wed Jul 11</div>
        <div className="child">Wed Jul 11</div>
        <div className="child">Wed Jul 11</div>
      </div>
      {/* hour */}

      <div style={scrollStyles} className="hide" id="hour">
        <div className="child">1</div>
        <div className="child">2</div>
        <div className="child">3</div>
        <div className="child">4</div>
        <div className="child">5</div>
        <div className="child">6</div>
        <div className="child">6</div>
        <div className="child">7</div>
        <div className="child">8</div>
        <div className="child">9</div>
        <div className="child">10</div>
        <div className="child">11</div>
        <div className="child">12</div>
      </div>
      {/* minutes */}

      <div style={scrollStyles} className="hide" id="min">
        <div className="child">00</div>
        <div className="child">05</div>
        <div className="child">10</div>
        <div className="child">15</div>
        <div className="child">20</div>
        <div className="child">25</div>
        <div className="child">30</div>
        <div className="child">35</div>
        <div className="child">40</div>
        <div className="child">45</div>
        <div className="child">50</div>
        <div className="child">55</div>
      </div>
      <div style={scrollStyles} className="hide" id="unit">
        <div className="child">am</div>
        <div className="child">pm</div>
      </div>
      {/* daytime */}
    </div>
  );
};
