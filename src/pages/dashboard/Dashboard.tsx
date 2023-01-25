import TopNav from "../../components/TopNav";
import { Dispatch, SetStateAction } from "react";
import { User } from "firebase/auth";

interface DashboardProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}
const Dashboard: React.FC<DashboardProps> = (user, setUser) => {
  return (
    <div className="">
      <TopNav />
      <p className="text-xl">Welcome to your Dashboard</p>
      {user?.user?.email}
    </div>
  );
};
export default Dashboard;
