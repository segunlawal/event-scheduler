import { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";

const ModifyHabitModal = (props) => {
  const { activeId, getHabits, deleteModalIsOpen, setDeleteModalIsOpen } =
    props;
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false);
  // console.log(habitId);
  const deleteHabit = async (activeId) => {
    setIsDeleteDisabled(true);
    const habitDoc = doc(db, "habits", activeId);
    await deleteDoc(habitDoc);
    toast("Habit deleted", { autoClose: 2000 });
    getHabits();
    setDeleteModalIsOpen(false);
    setIsDeleteDisabled(false);
  };

  return (
    <div>
      <ToastContainer />
      <Modal
        style={{
          overlay: {
            position: "fixed",
            background: "rgba(24, 49, 64, 0.23)",
            backdropFilter: 'blur("91px")',
          },
        }}
        isOpen={deleteModalIsOpen}
        className="bg-white flex flex-col mt-[10%] py-10 sm:w-[40%] w-[90%] mx-auto justify-center items-center"
        appElement={document.getElementById("root") || undefined}
        onRequestClose={() => {
          setDeleteModalIsOpen(false);
        }}
      >
        <p className="px-3">Are you sure you want to delete this habit?</p>
        <div className=" flex gap-3">
          <button
            disabled={isDeleteDisabled}
            onClick={() => deleteHabit(activeId)}
            className="bg-red-700 text-white px-3 py-2 rounded-md disabled:opacity-[0.5]"
          >
            Delete
          </button>
          <button
            onClick={() => setDeleteModalIsOpen(false)}
            className="border-2 px-3 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

ModifyHabitModal.propTypes = {
  getHabits: PropTypes.func.isRequired,
  deleteModalIsOpen: PropTypes.bool.isRequired,
  setDeleteModalIsOpen: PropTypes.func.isRequired,
  activeId: PropTypes.string.isRequired,
};

export default ModifyHabitModal;
