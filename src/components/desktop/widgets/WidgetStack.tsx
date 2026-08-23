"use client";

import { ClockWidget } from "./ClockWidget";
import { CalendarWidget } from "./CalendarWidget";
import { WeatherWidget } from "./WeatherWidget";

// Rendered below window z-index range so open windows can visually cover
// the widgets, matching real macOS desktop-widget layering.
export function WidgetStack() {
  return (
    <div className="pointer-events-none absolute right-6 top-14 z-0 flex flex-col gap-4">
      <ClockWidget />
      <CalendarWidget />
      <WeatherWidget />
    </div>
  );
}
