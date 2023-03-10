// import { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "../../firebase-config";

const EventInfo = (props) => {
  const {
    infoModalIsOpen,
    setInfoModalIsOpen,
    clickedEvent,
    clickedEventStartDate,
    clickedEventEndDate,
  } = props;

  return (
    <div>
      <ToastContainer />
      <Modal
        style={{
          overlay: {
            position: "fixed",
            background: "rgba(24, 49, 64, 0.1)",
            backdropFilter: 'blur("91px")',
            zIndex: 1,
          },
        }}
        isOpen={infoModalIsOpen}
        className="bg-white shadow-lg flex flex-col mt-[10%] p-2 sm:w-[35%] w-[90%] mx-auto"
        appElement={document.getElementById("root") || undefined}
        onRequestClose={() => {
          setInfoModalIsOpen(false);
        }}
      >
        <div className="flex justify-end text-xl gap-3">
          <AiOutlineEdit className="cursor-pointer" />
          <AiOutlineDelete className="cursor-pointer" />
          <AiOutlineClose
            className="cursor-pointer"
            onClick={() => {
              setInfoModalIsOpen(false);
            }}
          />
        </div>
        <p>{clickedEvent}</p>
        <p>{clickedEventStartDate}</p>
        <p>{clickedEventEndDate}</p>
      </Modal>
    </div>
  );
};

EventInfo.propTypes = {
  infoModalIsOpen: PropTypes.bool.isRequired,
  setInfoModalIsOpen: PropTypes.func.isRequired,
  clickedEvent: PropTypes.string.isRequired,
  clickedEventStartDate: PropTypes.string.isRequired,
  clickedEventEndDate: PropTypes.string.isRequired,
};

export default EventInfo;
