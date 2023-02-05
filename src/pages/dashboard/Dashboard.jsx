import { useNavigate, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { UserAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/habitter.png";
import { IoMdArrowDropdown } from "react-icons/io";
import Modal from "react-modal";

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState([]);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitDesc, setNewHabitDesc] = useState("");
  const [newHabitDuration, setNewHabitDuration] = useState(0);
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
      // console.log(filteredData);
      setHabits(filteredData);
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

  const eachHabit = habits?.map((habit) => {
    return (
      <div key={habit.id}>
        <p>{habit.habitName}</p>
      </div>
    );
  });

  const handleNewHabit = async () => {
    try {
      await addDoc(habitsRef, {
        habitName: newHabitName,
        habitDescription: newHabitDesc,
        numberOfDays: newHabitDuration,
      });
      getHabits();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="">
      <ToastContainer />
      {loading ? (
        <div className="flex justify-center mx-auto">
          <ClipLoader color="#217BF4" />
        </div>
      ) : (
        <div className="">
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
            <div className="flex flex-col mx-auto w-full px-10 gap-3">
              <p className="text-xl">Create a new habit</p>
              <div className="flex flex-col">
                <label>Habit Name</label>
                <input
                  placeholder="Enter a new habit"
                  className="border-[1px] border-[#2b2b39] p-2 rounded-sm"
                  onChange={(e) => setNewHabitName(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label>Habit Description</label>
                <textarea
                  placeholder="Briefly describe habit"
                  className="border-[1px] border-[#2b2b39] p-2 rounded-sm"
                  onChange={(e) => setNewHabitDesc(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label>Duration (in days)</label>
                <input
                  placeholder="Enter timeline in days"
                  type="number"
                  className="border-[1px] border-[#2b2b39] p-2 rounded-sm"
                  onChange={(e) => setNewHabitDuration(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="border-2 bg-[#217BF4] text-white w-20 border-none rounded-md py-1"
                onClick={handleNewHabit}
              >
                Add
              </button>
            </div>
          </Modal>
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
