/**
 * @typedef {Object} CalendarDay
 * @property {number} day
 * @property {"prev" | "cur" | "next"} type
 */


export function getCalendarGrid(year, month){
  const firstDay = new Date(year, month, 1).getDay();
  // Convert Sunday=0 → Monday-first offset (Mon=0 … Sun=6)
  //Just like giving index to the fellow days
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days = [];

  //these keep track of trailing days from previous month
  for (let i = startOffset - 1; i >= 0; i--) {
    days.push({ day: daysInPrevMonth - i, type: "prev" });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ day: d, type: "cur" });
  }

  // Leading days from next month to complete the last row
  let nextDay = 1;
  while (days.length % 7 !== 0) {
    days.push({ day: nextDay++, type: "next" });
  }

  return days;
}
