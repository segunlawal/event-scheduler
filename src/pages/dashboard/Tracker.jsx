// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import PropTypes from "prop-types";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function Tracker(props) {
  const { setModalIsOpen, habits } = props;

  const calendarEvents = habits?.map((habit) => {
    const dateObj = new Date(habit.endDate);
    dateObj.setDate(dateObj.getDate() + 1);
    const newDateString = dateObj.toISOString().slice(0, 10);

    return {
      title: habit.habitName,
      start: habit.startDate,
      end: newDateString,
    };
  });

  return (
    <div className="mt-[3rem]">
      <button
        className="rounded-md text-white bg-[#217BF4] p-2 mx-auto flex"
        onClick={() => setModalIsOpen(true)}
      >
        Add a new event
      </button>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        headerToolbar={{
          start: "today prev,next", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "dayGridMonth,dayGridWeek,dayGridDay", // will normally be on the right. if RTL, will be on the left
        }}
        height={"90vh"}
      />
    </div>
  );
}

Tracker.propTypes = {
  habits: PropTypes.array.isRequired,
  // modalIsOpen: PropTypes.bool.isRequired,
  setModalIsOpen: PropTypes.func.isRequired,
};
export default Tracker;
