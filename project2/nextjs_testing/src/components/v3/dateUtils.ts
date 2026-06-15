const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/** Format like `14 JUN 2026` (local date). */
export function formatAvailabilityDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function getTodayDate(): Date {
  return new Date();
}

/** Next open slot: today + leadDays (calendar days). */
export function getNextAvailabilityDate(from = new Date(), leadDays = 10): Date {
  const next = new Date(from);
  next.setDate(next.getDate() + leadDays);
  return next;
}
