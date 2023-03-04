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
  newStartDate: Yup.date().required("Start date is required"),
  newEndDate: Yup.date().required("Start date is required"),
});

const EditHabitModal = (props) => {
  const {
    activeEditId,
    getHabits,
    habits,
    editModalIsOpen,
    setEditModalIsOpen,
  } = props;

  const currentHabitName = habits?.find(
    (habit) => habit.id === activeEditId
  )?.habitName;
  const currentHabitDesc = habits?.find(
    (habit) => habit.id === activeEditId
  )?.habitDescription;
  // eslint-disable-next-line no-unused-vars
  const currentStartDate = habits?.find(
    (habit) => habit.id === activeEditId
  )?.startDate;
  const currentEndDate = habits?.find(
    (habit) => habit.id === activeEditId
  )?.endDate;

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [startDate, setStartDate] = useState(currentStartDate);
  const [endDate, setEndDate] = useState(currentEndDate);

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
      const habitDoc = doc(db, "habits", activeEditId);
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
                <ErrorMessage
                  name="newHabitDesc"
                  component="div"
                  className="text-red-700"
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
                <ErrorMessage
                  name="newStartDate"
                  component="div"
                  className="text-red-700"
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
                <ErrorMessage
                  name="newEndDate"
                  component="div"
                  className="text-red-700"
                />
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
  activeEditId: PropTypes.string.isRequired,
  habits: PropTypes.array.isRequired,
};

export default EditHabitModal;
