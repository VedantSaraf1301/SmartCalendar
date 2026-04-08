"use client"
import React, { useState, useEffect, useRef, useCallback } from "react";
import { MONTH_NAMES, MONTH_IMAGES, YEAR } from "../Components/constants";
import { getCalendarGrid } from "../Components/utils";
import { CoilStrip } from "../Components/CoilStrip";
import { PhotoSection } from "../Components/PhotoSection";
import { CalendarGrid } from "../Components/CalendarGrid";
import { MonthDots } from "../Components/MonthDots";
import { NavArrow } from "../Components/NavArrow";


//The wallCalendar component merges all the other components together

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


function DragHint({ visible }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
        zIndex: 20,
        paddingBottom: 24,
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.45)",
          borderRadius: 12,
          padding: "8px 16px",
          color: "#fff",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.08em",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          backdropFilter: "blur(4px)",
        }}
      >
        <span style={{ fontSize: 18, lineHeight: 1 }}>↑</span>
        <span>Drag up to flip</span>
      </div>
    </div>
  );
}

//Main flip card logic
function DraggableCard({ children, onFlip, style, className }) {
  const THRESHOLD = 65;
  const MAX_TILT = 40;

  const dragRef = useRef(null);  // { startY }
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [flipClass, setFlipClass] = useState("");


  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(t);
  }, []);

  const getY = (e) => e.touches ? e.touches[0].clientY : e.clientY;

  const onStart = useCallback((e) => {
    if (e.target.closest("button")) return;
    dragRef.current = { startY: getY(e) };
    setDragging(true);
    setShowHint(false);
  }, []);

  const onMove = useCallback((e) => {
    if (!dragging || !dragRef.current) return;
    const dy = getY(e) - dragRef.current.startY;
    const angle = Math.max(-MAX_TILT, Math.min(MAX_TILT, -(dy / THRESHOLD) * MAX_TILT));
    setTilt(angle);
  }, [dragging]);

  const onEnd = useCallback((e) => {
    if (!dragging || !dragRef.current) return;
    const endY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    const dy = endY - dragRef.current.startY;

    if (Math.abs(dy) >= THRESHOLD) {

      const goNext = dy < 0;
      setTilt(0);
      setDragging(false);
      dragRef.current = null;

      const exitClass = goNext ? "calendar-flip-exit-up" : "calendar-flip-exit-down";
      const enterClass = goNext ? "calendar-flip-enter-up" : "calendar-flip-enter-down";
      const delta = goNext ? 1 : -1;

      setFlipClass(exitClass);
      setTimeout(() => {
        onFlip(delta);
        setFlipClass(enterClass);
        setTimeout(() => setFlipClass(""), 350);
      }, 280);
    } else {

      setTilt(0);
      setDragging(false);
      dragRef.current = null;
    }
  }, [dragging, onFlip]);


  useEffect(() => {
    if (!dragging) return;
    const mm = (e) => onMove(e);
    const mu = (e) => onEnd(e);
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup", mu);
    window.addEventListener("touchmove", mm, { passive: true });
    window.addEventListener("touchend", mu);
    return () => {
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup", mu);
      window.removeEventListener("touchmove", mm);
      window.removeEventListener("touchend", mu);
    };
  }, [dragging, onMove, onEnd]);

  // Live rotateX tilt — pivot at the top edge, bottom lifts toward viewer
  const dragTransform = dragging && tilt !== 0
    ? `perspective(1100px) rotateX(${tilt}deg) rotate(0.15deg)`
    : undefined;

  return (
    <div
      ref={cardRef}
      className={`${className ?? ""} ${flipClass}`}
      style={{
        ...style,
        cursor: dragging ? "grabbing" : "grab",
        transform: dragTransform ?? style?.transform,
        transformOrigin: "top center",
        transition: dragging ? "none" : (flipClass ? "none" : "transform 0.3s cubic-bezier(0.2,0,0.4,1)"),
        userSelect: "none",
        position: "relative",
      }}
      onMouseDown={onStart}
      onTouchStart={onStart}
    >
      <DragHint visible={showHint} />
      {children}
    </div>
  );
}


export function WallCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [fading, setFading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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


  const flipMonth = useCallback((delta) => {
    setCurrentMonth((m) => (m + delta + 12) % 12);
    setStartDate(null);
    setEndDate(null);
  }, []);

  const jumpToMonth = (month) => {
    if (month === currentMonth) return;

    setFading(true);
    setTimeout(() => {
      setCurrentMonth(month);


      setStartDate(null);
      setEndDate(null);

      setFading(false);
    }, 220);
  };





  useEffect(() => {
    const prev = (currentMonth - 1 + 12) % 12;
    const next = (currentMonth + 1) % 12;
    [prev, next].forEach((m) => {
      const img = new Image();
      img.src = MONTH_IMAGES[m];
    });
  }, [currentMonth]);


  const cardInner = (
    <>
      <CoilStrip />
      <PhotoSection
        imageUrl={MONTH_IMAGES[currentMonth]}
        monthName={MONTH_NAMES[currentMonth]}
        fading={fading}
      />
      <CalendarGrid days={calendarDays} currentMonth={currentMonth} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />

      <div
        className="absolute bottom-0 left-0 right-0 h-2 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(0,0,0,0.04))",
        }}
      />
    </>
  );

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center select-none px-4 py-12 rounded-3xl"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #d6d6d6 0%, #b8b8b8 60%, #a8a8a8 100%)",
      }}
    >
      <WallTexture />


      <div className="hidden sm:flex relative items-center gap-6">
        <NavArrow direction="prev" onClick={() => changeMonth(-1)} />


        <div className="relative" style={{ width: 380 }}>

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


          <DraggableCard
            onFlip={flipMonth}
            style={{
              marginTop: 14,
              borderRadius: "0 0 10px 10px",
              transform: "rotate(0.15deg)",
              background: "#fff",
              overflow: "hidden",
            }}
          >
            {cardInner}
          </DraggableCard>

          <PageStack />
        </div>

        <NavArrow direction="next" onClick={() => changeMonth(1)} />
      </div>


      <div className="hidden sm:flex gap-2 mt-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <button
            key={i}
            onClick={() => jumpToMonth(i)}
            style={{
              width: i === currentMonth ? 20 : 7,
              height: 7,
              borderRadius: 4,
              background: i === currentMonth ? "#1aaede" : "rgba(255,255,255,0.5)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      <div className="flex sm:hidden flex-col items-center gap-5 w-full">

        <div className="relative w-full" style={{ maxWidth: 380 }}>

          <div
            className="absolute inset-0"
            style={{
              top: 28,
              boxShadow:
                "0 25px 60px rgba(0,0,0,0.45), 0 8px 20px rgba(0,0,0,0.25)",
              borderRadius: "0 0 12px 12px",
            }}
          />

          <WallNail />

          <DraggableCard
            onFlip={flipMonth}
            style={{
              marginTop: 14,
              borderRadius: "0 0 10px 10px",
              transform: "rotate(0.15deg)",
              background: "#fff",
              overflow: "hidden",
            }}
          >
            {cardInner}
          </DraggableCard>

          <PageStack />
        </div>


        <div className="flex gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <button
              key={i}
              onClick={() => jumpToMonth(i)}
              style={{
                width: i === currentMonth ? 20 : 7,
                height: 7,
                borderRadius: 4,
                background: i === currentMonth ? "#1aaede" : "rgba(255,255,255,0.5)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>


        <div className="flex justify-between w-full" style={{ maxWidth: 380 }}>
          <NavArrow direction="prev" onClick={() => changeMonth(-1)} />
          <NavArrow direction="next" onClick={() => changeMonth(1)} />
        </div>
      </div>
    </div>
  );
}
