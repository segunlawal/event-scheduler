import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Tracker(props) {
  const { setModalIsOpen, habits } = props;

  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    if (habits) {
      const events = habits?.map((habit) => {
        const dateObj = new Date(habit.endDate);
        dateObj.setDate(dateObj.getDate() + 1);
        const newDateString = dateObj.toISOString().slice(0, 10);

        return {
          title: habit.habitName,
          start: habit.startDate,
          end: newDateString,
          id: habit.id,
        };
      });

      setCalendarEvents(events);
    }
  }, [habits]);

  const handleEventChange = async (events) => {
    const startDate = new Date(events.event._instance.range.start);
    const newStartDate = startDate.toISOString().slice(0, 10);

    const endDate = new Date(events.event._instance.range.end);
    endDate.setDate(endDate.getDate() - 1);
    const newEndDate = endDate.toISOString().slice(0, 10);

    const activeEditId = events.event._def.publicId;
    try {
      const habitDoc = doc(db, "habits", activeEditId);
      await updateDoc(habitDoc, {
        startDate: newStartDate,
        endDate: newEndDate,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEventClick = async (clickInfo) => {
    console.log(clickInfo);
  };

  return (
    <div className="mt-[3rem]">
      <ToastContainer />
      <button
        className="rounded-md text-white bg-[#217BF4] p-2 mx-auto flex"
        onClick={() => setModalIsOpen(true)}
      >
        Add a new event
      </button>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        headerToolbar={{
          start: "today prev,next", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "dayGridMonth,dayGridWeek,dayGridDay", // will normally be on the right. if RTL, will be on the left
        }}
        height={"90vh"}
        editable={true}
        selectable={true}
        eventChange={handleEventChange}
        eventClick={handleEventClick}
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
