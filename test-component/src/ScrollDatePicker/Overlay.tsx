export const Overlay = () => {
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
