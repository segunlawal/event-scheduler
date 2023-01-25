import TopNav from "../../components/TopNav";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { User, signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

interface DashboardProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}
const Dashboard: React.FC<DashboardProps> = (user, setUser) => {
  const navigate = useNavigate();

  const logOut = async (): Promise<void> => {
    //
    await signOut(auth);
    navigate("/");
  };
  return (
    <div className="">
      <TopNav />
      <p className="text-xl">Welcome to your Dashboard</p>
      {user?.user?.email}
      <button
        type="submit"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={logOut}
      >
        Log out
      </button>
    </div>
  );
};
export default Dashboard;
