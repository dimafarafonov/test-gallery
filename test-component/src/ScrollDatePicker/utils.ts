// http://localhost:5173/?date=2025-09-03&time=14:30
export function parseQueryDateTime(search: string) {
  const params = new URLSearchParams(search);

  const day = dateFormat(params.get("date")!); // "2025-09-03"
  const timeStr = params.get("time"); // "14:30"

  let hour = 0;
  let minutes = 0;
  let unit = "AM";

  if (timeStr) {
    const [h, m] = timeStr.split(":").map(Number);
    hour = h;
    minutes = m;

    if (hour >= 12) {
      unit = "pm";
      if (hour > 12) hour -= 12; // 13 → 1, 14 → 2 і т.д.
    } else {
      unit = "am";
      if (hour === 0) hour = 12; // 0:30 → 12:30 AM
    }
  }

  return {
    day: String(day) || null,
    hour: String(hour) || null,
    min: String(minutes - (minutes % 5)) || null,
    unit: unit || null,
  };
}

export function dateIncreament(timestamp: number, dayIncrement: number) {
  const date = new Date(timestamp);

  date.setDate(date.getDate() + dayIncrement);

  return dateFormat(date);
}

function dateFormat(date: string | number | Date) {
  return new Date(date)
    .toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
    .replace(",", "");
}
