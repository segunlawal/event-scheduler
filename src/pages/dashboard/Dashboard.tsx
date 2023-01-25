import TopNav from "../../components/TopNav";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { UserAuth } from "../../context/AuthContext";

function Dashboard(): JSX.Element {
  const navigate = useNavigate();
  const { oneUser } = UserAuth();

  const logOut = async (): Promise<void> => {
    //
    await signOut(auth);
    navigate("/");
  };
  return (
    <div className="">
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
    </div>
  );
}
export default Dashboard;
