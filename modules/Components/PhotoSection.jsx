"use client";
import React from "react";
import { YEAR } from "./constants";


//Different types of shapes to use with the images
export default function ChevronBanner({
  monthName,
  fading,
  variant = "chevron",
}) {
  const renderShape = () => {
    switch (variant) {
      case "triangle":
        return <polygon points="0,78 200,30 400,78" fill="url(#chevGrad)" />;

      case "smooth-wave":
        return (
          <path
            d="M0,65 C100,35 100,95 200,65 C300,35 300,95 400,65 L400,78 L0,78 Z"
            fill="url(#chevGrad)"
          />
        );

      case "wave":
        return (
          <path
            d="M0,60 C80,20 120,100 200,60 C280,20 320,100 400,60 L400,78 L0,78 Z"
            fill="url(#chevGrad)"
          />
        );

      case "diagonal":
        return (
          <polygon points="0,78 0,30 400,60 400,78" fill="url(#chevGrad)" />
        );

      case "arc":
        return <path d="M0,78 Q200,20 400,78 Z" fill="url(#chevGrad)" />;

      case "chevron":
      default:
        return (
          <>
            <polygon
              points="0,78 0,54 100,10 200,54 300,10 400,54 400,78"
              fill="rgba(0,80,140,0.25)"
              transform="translate(0,4)"
            />
            <polygon
              points="0,78 0,52 100,8 200,52 300,8 400,52 400,78"
              fill="#1aaede"
            />
            <polygon
              points="0,78 0,52 100,8 200,52 300,8 400,52 400,78"
              fill="url(#chevGrad)"
            />
          </>
        );
    }
  };

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
      >
        {renderShape()}
      </svg>

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
            textShadow: "0 1px 4px rgba(0,0,0,0.2)",
          }}
        >
          {monthName}
        </span>
      </div>
    </div>
  );
}

const MONTH_STYLES = {
  JANUARY: "triangle",
  FEBRUARY: "diagonal",
  MARCH: "arc",
  APRIL: "arc",
  MAY: "wave",
  JUNE: "arc",
  JULY: "diagonal",
  AUGUST: "wave",
  SEPTEMBER: "chevron",
  OCTOBER: "diagonal",
  NOVEMBER: "wave",
  DECEMBER: "wave",
};

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
      <ChevronBanner
        monthName={monthName}
        fading={fading}
        variant={MONTH_STYLES[monthName.toUpperCase()] || "chevron"}
      />
    </div>
  );
}