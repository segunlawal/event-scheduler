import { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiOutlineClose } from "react-icons/ai";

const CreateHabitSchema = Yup.object().shape({
  newHabitName: Yup.string()
    .required("Habit name is required")
    .min(1, "Habit name must have at least one character"),
  newHabitDuration: Yup.number()
    .required("Duration is required")
    .positive("Duration must be more than zero"),
});

const CreateHabitModal = (props) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { getHabits, modalIsOpen, setModalIsOpen } = props;
  const habitsRef = collection(db, "habits");

  const handleNewHabit = async (values) => {
    const { newHabitName, newHabitDesc, newHabitDuration } = values;
    setIsButtonDisabled(true);
    try {
      await addDoc(habitsRef, {
        habitName: newHabitName,
        habitDescription: newHabitDesc,
        numberOfDays: newHabitDuration,
      });
      toast.success("Habit created", { autoClose: 2000 });
      getHabits();
      setModalIsOpen(false);
      setIsButtonDisabled(false);
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
        <Formik
          initialValues={{
            newHabitName: "",
            newHabitDesc: "",
            newHabitDuration: 0,
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
                <label>Duration (in days)</label>
                <Field
                  type="number"
                  name="newHabitDuration"
                  className="border-[1px] border-[#2b2b39] p-2 rounded-sm"
                  placeholder="Enter timeline in days"
                />
                <ErrorMessage
                  name="newHabitDuration"
                  component="div"
                  className="text-red-700"
                />
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
