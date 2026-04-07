"use client"
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Frosted-glass circular arrow button for month navigation */
export function NavArrow({ direction, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous month" : "Next month"}
      className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95 z-10"
      style={{
        background: "rgba(255,255,255,0.35)",
        backdropFilter: "blur(4px)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
        border: "1px solid rgba(255,255,255,0.5)",
      }}
    >
      {direction === "prev" ? (
        <ChevronLeft size={20} color="#444" />
      ) : (
        <ChevronRight size={20} color="#444" />
      )}
    </button>
  );
}