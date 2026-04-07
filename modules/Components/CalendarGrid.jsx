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
function DayCell({ d, index, currentMonth, startDate, endDate, setStartDate, setEndDate }) {
  const today = new Date();
  const colIndex = index % 7;
  const isWeekend = colIndex >= 5;
  const isCurrent = d.type === "cur";

  const cellDate = new Date(YEAR, currentMonth, d.day);

  const isToday =
    isCurrent &&
    d.day === today.getDate() &&
    currentMonth === today.getMonth() &&
    YEAR === today.getFullYear();

  const handleClick = () => {
    if (!isCurrent) return;

    // Clicking the start cap with no end set → deselect
    if (startDate && !endDate && cellDate.toDateString() === startDate.toDateString()) {
      setStartDate(null);
      return;
    }

    // Clicking either cap when a full range is set → clear everything
    if (startDate && endDate &&
      (cellDate.toDateString() === startDate.toDateString() ||
        cellDate.toDateString() === endDate.toDateString())) {
      setStartDate(null);
      setEndDate(null);
      return;
    }

    if (!startDate) {
      setStartDate(cellDate);
    } else if (!endDate) {
      if (cellDate < startDate) {
        setStartDate(cellDate);
      } else {
        setEndDate(cellDate);
      }
    } else {
      setStartDate(cellDate);
      setEndDate(null);
    }
  };

  const isStart = startDate && cellDate.toDateString() === startDate.toDateString();
  const isEnd = endDate && cellDate.toDateString() === endDate.toDateString();
  const isInRange =
    startDate &&
    endDate &&
    cellDate > startDate &&
    cellDate < endDate;

  // ── Band background layer (sits behind the dot) ──────────────────────────
  // The band fills the full cell height on in-range days, and only half on caps.
  let bandStyle = null;
  const bandHeight = 26;
  const bandColor = "rgba(26,174,222,0.13)";

  if (isStart && endDate) {
    // right half only
    bandStyle = {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      left: "50%",
      right: 0,
      height: bandHeight,
      background: bandColor,
      zIndex: 0,
    };
  } else if (isEnd && startDate) {
    // left half only
    bandStyle = {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      left: 0,
      right: "50%",
      height: bandHeight,
      background: bandColor,
      zIndex: 0,
    };
  } else if (isInRange) {
    // full width
    bandStyle = {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      left: 0,
      right: 0,
      height: bandHeight,
      background: bandColor,
      zIndex: 0,
    };
  }

  // ── Dot / number layer ────────────────────────────────────────────────────
  let dotStyle = {
    position: "relative",
    zIndex: 1,
    width: 26,
    height: 26,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    fontSize: 11,
    fontFamily: "sans-serif",
    fontWeight: 500,
    borderRadius: "50%",
    transition: "background 0.15s, color 0.15s, box-shadow 0.15s",
  };

  if (isStart || isEnd) {
    dotStyle = {
      ...dotStyle,
      background: "linear-gradient(135deg, #1aaede 0%, #0f8fb8 100%)",
      color: "#fff",
      fontWeight: 700,
      boxShadow: "0 2px 8px rgba(26,174,222,0.45)",
    };
  } else if (isToday) {
    dotStyle = {
      ...dotStyle,
      background: "transparent",
      color: "#1aaede",
      fontWeight: 700,
      border: "2px solid #1aaede",
    };
  } else if (isInRange) {
    dotStyle = {
      ...dotStyle,
      color: "#0f7aaa",
      fontWeight: 600,
      background: "transparent",
    };
  } else {
    dotStyle = {
      ...dotStyle,
      color: !isCurrent ? "#ccc" : isWeekend ? "#1aaede" : "#555",
      fontWeight: isCurrent ? 500 : 400,
    };
  }

  return (
    <div
      onClick={handleClick}
      style={{
        position: "relative",
        padding: "3px 0",
        cursor: isCurrent ? "pointer" : "default",
      }}
    >
      {bandStyle && <div style={bandStyle} />}
      <div style={dotStyle}>{d.day}</div>
    </div>
  );
}

/** Day-count badge shown when a range is selected */
function RangeBadge({ startDate, endDate }) {
  if (!startDate || !endDate) {
    if (startDate) {
      return (
        <div
          style={{
            marginTop: 10,
            textAlign: "center",
            fontFamily: "sans-serif",
            fontSize: 10,
            color: "#aaa",
            letterSpacing: "0.08em",
          }}
        >
          Select end date…
        </div>
      );
    }
    return null;
  }

  const ms = endDate - startDate;
  const days = Math.round(ms / (1000 * 60 * 60 * 24)) + 1; // inclusive

  return (
    <div
      style={{
        marginTop: 10,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "linear-gradient(135deg, #1aaede 0%, #0f8fb8 100%)",
          color: "#fff",
          borderRadius: 20,
          padding: "4px 14px",
          fontSize: 10,
          fontFamily: "sans-serif",
          fontWeight: 700,
          letterSpacing: "0.06em",
          boxShadow: "0 2px 10px rgba(26,174,222,0.35)",
        }}
      >
        <span style={{ fontSize: 13 }}>📅</span>
        {days} {days === 1 ? "day" : "days"} selected
      </div>
    </div>
  );
}

/** Calendar grid: notes column + day headers + day cells */
export function CalendarGrid({ days, currentMonth, startDate, endDate, setStartDate, setEndDate }) {
  return (
    <div
      className="flex"
      style={{
        background: "#fafaf8",
        minHeight: 228,
        padding: "14px 14px 18px 14px",
        gap: 12,
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", gap: 12 }}>
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
              <DayCell
                key={i}
                d={d}
                index={i}
                currentMonth={currentMonth}
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Range badge */}
      <RangeBadge startDate={startDate} endDate={endDate} />
    </div>
  );
}