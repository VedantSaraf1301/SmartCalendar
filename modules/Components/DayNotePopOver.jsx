"use client";
import { useState, useEffect, useRef } from "react";

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export function DayNotePopover({ year, month, day, initialNote, onSave, onClose }) {
  const [val, setVal] = useState(initialNote ?? "");
  const textareaRef = useRef(null);

  // Auto focus on open
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSave = () => {
    onSave(day, val);
  };

  return (
    // Backdrop
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.25)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Card */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: "20px 20px 16px",
          width: 280,
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <p style={{
          margin: 0,
          fontSize: 13,
          fontWeight: 600,
          color: "#555",
          fontFamily: "sans-serif",
          letterSpacing: "0.04em",
        }}>
          {day} {MONTH_NAMES[month]} {year}
        </p>

        <textarea
          ref={textareaRef}
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder="Add a note for this day..."
          rows={4}
          style={{
            width: "100%",
            resize: "none",
            border: "1px solid #e0e0e0",
            borderRadius: 8,
            padding: "8px 10px",
            fontSize: 13,
            fontFamily: "sans-serif",
            lineHeight: 1.5,
            outline: "none",
            color: "#333",
            boxSizing: "border-box",
          }}
        />

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{
              padding: "6px 14px",
              borderRadius: 7,
              border: "1px solid #e0e0e0",
              background: "transparent",
              fontSize: 13,
              cursor: "pointer",
              color: "#666",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: "6px 14px",
              borderRadius: 7,
              border: "none",
              background: "#1aaede",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}