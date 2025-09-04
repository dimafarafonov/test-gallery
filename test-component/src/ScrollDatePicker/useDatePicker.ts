import { useEffect, useMemo, useRef, useState } from "react";
import { parseQueryDateTime } from "./utils";
import { timePickerValues } from "./parts";

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

export const useDatePicker = () => {
  const [date, setDate] = useState({ min: null, day: null, hour: null, unit: null });

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
            setDate((prev) => {
              return {
                ...prev,
                [parentId]: entry.target.textContent,
              };
            });
          }, 500);
          // not perfect, but looks infinite)
          if (timePickerValues[parentId as DebounceKeys] && parentId !== "unit") {
            timePickerValues[parentId as DebounceKeys].forEach((elem) => {
              const newElem = document.createElement("div");
              newElem.textContent = elem.props.children;
              newElem.className = elem.props.className;
              const properRef =
                parentId === "min"
                  ? minutesRef.current
                  : parentId === "day"
                  ? daysRef.current
                  : parentId === "hour"
                  ? hourRef.current
                  : unitRef.current;
              // @ts-expect-error exists
              properRef?.appendChild(newElem);
            });
          }

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
      //@ts-expect-error exists
      const elems = ref!.querySelectorAll(".child");
      elems.forEach((element: Element) => {
        const [, parentId] = element.className.split(" ");
        if (all[parentId as DebounceKeys] === element.textContent) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    });
    // we need this only 1 time
  }, []);

  const fullDate = useMemo(() => {
    if (!date.day) {
      return null;
    }

    return new Date(`${date.day} ${new Date().getFullYear()} ${date.hour}:${date.min} ${date.unit}`);
  }, [date.day, date.hour, date.min, date.unit]);

  return { pickerDate: fullDate, minutesRef, daysRef, hourRef, unitRef };
};
