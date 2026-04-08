"use client"
import React, { useState, useEffect, useRef } from "react";
import { DAY_LABELS, YEAR } from "./constants";
import { NotesSection } from "./NotesSection";
import { useCalendarNotes } from "../CalendarNotes/useCalendarNotes";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/* ─── Day Headers ─────────────────────────────────────────────────────────── */
function DayHeaders() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 4 }}>
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

/* ─── Hover Note Tooltip ──────────────────────────────────────────────────── */
/**
 * Inline editable card that appears above a date cell on hover.
 * Stores the note in localStorage via the onNoteChange callback.
 * colIndex (0-6) is used to flip horizontal alignment on edge columns.
 */
function DayNoteTooltip({ day, month, year, note, onNoteChange, colIndex }) {
  const [val, setVal] = useState(note);
  const [saved, setSaved] = useState(false);
  const textareaRef = useRef(null);

  // Sync local val if external note changes (e.g. month navigation)
  useEffect(() => { setVal(note); }, [note]);

  // Auto-focus textarea when tooltip opens
  useEffect(() => { textareaRef.current?.focus(); }, []);

  // Debounced auto-save — 600 ms after the user stops typing
  useEffect(() => {
    if (val === note) return;
    const t = setTimeout(() => {
      onNoteChange(val);
      setSaved(true);
      setTimeout(() => setSaved(false), 1200);
    }, 600);
    return () => clearTimeout(t);
  }, [val]);

  // Smart horizontal offset so the card doesn't clip the left/right edge
  const isRightEdge = colIndex >= 5;
  const isLeftEdge  = colIndex <= 1;
  const hPos = isRightEdge
    ? { right: 0 }
    : isLeftEdge
    ? { left: 0 }
    : { left: "50%", transform: "translateX(-50%)" };

  // Arrow offset mirrors the card alignment
  const arrowLeft = isRightEdge ? "auto" : isLeftEdge ? 12 : "50%";
  const arrowRight = isRightEdge ? 12 : "auto";
  const arrowTransform = (!isRightEdge && !isLeftEdge) ? "translateX(-50%) rotate(45deg)" : "rotate(45deg)";

  return (
    <div
      onClick={(e) => e.stopPropagation()}   // don't fire range-selection click
      style={{
        position: "absolute",
        bottom: "calc(100% + 8px)",
        zIndex: 200,
        width: 168,
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 8px 28px rgba(0,0,0,0.13), 0 2px 6px rgba(0,0,0,0.07)",
        padding: "10px 10px 8px",
        border: "1px solid #e8eaed",
        ...hPos,
      }}
    >
      {/* Arrow */}
      <div style={{
        position: "absolute",
        bottom: -5,
        left: arrowLeft,
        right: arrowRight,
        transform: arrowTransform,
        width: 10,
        height: 10,
        background: "#fff",
        borderBottom: "1px solid #e8eaed",
        borderRight: "1px solid #e8eaed",
      }} />

      {/* Title */}
      <p style={{
        margin: "0 0 7px",
        fontSize: 10,
        fontWeight: 700,
        color: "#1aaede",
        letterSpacing: "0.05em",
        fontFamily: "sans-serif",
        textTransform: "uppercase",
      }}>
        {day} {MONTH_NAMES[month]}
      </p>

      {/* Editable note textarea */}
      <textarea
        ref={textareaRef}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Add a note for this day…"
        rows={3}
        style={{
          width: "100%",
          resize: "none",
          border: "1px solid #e8eaed",
          borderRadius: 6,
          padding: "5px 7px",
          fontSize: 11,
          fontFamily: "sans-serif",
          lineHeight: 1.5,
          outline: "none",
          color: "#333",
          background: "#f8f9fa",
          boxSizing: "border-box",
        }}
      />

      {/* Save feedback */}
      <div style={{
        marginTop: 4,
        fontSize: 9,
        fontFamily: "sans-serif",
        letterSpacing: "0.04em",
        color: saved ? "#27ae60" : "#bbb",
        transition: "color 0.3s",
      }}>
        {saved ? "✓ Saved" : "Auto-saves as you type"}
      </div>
    </div>
  );
}

/* ─── Day Cell ────────────────────────────────────────────────────────────── */
/**
 * dayNote  – current note string for this day (empty string if none)
 * onNoteChange – callback(text) that persists note to localStorage
 */
function DayCell({ d, index, year, month, startDate, endDate, setStartDate, setEndDate, dayNote, onNoteChange }) {
  const today    = new Date();
  const colIndex = index % 7;
  const isWeekend = colIndex >= 5;
  const isCurrent = d.type === "cur";
  const [showTooltip, setShowTooltip] = useState(false);

  const cellDate = new Date(year, month, d.day);

  const isToday =
    isCurrent &&
    d.day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  /* Range selection click handler */
  const handleClick = () => {
    if (!isCurrent) return;

    if (startDate && !endDate && cellDate.toDateString() === startDate.toDateString()) {
      setStartDate(null);
      return;
    }

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

  /* Range highlight band */
  const isStart   = startDate && cellDate.toDateString() === startDate.toDateString();
  const isEnd     = endDate   && cellDate.toDateString() === endDate.toDateString();
  const isInRange = startDate && endDate && cellDate > startDate && cellDate < endDate;

  const bandHeight = 26;
  const bandColor  = "rgba(26,174,222,0.13)";
  let bandStyle = null;

  if (isStart && endDate) {
    bandStyle = { position: "absolute", top: "50%", transform: "translateY(-50%)", left: "50%", right: 0, height: bandHeight, background: bandColor, zIndex: 0 };
  } else if (isEnd && startDate) {
    bandStyle = { position: "absolute", top: "50%", transform: "translateY(-50%)", left: 0, right: "50%", height: bandHeight, background: bandColor, zIndex: 0 };
  } else if (isInRange) {
    bandStyle = { position: "absolute", top: "50%", transform: "translateY(-50%)", left: 0, right: 0, height: bandHeight, background: bandColor, zIndex: 0 };
  }

  /* Date number circle style */
  let dotStyle = {
    position: "relative", zIndex: 1,
    width: 26, height: 26,
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 auto",
    fontSize: 11, fontFamily: "sans-serif", fontWeight: 500,
    borderRadius: "50%",
    transition: "background 0.15s, color 0.15s, box-shadow 0.15s",
  };

  if (isStart || isEnd) {
    dotStyle = { ...dotStyle, background: "linear-gradient(135deg, #1aaede 0%, #0f8fb8 100%)", color: "#fff", fontWeight: 700, boxShadow: "0 2px 8px rgba(26,174,222,0.45)" };
  } else if (isToday) {
    dotStyle = { ...dotStyle, background: "transparent", color: "#1aaede", fontWeight: 700, border: "2px solid #1aaede" };
  } else if (isInRange) {
    dotStyle = { ...dotStyle, color: "#0f7aaa", fontWeight: 600, background: "transparent" };
  } else {
    dotStyle = { ...dotStyle, color: !isCurrent ? "#ccc" : isWeekend ? "#1aaede" : "#555", fontWeight: isCurrent ? 500 : 400 };
  }

  const hasNote = isCurrent && dayNote && dayNote.trim() !== "";

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => isCurrent && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{ position: "relative", padding: "3px 0", cursor: isCurrent ? "pointer" : "default" }}
    >
      {bandStyle && <div style={bandStyle} />}

      {/* Date number */}
      <div style={dotStyle}>{d.day}</div>

      {/* Blue dot — visible when there's a note */}
      {hasNote && (
        <div style={{
          width: 4, height: 4,
          borderRadius: "50%",
          background: "#1aaede",
          margin: "1px auto 0",
          opacity: 0.85,
        }} />
      )}

      {/* Hover tooltip */}
      {showTooltip && (
        <DayNoteTooltip
          day={d.day}
          month={month}
          year={year}
          note={dayNote}
          onNoteChange={onNoteChange}
          colIndex={colIndex}
        />
      )}
    </div>
  );
}

/* ─── Range Badge ─────────────────────────────────────────────────────────── */
function RangeBadge({ startDate, endDate }) {
  if (!startDate || !endDate) {
    if (startDate) {
      return (
        <div style={{ marginTop: 10, textAlign: "center", fontFamily: "sans-serif", fontSize: 10, color: "#aaa", letterSpacing: "0.08em" }}>
          Select end date…
        </div>
      );
    }
    return null;
  }

  const days = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  return (
    <div style={{ marginTop: 10, display: "flex", justifyContent: "center" }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        background: "linear-gradient(135deg, #1aaede 0%, #0f8fb8 100%)",
        color: "#fff", borderRadius: 20, padding: "4px 14px",
        fontSize: 10, fontFamily: "sans-serif", fontWeight: 700,
        letterSpacing: "0.06em", boxShadow: "0 2px 10px rgba(26,174,222,0.35)",
      }}>
        <span style={{ fontSize: 13 }}>📅</span>
        {days} {days === 1 ? "day" : "days"} selected
      </div>
    </div>
  );
}

/* ─── Calendar Grid ───────────────────────────────────────────────────────── */
export function CalendarGrid({ days, currentMonth, startDate, endDate, setStartDate, setEndDate }) {
  // currentMonth is a plain 0-11 number passed from WallCalendar
  const year  = YEAR;
  const month = currentMonth;

  // Single shared hook instance — all day notes + month note for this month
  const { dayNotes, saveDayNote } = useCalendarNotes(year, month);

  return (
    <div
      className="flex"
      style={{ background: "#fafaf8", minHeight: 228, padding: "14px 14px 18px 14px", gap: 12, flexDirection: "column" }}
    >
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Month note sidebar */}
        <NotesSection key={`${year}-${month}`} year={year} month={month} />

        {/* Dividers */}
        <div className="hidden sm:block" style={{ width: 1, background: "#e8e8e8", alignSelf: "stretch", flexShrink: 0 }} />
        <div className="block sm:hidden" style={{ height: 1, background: "#e8e8e8" }} />

        {/* Calendar grid */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <DayHeaders />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", rowGap: 0 }}>
            {days.map((d, i) => (
              <DayCell
                key={i}
                d={d}
                index={i}
                year={year}
                month={month}
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                // Pass the day's note as a plain string; empty string for prev/next month padding days
                dayNote={d.type === "cur" ? (dayNotes[d.day] ?? "") : ""}
                onNoteChange={(text) => saveDayNote(d.day, text)}
              />
            ))}
          </div>
        </div>
      </div>

      <RangeBadge startDate={startDate} endDate={endDate} />
    </div>
  );
}