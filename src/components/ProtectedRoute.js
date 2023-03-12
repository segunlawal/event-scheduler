import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { oneUser } = UserAuth();
  const navigate = useNavigate();

  if (!oneUser) {
    navigate("/signup");
  }
  return children;
};

export default ProtectedRoute;
