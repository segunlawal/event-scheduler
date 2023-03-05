// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { db, auth } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiOutlineClose } from "react-icons/ai";
import moment from "moment";

const CreateHabitSchema = Yup.object().shape({
  newHabitName: Yup.string()
    .required("Habit name is required")
    .min(1, "Habit name must have at least one character"),
});

const CreateHabitModal = (props) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const currentDate = moment().format("YYYY-MM-DD");
  const { getHabits, modalIsOpen, setModalIsOpen } = props;
  const habitsRef = collection(db, "habits");
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);

  useEffect(() => {
    if (endDate < startDate) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    setStartDate(currentDate);
  }, [currentDate]);

  useEffect(() => {
    setEndDate(currentDate);
  }, [currentDate]);

  const handleNewHabit = async (values) => {
    const { newHabitName, newHabitDesc } = values;

    setIsButtonDisabled(true);
    try {
      await addDoc(habitsRef, {
        habitName: newHabitName,
        habitDescription: newHabitDesc,
        startDate,
        endDate,
        userId: auth?.currentUser?.uid,
      });
      toast.success("Habit created", { autoClose: 2000 });
      getHabits();
      setModalIsOpen(false);
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
            background: "rgba(24, 49, 64, 0.63)",
            backdropFilter: 'blur("91px")',
            zIndex: 1,
          },
        }}
        isOpen={modalIsOpen}
        className="bg-white flex flex-col mt-[10%] py-10 sm:w-[40%] w-[90%] mx-auto justify-center items-center"
        appElement={document.getElementById("root") || undefined}
        onRequestClose={() => {
          setModalIsOpen(false);
        }}
      >
        <Formik
          initialValues={{
            newHabitName: "",
            newHabitDesc: "",
            newStartDate: startDate,
            newEndDate: endDate,
          }}
          validationSchema={CreateHabitSchema}
          onSubmit={handleNewHabit}
        >
          {(formik) => (
            <Form className="flex flex-col mx-auto w-full px-10 gap-3">
              <div className="flex justify-between">
                <p className="text-xl">Create a new habit</p>
                <AiOutlineClose
                  className="my-auto cursor-pointer text-xl"
                  onClick={() => {
                    setModalIsOpen(false);
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
                <label>Habit Description (optional)</label>
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
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                  className="border-[1px] border-[#2b2b39] p-2 rounded-sm"
                />
              </div>
              <div className="flex flex-col">
                <label>End Date</label>
                <Field
                  name="newEndDate"
                  type="date"
                  value={endDate}
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
                disabled={!formik.isValid || !formik.dirty || isButtonDisabled}
              >
                Add
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};
CreateHabitModal.propTypes = {
  getHabits: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  setModalIsOpen: PropTypes.func.isRequired,
};
export default CreateHabitModal;
