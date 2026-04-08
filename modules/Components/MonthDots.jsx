"use client"
import React from "react";
import { MONTH_NAMES } from "./constants";

//Logic behind the month dots
export function MonthDots({ currentMonth, onSelect }) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
      {MONTH_NAMES.map((name, i) => (
        <button
          key={name}
          onClick={() => onSelect(i)}
          aria-label={name}
          style={{
            width: i === currentMonth ? 20 : 7,
            height: 7,
            borderRadius: 4,
            background:
              i === currentMonth ? "#1aaede" : "rgba(255,255,255,0.5)",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
            padding: 0,
          }}
        />
      ))}
    </div>
  );
}