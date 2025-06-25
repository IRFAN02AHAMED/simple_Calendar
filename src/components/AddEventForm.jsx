import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddEventForm.css";

export default function AddEventForm({ onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    date: null,
    time: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.title && formData.date) {
      const formattedData = {
        ...formData,
        date: formData.date.toISOString().split("T")[0],
      };
      onAdd(formattedData);
      setFormData({ title: "", date: null, time: "" });
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>
          <span className="label-heading"><b>Event Title : </b></span>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </label>

        <label>
          <span className="label-heading"><b>Date : </b></span>
          <DatePicker
            selected={formData.date}
            onChange={(date) =>
              setFormData({ ...formData, date })
            }
            dateFormat="MMMM d, yyyy"
            placeholderText="Choose date"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            className="custom-datepicker"
            popperPlacement="bottom-start"
          />
        </label>

        <label>
          <span className="label-heading"><b>Time : </b></span>
          <input
            type="time"
            value={formData.time}
            onChange={(e) =>
              setFormData({ ...formData, time: e.target.value })
            }
          />
        </label>

        <button type="submit">Add Event</button>
      </div>
    </form>
  );
}
