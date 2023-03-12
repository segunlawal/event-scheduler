import Modal from "react-modal";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineClose } from "react-icons/ai";

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
    clickedEventDescription,
  } = props;
  function handleEditModal(id) {
    setActiveId(id);
    setEditModalIsOpen(true);
  }
  function handleDeleteModal(id) {
    setActiveId(id);
    setDeleteModalIsOpen(true);
  }

  const arrStartDate = clickedEventStartDate.split("-");
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
  if (arrStartDate[1] < 10 && arrStartDate[1].toString().charAt(0) === "0") {
    arrStartDate[1] = parseInt(arrStartDate[1].toString().charAt(1));
  }
  const eventStart =
    months[arrStartDate[1]] + " " + arrStartDate[2] + ", " + arrStartDate[0];

  const arrEndDate = clickedEventEndDate.split("-");
  if (arrEndDate[1] < 10 && arrEndDate[1].toString().charAt(0) === "0") {
    arrEndDate[1] = parseInt(arrEndDate[1].toString().charAt(1));
  }
  const eventEnd =
    months[arrEndDate[1]] + " " + arrEndDate[2] + ", " + arrEndDate[0];

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
        className="bg-white rounded-md shadow-lg flex flex-col mt-[10%] p-2 sm:w-[45%] w-[90%] mx-auto"
        appElement={document.getElementById("root") || undefined}
        onRequestClose={() => {
          setInfoModalIsOpen(false);
        }}
      >
        <div className="flex justify-end text-xl gap-4">
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
          {eventStart} to {eventEnd}
        </p>
        {clickedEventDescription && (
          <p className="text-sm">{clickedEventDescription}</p>
        )}
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
  clickedEventDescription: PropTypes.string.isRequired,
};

export default EventInfo;
