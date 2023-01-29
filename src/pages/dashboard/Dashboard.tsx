/* eslint-disable @typescript-eslint/no-unused-vars */
import TopNav from "../../components/TopNav";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { UserAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Dashboard(): JSX.Element {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { oneUser } = UserAuth();

  useEffect(() => {
    if (oneUser?.email != null) {
      setLoading(false);
    }
  }, [oneUser]);
  const logOut = async (): Promise<void> => {
    //
    await signOut(auth);
    navigate("/");
  };
  return (
    <div className="">
      {loading ? (
        <div className="flex justify-center mx-auto">
          <ClipLoader color="#217BF4" />
        </div>
      ) : (
        <>
          <TopNav />
          <p className="text-xl">Welcome to your Dashboard</p>
          {oneUser?.email}
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
