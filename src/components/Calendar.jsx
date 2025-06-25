import React from "react";
import dayjs from "dayjs";
import "./Calendar.css";

export default function Calendar({ currentDate, events }) {
  const startDay = currentDate.startOf("month").day();
  const daysInMonth = currentDate.daysInMonth();
  const today = dayjs();

  const eventMap = {};
  events.forEach((event) => {
    const key = dayjs(event.date).format("YYYY-MM-DD");
    if (!eventMap[key]) {
      eventMap[key] = [];
    }
    eventMap[key].push(event);
  });

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const day = currentDate.date(i);
    days.push(day);
  }

  return (
    <div className="calendar-container">
      <div className="calendar-grid">
        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((d) => (
          <div className="calendar-header" key={d}>
            {d}
          </div>
        ))}

        {days.map((day, index) => {
          const key = day?.format("YYYY-MM-DD");
          const isToday = day?.isSame(today, "day");
          const dailyEvents = eventMap[key] || [];

          return (
            <div
              key={index}
              className={`calendar-cell ${isToday ? "today" : ""} ${!day ? "empty-cell" : ""}`}
            >
              {day && <div className="date-label">{day.date()}</div>}
              {dailyEvents.map((event, i) => (
                <div key={i} className="event-item">
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
