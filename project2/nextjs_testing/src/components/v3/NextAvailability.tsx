"use client";

import { useEffect, useState } from "react";
import { formatAvailabilityDate, getTodayDate } from "./dateUtils";

type NextAvailabilityProps = {
  className?: string;
};

export function NextAvailability({ className = "sitebar-text text-nd-300" }: NextAvailabilityProps) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    setLabel(formatAvailabilityDate(getTodayDate()));
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {label ?? "-- --- ----"}
    </span>
  );
}

export function useNextAvailabilityLabel(): string | null {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    setLabel(formatAvailabilityDate(getTodayDate()));
  }, []);

  return label;
}
