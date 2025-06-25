import React, { useState } from "react";
import dayjs from "dayjs";
import Calendar from "./components/Calendar";
import AddEventForm from "./components/AddEventForm";
import "./App.css";

function App() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState([]);

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const handleAddEvent = newEvent => {
    setEvents([...events, newEvent]);
  };

  return (
    <div className="app">
      <div className="header-bar">
        <h1><b>Calendar</b></h1>
      </div>

      <div className="nav-buttons">
        <button onClick={handlePrevMonth}>◀</button>
        <span><b>{currentDate.format("MMMM YYYY")}</b></span>
        <button onClick={handleNextMonth}>▶</button>
      </div>

      <p className="today-indicator">
        Today is <b>{dayjs().format("dddd, MMMM D, YYYY")}</b>
      </p>

      <AddEventForm onAdd={handleAddEvent} />
      <Calendar currentDate={currentDate} events={events} />
    </div>
  );
}

export default App;
