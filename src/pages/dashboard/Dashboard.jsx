import { useNavigate, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { UserAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/habitter.png";
import { IoMdArrowDropdown } from "react-icons/io";
import CreateHabitModal from "./CreateHabitModal";

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const habitsRef = collection(db, "habits");
  const getHabits = async () => {
    const data = await getDocs(habitsRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    try {
      setHabits(filteredData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteHabit = async (id) => {
    const habitDoc = doc(db, "habits", id);
    await deleteDoc(habitDoc);
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

  const eachHabit = habits?.map((habit) => {
    return (
      <div key={habit.id}>
        <p>{habit.habitName}</p>
        <button
          className="border-2 bg-red-700 text-white cursor-pointer"
          onClick={() => deleteHabit(habit.id)}
        >
          Delete Habit
        </button>
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
          <button
            className="rounded-md text-white bg-[#217BF4] p-2 mx-auto flex"
            onClick={() => setModalIsOpen(true)}
          >
            Add a new habit
          </button>
          <p className="text-2xl">A list of my habits</p>
          {eachHabit}
        </div>
      )}
    </div>
  );
}
export default Dashboard;
