"use client";

import { useEffect, useState } from "react";
import { formatAvailabilityDate, getNextAvailabilityDate } from "./dateUtils";

type NextAvailabilityProps = {
  className?: string;
  leadDays?: number;
};

export function NextAvailability({ className = "sitebar-text text-nd-300", leadDays = 10 }: NextAvailabilityProps) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    setLabel(formatAvailabilityDate(getNextAvailabilityDate(new Date(), leadDays)));
  }, [leadDays]);

  return (
    <span className={className} suppressHydrationWarning>
      {label ?? "-- --- ----"}
    </span>
  );
}

export function useNextAvailabilityLabel(): string | null {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    setLabel(formatAvailabilityDate(getNextAvailabilityDate(new Date(), 10)));
  }, []);

  return label;
}
