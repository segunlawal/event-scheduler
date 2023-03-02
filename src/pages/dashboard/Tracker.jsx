// import React, { useState } from "react";
import PropTypes from "prop-types";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function Tracker(props) {
  const { setModalIsOpen } = props;
  return (
    <div className="mt-[23rem]">
      <button
        className="rounded-md text-white bg-[#217BF4] p-2 mx-auto flex"
        onClick={() => setModalIsOpen(true)}
      >
        Add a new habit
      </button>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: "event 1", date: "2023-03-01" },
          { title: "event 2", date: "2023-03-05" },
        ]}
      />
    </div>
  );
}

Tracker.propTypes = {
  // getHabits: PropTypes.func.isRequired,
  // modalIsOpen: PropTypes.bool.isRequired,
  setModalIsOpen: PropTypes.func.isRequired,
};
export default Tracker;
