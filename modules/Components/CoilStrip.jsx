"use client"
import React from "react";


const CoilRing = () => (
  <div
    style={{
      width: 13,
      height: 22,
      borderRadius: "50%",
      border: "2px solid #7a7a7a",
      background:
        "linear-gradient(160deg, #e8e8e8 0%, #b8b8b8 30%, #888 55%, #c0c0c0 80%, #d8d8d8 100%)",
      boxShadow:
        "inset 0 1px 2px rgba(255,255,255,0.6), 0 2px 4px rgba(0,0,0,0.35)",
      flexShrink: 0,
    }}
  />
);


export function CoilStrip() {
  return (
    <div
      className="flex items-center justify-around px-3 py-1.25"
      style={{
        background: "linear-gradient(to bottom, #f0f0f0 0%, #e4e4e4 100%)",
        borderBottom: "1px solid #d0d0d0",
        height: 34,
      }}
    >
      {Array.from({ length: 22 }).map((_, i) => (
        <CoilRing key={i} />
      ))}
    </div>
  );
}
