import TopNav from "../../components/TopNav";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { getDocs, collection } from "firebase/firestore";
import { UserAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const [habits, setHabits] = useState([]);

  const habitsRef = collection(db, "habits");
  useEffect(() => {
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
        {/* <p>{habit.goalInDays}</p> */}
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
        <>
          <TopNav />
          <p className="text-xl">Welcome to your Dashboard</p>
          <p>{oneUser?.email}</p>
          <button type="submit" onClick={logOut}>
            Log out
          </button>
          <p className="text-2xl">A list of my habits</p>
          {eachHabit}
        </>
      )}
    </div>
  );
}
export default Dashboard;
