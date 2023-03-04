import { useState } from "react";
import PropTypes from "prop-types";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function Tracker(props) {
  const { setModalIsOpen, habits } = props;

  const calendarEvents = habits?.map((habit) => {
    return {
      title: habit.habitName,
      start: habit.startDate,
      end: habit.endDate,
    };
  });

  // eslint-disable-next-line no-unused-vars
  const [createdEvents, setCreatedEvents] = useState(calendarEvents);

  return (
    <div className="mt-[23rem]">
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
