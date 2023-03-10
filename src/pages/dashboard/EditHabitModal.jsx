import { useState, useEffect } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiOutlineClose } from "react-icons/ai";

const EditHabitSchema = Yup.object().shape({
  newHabitName: Yup.string()
    .required("Habit name is required")
    .min(1, "Habit name must have at least one character"),
});

const EditHabitModal = (props) => {
  const { activeId, getHabits, habits, editModalIsOpen, setEditModalIsOpen } =
    props;

  const currentHabitName = habits?.find(
    (habit) => habit.id === activeId
  )?.habitName;
  const currentHabitDesc = habits?.find(
    (habit) => habit.id === activeId
  )?.habitDescription;
  const currentStartDate = habits?.find(
    (habit) => habit.id === activeId
  )?.startDate;
  const currentEndDate = habits?.find(
    (habit) => habit.id === activeId
  )?.endDate;

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [startDate, setStartDate] = useState(currentStartDate);
  const [endDate, setEndDate] = useState(currentEndDate);

  useEffect(() => {
    if (endDate < startDate) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [startDate, endDate]);
  useEffect(() => {
    setStartDate(currentStartDate);
  }, [currentStartDate]);

  useEffect(() => {
    setEndDate(currentEndDate);
  }, [currentEndDate]);

  const handleEditHabit = async (values) => {
    const { newHabitName, newHabitDesc } = values;
    setIsButtonDisabled(true);
    try {
      const habitDoc = doc(db, "habits", activeId);
      await updateDoc(habitDoc, {
        habitName: newHabitName,
        habitDescription: newHabitDesc,
        startDate,
        endDate,
      });
      toast.success("Habit updated", { autoClose: 2000 });
      getHabits();
      setEditModalIsOpen(false);
      setIsButtonDisabled(false);
    } catch (error) {
      toast.error(error.message);
      setIsButtonDisabled(false);
    }
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
            zIndex: 1,
          },
        }}
        isOpen={editModalIsOpen}
        className="bg-white flex flex-col mt-[10%] py-10 sm:w-[40%] w-[90%] mx-auto justify-center items-center"
        appElement={document.getElementById("root") || undefined}
        onRequestClose={() => {
          setEditModalIsOpen(false);
        }}
      >
        <Formik
          initialValues={{
            newHabitName: currentHabitName,
            newHabitDesc: currentHabitDesc,
            newStartDate: currentStartDate,
            newEndDate: currentEndDate,
          }}
          validationSchema={EditHabitSchema}
          onSubmit={handleEditHabit}
        >
          {(formik) => (
            <Form className="flex flex-col mx-auto w-full px-10 gap-3">
              <div className="flex justify-between">
                <p className="text-xl">Edit habit</p>
                <AiOutlineClose
                  className="my-auto cursor-pointer text-xl"
                  onClick={() => {
                    setEditModalIsOpen(false);
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label>Habit Name</label>
                <Field
                  name="newHabitName"
                  className="border-[1px] border-[#2b2b39] p-2 rounded-sm"
                  placeholder="Enter a new habit"
                />
                <ErrorMessage
                  name="newHabitName"
                  component="div"
                  className="text-red-700"
                />
              </div>
              <div className="flex flex-col">
                <label>Habit Description</label>
                <Field
                  as="textarea"
                  name="newHabitDesc"
                  className="border-[1px] border-[#2b2b39] p-2 rounded-sm"
                  placeholder="Briefly describe habit"
                />
              </div>
              <div className="flex flex-col">
                <label>Start Date</label>
                <Field
                  name="newStartDate"
                  type="date"
                  value={startDate ?? ""}
                  onChange={(event) => setStartDate(event.target.value)}
                  className="border-[1px] border-[#2b2b39] p-2 rounded-sm"
                />
              </div>
              <div className="flex flex-col">
                <label>End Date</label>
                <Field
                  name="newEndDate"
                  type="date"
                  value={endDate ?? ""}
                  onChange={(event) => setEndDate(event.target.value)}
                  className="border-[1px] border-[#2b2b39] p-2 rounded-sm"
                />
                {endDate < startDate && (
                  <p className="text-red-700">
                    End Date cannot be before start date
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="border-2 bg-[#217BF4] text-white w-20 border-none rounded-md py-1 disabled:opacity-[0.5] disabled:cursor-auto"
                disabled={!formik.isValid || isButtonDisabled}
              >
                Save
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

EditHabitModal.propTypes = {
  getHabits: PropTypes.func.isRequired,
  editModalIsOpen: PropTypes.bool.isRequired,
  setEditModalIsOpen: PropTypes.func.isRequired,
  activeId: PropTypes.string.isRequired,
  habits: PropTypes.array.isRequired,
};

export default EditHabitModal;
