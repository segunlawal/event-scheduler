import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateHabitModal = (props) => {
  const {
    newHabitName,
    newHabitDesc,
    newHabitDuration,
    getHabits,
    modalIsOpen,
    setModalIsOpen,
    setNewHabitName,
    setNewHabitDuration,
    setNewHabitDesc,
  } = props;
  const habitsRef = collection(db, "habits");

  const handleNewHabit = async () => {
    try {
      await addDoc(habitsRef, {
        habitName: newHabitName,
        habitDescription: newHabitDesc,
        numberOfDays: newHabitDuration,
      });
      getHabits();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <ToastContainer />
      <Modal
        style={{
          overlay: {
            position: "fixed",
            background: "rgba(24, 49, 64, 0.63)",
            backdropFilter: 'blur("91px")',
          },
        }}
        isOpen={modalIsOpen}
        className="bg-white flex flex-col mt-[10%] py-10 sm:w-[40%] w-[90%] mx-auto justify-center items-center"
        appElement={document.getElementById("root") || undefined}
        onRequestClose={() => {
          setModalIsOpen(false);
        }}
      >
        <div className="flex flex-col mx-auto w-full px-10 gap-3">
          <p className="text-xl">Create a new habit</p>
          <div className="flex flex-col">
            <label>Habit Name</label>
            <input
              placeholder="Enter a new habit"
              className="border-[1px] border-[#2b2b39] p-2 rounded-sm"
              onChange={(e) => setNewHabitName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label>Habit Description</label>
            <textarea
              placeholder="Briefly describe habit"
              className="border-[1px] border-[#2b2b39] p-2 rounded-sm"
              onChange={(e) => setNewHabitDesc(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label>Duration (in days)</label>
            <input
              placeholder="Enter timeline in days"
              type="number"
              className="border-[1px] border-[#2b2b39] p-2 rounded-sm"
              onChange={(e) => setNewHabitDuration(Number(e.target.value))}
            />
          </div>
          <button
            type="submit"
            className="border-2 bg-[#217BF4] text-white w-20 border-none rounded-md py-1"
            onClick={handleNewHabit}
          >
            Add
          </button>
        </div>
      </Modal>
    </div>
  );
};
CreateHabitModal.propTypes = {
  newHabitName: PropTypes.string.isRequired,
  newHabitDesc: PropTypes.string.isRequired,
  newHabitDuration: PropTypes.number.isRequired,
  getHabits: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  setModalIsOpen: PropTypes.func.isRequired,
  setNewHabitName: PropTypes.func.isRequired,
  setNewHabitDesc: PropTypes.func.isRequired,
  setNewHabitDuration: PropTypes.func.isRequired,
};
export default CreateHabitModal;
