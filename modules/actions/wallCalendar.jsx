"use client"
import React, { useState, useEffect } from "react";
import { MONTH_NAMES, MONTH_IMAGES, YEAR } from "../Components/constants";
import { getCalendarGrid } from "../Components/utils";
import { CoilStrip } from "../Components/CoilStrip";
import { PhotoSection } from "../Components/PhotoSection";
import { CalendarGrid } from "../Components/CalendarGrid";
import { MonthDots } from "../Components/MonthDots";
import { NavArrow } from "../Components/NavArrow";

/** Metallic nail/tack that the calendar hangs from */
function WallNail() {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 z-30 flex flex-col items-center"
      style={{ top: -32 }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 30%, #f5f5f5 0%, #c0c0c0 40%, #888 70%, #666 100%)",
          boxShadow:
            "0 3px 8px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.7)",
        }}
      />
      <div
        style={{
          width: 2,
          height: 18,
          background: "linear-gradient(to bottom, #bbb, #777)",
        }}
      />
    </div>
  );
}

/** Stacked paper layers peeking below the calendar card */
function PageStack() {
  return (
    <>
      <div
        className="absolute bg-white"
        style={{
          height: 6,
          bottom: -4,
          left: 4,
          right: 4,
          borderRadius: "0 0 8px 8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          zIndex: -1,
        }}
      />
      <div
        className="absolute bg-white"
        style={{
          height: 5,
          bottom: -8,
          left: 8,
          right: 8,
          borderRadius: "0 0 6px 6px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          zIndex: -2,
        }}
      />
    </>
  );
}

/** Wall texture overlay */
function WallTexture() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='none'/%3E%3Ccircle cx='1' cy='1' r='0.5' fill='rgba(0,0,0,0.04)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
      }}
    />
  );
}

/** Main wall calendar component */
export function WallCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [fading, setFading] = useState(false);
  const [startDate,setStartDate] = useState(null);
  const [endDate,setEndDate] = useState(null);

  const calendarDays = getCalendarGrid(YEAR, currentMonth);

  const changeMonth = (delta) => {
    setFading(true);
    setTimeout(() => {
      setCurrentMonth((m) => (m + delta + 12) % 12);
      setStartDate(null);
      setEndDate(null);
      setFading(false);
    }, 220);
  };

  const jumpToMonth = (month) => {
    if (month === currentMonth) return;

    setFading(true);
    setTimeout(() => {
      setCurrentMonth(month);

      // 🔥 Reset selection
      setStartDate(null);
      setEndDate(null);

      setFading(false);
    }, 220);
  };

  
  // const jumpToMonth = (month) => {
  //   if (month === currentMonth) return;
  //   setFading(true);
  //   setTimeout(() => {
  //     setCurrentMonth(month);
  //     setFading(false);
  //   }, 220);
  // };

  // Preload adjacent month images
  useEffect(() => {
    const prev = (currentMonth - 1 + 12) % 12;
    const next = (currentMonth + 1) % 12;
    [prev, next].forEach((m) => {
      const img = new Image();
      img.src = MONTH_IMAGES[m];
    });
  }, [currentMonth]);

  return (
    <div
      className="min-h-screen flex items-center justify-center select-none"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #d6d6d6 0%, #b8b8b8 60%, #a8a8a8 100%)",
      }}
    >
      <WallTexture />

      <div className="relative flex items-center gap-6">
        <NavArrow direction="prev" onClick={() => changeMonth(-1)} />

        {/* Calendar assembly */}
        <div className="relative" style={{ width: 380 }}>
          {/* Drop shadow layer */}
          <div
            className="absolute inset-0"
            style={{
              top: 28,
              boxShadow:
                "0 25px 60px rgba(0,0,0,0.45), 0 8px 20px rgba(0,0,0,0.25), 4px 0 15px rgba(0,0,0,0.1)",
              borderRadius: "0 0 12px 12px",
            }}
          />

          <WallNail />

          {/* Calendar card */}
          <div
            className="relative bg-white overflow-hidden"
            style={{
              marginTop: 14,
              borderRadius: "0 0 10px 10px",
              transform: "rotate(0.15deg)",
            }}
          >
            <CoilStrip />

            <PhotoSection
              imageUrl={MONTH_IMAGES[currentMonth]}
              monthName={MONTH_NAMES[currentMonth]}
              fading={fading}
            />

            <CalendarGrid days={calendarDays} currentMonth={currentMonth} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />

            {/* Bottom paper edge shadow */}
            <div
              className="absolute bottom-0 left-0 right-0 h-2 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(0,0,0,0.04))",
              }}
            />
          </div>

          <PageStack />
        </div>

        <NavArrow direction="next" onClick={() => changeMonth(1)} />
      </div>

      <MonthDots currentMonth={currentMonth} onSelect={jumpToMonth} />
    </div>
  );
}
