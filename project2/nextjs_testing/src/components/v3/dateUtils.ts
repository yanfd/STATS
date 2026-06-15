const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export const SITE_TIMEZONE = "Asia/Shanghai";

function getSiteDateParts(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: SITE_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [year, month, day] = formatter.format(date).split("-").map(Number);
  return { year, month, day };
}

/** Site bar clock — Shanghai (UTC+8). */
export function formatSiteClock(date: Date) {
  const { year, month, day } = getSiteDateParts(date);
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: SITE_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).format(date);

  return {
    label: `GMT+8 ${String(day).padStart(2, "0")} ${MONTHS[month - 1]} ${String(year).slice(-2)}`,
    time,
  };
}

/** Format like `14 JUN 2026` (Shanghai calendar). */
export function formatAvailabilityDate(date: Date): string {
  const { year, month, day } = getSiteDateParts(date);
  return `${String(day).padStart(2, "0")} ${MONTHS[month - 1]} ${year}`;
}

export function getTodayDate(): Date {
  return new Date();
}

/** Next open slot: today (Shanghai) + leadDays. */
export function getNextAvailabilityDate(from = new Date(), leadDays = 10): Date {
  const { year, month, day } = getSiteDateParts(from);
  const next = new Date(Date.UTC(year, month - 1, day + leadDays, 12));
  return next;
}
