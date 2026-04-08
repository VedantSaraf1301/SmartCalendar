"use client";
import { useCalendarNotes } from "../CalendarNotes/useCalendarNotes";
import { useState, useEffect } from "react";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];


export function NotesSection({ year, month }) {
  const { monthNote, saveMonthNote } = useCalendarNotes(year, month);
  const [val, setVal] = useState(monthNote);

  // Sync val when month/year changes (user navigates)
  useEffect(() => {
    setVal(monthNote);
  }, [monthNote]);

  // Debounced auto-save
  useEffect(() => {
    const t = setTimeout(() => saveMonthNote(val), 600);
    return () => clearTimeout(t);
  }, [val]);

  return (
    <div className="w-full sm:w-[110px] sm:flex-shrink-0" style={{ paddingTop: 2 }}>
      <p
        style={{
          fontSize: 9,
          fontWeight: 600,
          color: "#aaa",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: 6,
          fontFamily: "sans-serif",
        }}
      >
        {MONTH_NAMES[month]} Notes
      </p>

      <div style={{ position: "relative" }}>
        {/* Ruled lines behind textarea */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: i * 20 + 19,
              height: 1,
              background: "#dedede",
              pointerEvents: "none",
            }}
          />
        ))}

        <textarea
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder="Notes..."
          style={{
            position: "relative",
            width: "100%",
            height: 160,
            resize: "none",
            border: "none",
            background: "transparent",
            fontSize: 12,
            lineHeight: "20px",
            padding: "2px 0 0 0",
            outline: "none",
            fontFamily: "sans-serif",
            color: "#333",
            zIndex: 1,
          }}
        />
      </div>
    </div>
  );
}
