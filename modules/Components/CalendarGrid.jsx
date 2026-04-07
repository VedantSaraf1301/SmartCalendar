"use client"
import React from "react";
import { DAY_LABELS, YEAR } from "./constants";

/** Ruled notes section on the left side */
function NotesSection() {
  return (
    <div style={{ width: 110, paddingTop: 2, flexShrink: 0 }}>
      <p
        style={{
          fontSize: 9,
          fontWeight: 600,
          color: "#aaa",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: 10,
          fontFamily: "sans-serif",
        }}
      >
        Notes
      </p>

      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          style={{ height: 1, background: "#dedede", marginBottom: 10 }}
        />
      ))}
    </div>
  );
}

/** Day headers row (MON – SUN) */
function DayHeaders() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        marginBottom: 4,
      }}
    >
      {DAY_LABELS.map((label, i) => (
        <div
          key={label}
          style={{
            textAlign: "center",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: i >= 5 ? "#1aaede" : "#999",
            paddingBottom: 4,
            fontFamily: "sans-serif",
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

/** Individual day cell */
function DayCell({ d, index, currentMonth }) {
  const today = new Date();
  const colIndex = index % 7;
  const isWeekend = colIndex >= 5;
  const isCurrent = d.type === "cur";

  const isToday =
    isCurrent &&
    d.day === today.getDate() &&
    currentMonth === today.getMonth() &&
    YEAR === today.getFullYear();

  return (
    <div
      style={{
        textAlign: "center",
        fontSize: 11,
        fontFamily: "sans-serif",
        padding: "3px 0",
        lineHeight: 1.4,
        ...(isToday
          ? {
              background: "#1aaede",
              color: "#fff",
              borderRadius: "50%",
              fontWeight: 700,
              width: 22,
              height: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
            }
          : {
              color: !isCurrent ? "#ccc" : isWeekend ? "#1aaede" : "#555",
              fontWeight: isCurrent ? 500 : 400,
            }),
      }}
    >
      {d.day}
    </div>
  );
}

/** Calendar grid: notes column + day headers + day cells */
export function CalendarGrid({ days, currentMonth }) {
  return (
    <div
      className="flex"
      style={{
        background: "#fafaf8",
        minHeight: 228,
        padding: "14px 14px 18px 14px",
        gap: 12,
      }}
    >
      {/* Notes */}
      <NotesSection />

      {/* Divider */}
      <div
        style={{
          width: 1,
          background: "#e8e8e8",
          alignSelf: "stretch",
          flexShrink: 0,
        }}
      />

      {/* Grid */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <DayHeaders />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            rowGap: 0,
          }}
        >
          {days.map((d, i) => (
            <DayCell key={i} d={d} index={i} currentMonth={currentMonth} />
          ))}
        </div>
      </div>
    </div>
  );
}