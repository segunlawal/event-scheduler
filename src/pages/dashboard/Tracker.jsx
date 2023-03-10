import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EventInfo from "./EventInfo";
import moment from "moment";
import { AiOutlinePlus } from "react-icons/ai";
import { StyleWrapper } from "./StyleWrapper";
function Tracker(props) {
  const {
    setModalIsOpen,
    habits,
    infoModalIsOpen,
    setInfoModalIsOpen,
    setEditModalIsOpen,
    setDeleteModalIsOpen,
    activeId,
    setActiveId,
    setStartDate,
    setEndDate,
  } = props;

  const [calendarEvents, setCalendarEvents] = useState([]);
  const [clickedEvent, setClickedEvent] = useState("");
  const [clickedEventStartDate, setClickedEventStartDate] = useState("");
  const [clickedEventEndDate, setClickedEventEndDate] = useState("");
  const currentDate = moment().format("YYYY-MM-DD");

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
    setClickedEvent(clickInfo.event._def.title);
    setInfoModalIsOpen(true);
    setClickedEventStartDate(
      clickInfo.event._instance.range.start.toISOString().slice(0, 10)
    );

    const clickedEndDate = new Date(clickInfo.event._instance.range.end);
    clickedEndDate.setDate(clickedEndDate.getDate() - 1);
    const newClickedEndDate = clickedEndDate.toISOString().slice(0, 10);
    setClickedEventEndDate(newClickedEndDate);
    setActiveId(clickInfo.event._def.publicId);
  };

  const handleDateSelect = async (clickInfo) => {
    setModalIsOpen(true);
    setStartDate(clickInfo.startStr);
    setEndDate(clickInfo.startStr);
  };

  return (
    <div className="mt-[3rem]">
      <ToastContainer />
      <EventInfo
        infoModalIsOpen={infoModalIsOpen}
        setInfoModalIsOpen={setInfoModalIsOpen}
        clickedEvent={clickedEvent}
        clickedEventStartDate={clickedEventStartDate}
        clickedEventEndDate={clickedEventEndDate}
        setEditModalIsOpen={setEditModalIsOpen}
        setDeleteModalIsOpen={setDeleteModalIsOpen}
        activeId={activeId}
        setActiveId={setActiveId}
      />
      <button
        className="fixed top-5 left-5 rounded-full text-white bg-[#217BF4] p-2 flex items-center justify-center"
        onClick={() => {
          setModalIsOpen(true);
          setStartDate(currentDate);
          setEndDate(currentDate);
        }}
      >
        <AiOutlinePlus className="text-2xl" />
      </button>
      <StyleWrapper>
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
          select={handleDateSelect}
        />
      </StyleWrapper>
    </div>
  );
}

Tracker.propTypes = {
  habits: PropTypes.array.isRequired,
  setDeleteModalIsOpen: PropTypes.func.isRequired,
  setEditModalIsOpen: PropTypes.func.isRequired,
  setModalIsOpen: PropTypes.func.isRequired,
  infoModalIsOpen: PropTypes.bool.isRequired,
  setInfoModalIsOpen: PropTypes.func.isRequired,
  activeId: PropTypes.string.isRequired,
  setActiveId: PropTypes.func.isRequired,
  setStartDate: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
};
export default Tracker;
