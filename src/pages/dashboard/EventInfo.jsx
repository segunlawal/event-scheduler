/* eslint-disable no-unused-vars */
import { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "../../firebase-config";
import "../../App.css";

const EventInfo = (props) => {
  const {
    infoModalIsOpen,
    setInfoModalIsOpen,
    clickedEvent,
    clickedEventStartDate,
    clickedEventEndDate,
    setEditModalIsOpen,
    setDeleteModalIsOpen,
    activeId,
    setActiveId,
  } = props;
  function handleEditModal(id) {
    setActiveId(id);
    setEditModalIsOpen(true);
  }
  function handleDeleteModal(id) {
    setActiveId(id);
    setDeleteModalIsOpen(true);
  }

  const arrDate = clickedEventStartDate.split("-");
  console.log(arrDate);
  const months = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (arrDate[1] < 10 && arrDate[1].toString().charAt(0) === "0") {
    arrDate[1] = parseInt(arrDate[1].toString().charAt(1));
  }
  const eventStart = months[arrDate[1]] + " " + arrDate[2] + ", " + arrDate[0];
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

          content: {
            animation: "slide-down 0.5s",
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
          <AiOutlineEdit
            className="cursor-pointer"
            onClick={() => {
              handleEditModal(activeId);
              setInfoModalIsOpen(false);
            }}
          />
          <AiOutlineDelete
            className="cursor-pointer"
            onClick={() => {
              handleDeleteModal(activeId);
              setInfoModalIsOpen(false);
            }}
          />
          <AiOutlineClose
            className="cursor-pointer"
            onClick={() => {
              setInfoModalIsOpen(false);
            }}
          />
        </div>
        <p className="text-lg font-semibold leading-tight">{clickedEvent}</p>
        <p>
          {eventStart} to {clickedEventEndDate}
        </p>
      </Modal>
    </div>
  );
};

EventInfo.propTypes = {
  infoModalIsOpen: PropTypes.bool.isRequired,
  setInfoModalIsOpen: PropTypes.func.isRequired,
  setDeleteModalIsOpen: PropTypes.func.isRequired,
  setEditModalIsOpen: PropTypes.func.isRequired,
  setActiveId: PropTypes.func.isRequired,
  clickedEvent: PropTypes.string.isRequired,
  activeId: PropTypes.string.isRequired,
  clickedEventStartDate: PropTypes.string.isRequired,
  clickedEventEndDate: PropTypes.string.isRequired,
};

export default EventInfo;
