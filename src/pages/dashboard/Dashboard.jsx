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

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState([]);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitDesc, setNewHabitDesc] = useState("");
  const [newHabitDuration, setNewHabitDuration] = useState(0);
  // eslint-disable-next-line no-unused-vars
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
          <div className="p-5 flex justify-between">
            <NavLink to="/" className="flex gap-[6px]">
              <img src={logo} alt="habitter logo" className="w-8 h-8" />
              <span className="font-semibold text-[1.5rem]">Habitter</span>
            </NavLink>
            <div>
              <div
                className="flex cursor-pointer"
                onClick={() => setShowDropDown(!showDropDown)}
              >
                <p>{oneUser?.email}</p>
                <IoMdArrowDropdown className="text-2xl cursor-pointer" />
              </div>
              {showDropDown && (
                <div className="absolute flex mx-auto shadow-2xl border-[2px] border-[#217BF4] rounded-lg">
                  <button
                    type="submit"
                    onClick={logOut}
                    className="flex mx-auto"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="text-xl mt-3">Welcome to your Dashboard</p>
          <p className="text-2xl">A list of my habits</p>
          {eachHabit}
          <div className="flex flex-col mx-auto w-96 gap-5">
            <input
              placeholder="Enter a new habit"
              className="border-2"
              onChange={(e) => setNewHabitName(e.target.value)}
            />
            <textarea
              placeholder="describe habit"
              className="border-2"
              onChange={(e) => setNewHabitDesc(e.target.value)}
            />
            <input
              placeholder="duration"
              type="number"
              className="border-2"
              onChange={(e) => setNewHabitDuration(Number(e.target.value))}
            />
            <button
              type="submit"
              className="border-2 bg-blue-400"
              onClick={handleNewHabit}
            >
              Add Habit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Dashboard;
