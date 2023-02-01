/* eslint-disable @typescript-eslint/no-unused-vars */
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

function Dashboard(): JSX.Element {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState({});

  const habitsRef = collection(db, "habits");
  useEffect(() => {
    const getHabits = async (): Promise<void> => {
      const data = await getDocs(habitsRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      try {
        setHabits(filteredData);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    void getHabits();
  }, []);

  const { oneUser } = UserAuth();

  useEffect(() => {
    if (oneUser?.email != null) {
      setLoading(false);
    }
  }, [oneUser]);
  const logOut = async (): Promise<void> => {
    await signOut(auth);
    navigate("/");
  };

  // const eachHabit = habits?.map((habit) => {
  //   return <p key={habit.id}>{habit.habitName}</p>;
  // });
  console.log(habits);

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
          <button
            type="submit"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={logOut}
          >
            Log out
          </button>
        </>
      )}
    </div>
  );
}
export default Dashboard;
