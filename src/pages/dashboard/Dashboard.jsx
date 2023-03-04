import { useNavigate, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { getDocs, collection } from "firebase/firestore";
import { UserAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/habitter.png";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import CreateHabitModal from "./CreateHabitModal";
import ModifyHabitModal from "./DeleteHabitModal";
import EditHabitModal from "./EditHabitModal";
import Tracker from "./Tracker";

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [activeDeleteId, setactiveDeleteId] = useState("");
  const [activeEditId, setactiveEditId] = useState("");

  const getHabits = async () => {
    try {
      const habitsRef = collection(db, "habits");
      const data = await getDocs(habitsRef);
      const filteredData = data?.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const filteredHabits = filteredData.filter(
        (habit) => habit.userId === auth?.currentUser?.uid
      );
      setHabits(filteredHabits);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getHabits();
  }, []);

  const { oneUser } = UserAuth();

  useEffect(() => {
    if (oneUser?.email != null) {
      setLoading(false);
    }
  }, [oneUser]);
  const logOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  function handleDeleteModal(id) {
    setDeleteModalIsOpen(true);
    setactiveDeleteId(id);
  }
  function handleEditModal(id) {
    setEditModalIsOpen(true);
    setactiveEditId(id);
  }

  const eachHabit = habits?.map((habit) => {
    return (
      <div key={habit.id}>
        <ModifyHabitModal
          getHabits={getHabits}
          deleteModalIsOpen={deleteModalIsOpen}
          setDeleteModalIsOpen={setDeleteModalIsOpen}
          activeDeleteId={activeDeleteId}
        />
        <EditHabitModal
          getHabits={getHabits}
          editModalIsOpen={editModalIsOpen}
          setEditModalIsOpen={setEditModalIsOpen}
          activeEditId={activeEditId}
          habits={habits}
        />
        <p>{habit.habitName}</p>
        <div className="flex gap-2">
          <AiOutlineDelete
            className="text-xl cursor-pointer fill-red-700"
            onClick={() => handleDeleteModal(habit.id)}
          />
          <AiOutlineEdit
            className="text-xl cursor-pointer fill-[#ffaf2e]"
            onClick={() => handleEditModal(habit.id)}
          />
        </div>
        <hr />
      </div>
    );
  });

  return (
    <div className="">
      <ToastContainer />
      {loading ? (
        <div className="flex justify-center mx-auto">
          <ClipLoader color="#217BF4" />
        </div>
      ) : (
        <div className="">
          <CreateHabitModal
            getHabits={getHabits}
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
          />

          <div className="p-5 flex justify-between">
            <NavLink to="/" className="flex gap-[6px]">
              <img src={logo} alt="habitter logo" className="w-8 h-8" />
              <span className="hidden sm:block font-semibold text-[1.5rem]">
                Habitter
              </span>
            </NavLink>
            <div
              onMouseEnter={() => setShowDropDown(true)}
              onMouseLeave={() => setShowDropDown(false)}
            >
              <div className="flex cursor-pointer">
                <p>{oneUser?.email}</p>
                <IoMdArrowDropdown className="text-2xl cursor-pointer" />
              </div>
              {showDropDown && (
                <div className="drop-down absolute flex mx-auto shadow-2xl hover:bg-[#217BF4] hover:text-white">
                  <button
                    type="submit"
                    onClick={logOut}
                    className=""
                    style={{ width: `${oneUser?.email.length}ch` }}
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="text-2xl">A list of my events</p>
          {eachHabit}
          <Tracker setModalIsOpen={setModalIsOpen} habits={habits} />
        </div>
      )}
    </div>
  );
}
export default Dashboard;
