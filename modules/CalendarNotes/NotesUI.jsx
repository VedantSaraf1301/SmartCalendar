"use client"
function MonthNotesPanel({ year, month }) {
  const { monthNote, saveMonthNote } = useCalendarNotes(year, month);
  const [val, setVal] = useState(monthNote);

  
  useEffect(() => {
    const t = setTimeout(() => saveMonthNote(val), 600);
    return () => clearTimeout(t);
  }, [val]);

  return (
    <textarea
      value={val}
      onChange={e => setVal(e.target.value)}
      placeholder="Notes for this month..."
      style={{ width: "100%", height: 120, resize: "none", border: "none",
               background: "transparent", fontSize: 13 }}
    />
  );
}


function DayNotePopover({ year, month, day, onClose }) {
  const { dayNotes, saveDayNote } = useCalendarNotes(year, month);
  const [val, setVal] = useState(dayNotes[day] ?? "");

  return (
    <div /* your popover/modal styles */>
      <h4>{day} {MONTH_NAMES[month]}</h4>
      <textarea
        value={val}
        onChange={e => setVal(e.target.value)}
        placeholder="Add a note for this day..."
        autoFocus
      />
      <button onClick={() => { saveDayNote(day, val); onClose(); }}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}