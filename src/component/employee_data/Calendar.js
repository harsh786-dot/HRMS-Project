
import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isBefore,
  isAfter,
} from "date-fns";

import "./Calendar.css";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2023, 6, 1));
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  const calendarStart = startOfWeek(monthStart, {
    weekStartsOn: 0,
  });

  const calendarEnd = endOfWeek(monthEnd, {
    weekStartsOn: 0,
  });

  const dates = [];
  let day = calendarStart;

  while (day <= calendarEnd) {
    dates.push(day);
    day = addDays(day, 1);
  }

  const handleDateClick = (date) => {
    if (!startDate || endDate) {
      setStartDate(date);
      setEndDate(null);
      return;
    }

    if (isSameDay(date, startDate)) {
      setStartDate(null);
      setEndDate(null);
      return;
    }

    if (isBefore(date, startDate)) {
      setEndDate(startDate);
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const isInRange = (date) =>
    startDate &&
    endDate &&
    isAfter(date, startDate) &&
    isBefore(date, endDate);

  const goToPreviousMonth = () => {
    setCurrentMonth((month) => subMonths(month, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth((month) => addMonths(month, 1));
  };

  return (
    <div className="calendar">
      <div className="calendar-my">
        <span>My Schedule</span>

        <div className="calendar-icon">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M16 3v4M8 3v4M3 10h18" />
            <path d="M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" />
          </svg>
        </div>
      </div>

      <div className="calendar-navigation">
        <button
          type="button"
          className="calendar-nav-btn"
          onClick={goToPreviousMonth}
          aria-label="Previous month"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <span className="calendar-month">
          {format(currentMonth, "MMMM, yyyy")}
        </span>

        <button
          type="button"
          className="calendar-nav-btn"
          onClick={goToNextMonth}
          aria-label="Next month"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18l6-6-6-6"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="calendar-weekdays">
        {WEEKDAYS.map((weekday) => (
          <div key={weekday} className="calendar-weekday">
            {weekday}
          </div>
        ))}
      </div>

      <div className="calendar-dates">
        {dates.map((date) => {
          const isStart = startDate && isSameDay(date, startDate);
          const isEnd = endDate && isSameDay(date, endDate);
          const isSelected = isStart || isEnd;
          const isMiddle = isInRange(date);
          const isOutside = !isSameMonth(date, currentMonth);

          return (
            <button
              type="button"
              key={date.toISOString()}
              className={[
                "calendar-date",
                isOutside ? "outside-month" : "",
                isSelected ? "selected-date" : "",
                isMiddle ? "middle-date" : "",
                isStart ? "range-start" : "",
                isEnd ? "range-end" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => handleDateClick(date)}
              aria-label={format(date, "EEEE, d MMMM yyyy")}
              aria-pressed={Boolean(isSelected)}
            >
              <span>{format(date, "d")}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
