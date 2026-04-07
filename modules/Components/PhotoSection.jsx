"use client"
import React from "react";
import { YEAR } from "./constants";


function ChevronBanner({ monthName, fading }) {
  return (
    <div
      className="absolute bottom-0 left-0 w-full"
      style={{
        opacity: fading ? 0 : 1,
        transition: "opacity 0.22s ease",
      }}
    >
      <svg
        viewBox="0 0 400 78"
        preserveAspectRatio="none"
        width="100%"
        height="78"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow / depth layer */}
        <polygon
          points="0,78 0,54 100,10 200,54 300,10 400,54 400,78"
          fill="rgba(0,80,140,0.25)"
          transform="translate(0,4)"
        />

        {/* Main blue shape */}
        <polygon
          points="0,78 0,52 100,8 200,52 300,8 400,52 400,78"
          fill="#1aaede"
        />

        {/* Gradient sheen for depth */}
        <polygon
          points="0,78 0,52 100,8 200,52 300,8 400,52 400,78"
          fill="url(#chevGrad)"
        />

        <defs>
          <linearGradient id="chevGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.08)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Year + Month name */}
      <div
        className="absolute right-5 flex flex-col items-end"
        style={{ bottom: 10 }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.92)",
            fontSize: 15,
            fontWeight: 300,
            letterSpacing: "0.18em",
            lineHeight: 1,
            fontFamily: "sans-serif",
          }}
        >
          {YEAR}
        </span>

        <span
          style={{
            color: "#fff",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "0.12em",
            lineHeight: 1.1,
            fontFamily: "sans-serif",
            textShadow: "0 1px 4px rgba(0,0,0,0.2)",
          }}
        >
          {monthName}
        </span>
      </div>
    </div>
  );
}

/** Full photo section: landscape image + chevron banner overlay */
export function PhotoSection({ imageUrl, monthName, fading }) {
  return (
    <div className="relative overflow-hidden" style={{ height: 215 }}>
      <img
        src={imageUrl}
        alt={monthName}
        className="w-full h-full object-cover"
        style={{
          transition: "opacity 0.22s ease",
          opacity: fading ? 0 : 1,
        }}
      />

      <ChevronBanner monthName={monthName} fading={fading} />
    </div>
  );
}