"use client"
import { useState, useCallback, useEffect } from "react";

const key = (year, month, day = null) =>
  day !== null
    ? `calendar_notes_${year}_${month}_${day}`
    : `calendar_notes_${year}_${month}`;

export function useCalendarNotes(year, month) {
  const [monthNote, setMonthNote] = useState(
    () => (typeof window !== "undefined" ? localStorage.getItem(key(year, month)) ?? "" : "")
  );
  const [dayNotes, setDayNotes] = useState(() => {
    if (typeof window === "undefined") return {};
    const notes = {};
    for (let d = 1; d <= 31; d++) {
      const val = localStorage.getItem(key(year, month, d));
      if (val) notes[d] = val;
    }
    return notes;
  });

  
  useEffect(() => {
    if (typeof window === "undefined") return;
    setMonthNote(localStorage.getItem(key(year, month)) ?? "");
    const notes = {};
    for (let d = 1; d <= 31; d++) {
      const val = localStorage.getItem(key(year, month, d));
      if (val) notes[d] = val;
    }
    setDayNotes(notes);
  }, [year, month]);

  const saveMonthNote = useCallback((text) => {
    localStorage.setItem(key(year, month), text);
    setMonthNote(text);
  }, [year, month]);

  const saveDayNote = useCallback((day, text) => {
    const k = key(year, month, day);
    if (text.trim() === "") {
      localStorage.removeItem(k);
      setDayNotes(prev => { const n = {...prev}; delete n[day]; return n; });
    } else {
      localStorage.setItem(k, text);
      setDayNotes(prev => ({ ...prev, [day]: text }));
    }
  }, [year, month]);

  return { monthNote, dayNotes, saveMonthNote, saveDayNote };
}
