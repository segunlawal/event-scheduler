import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { oneUser } = UserAuth();
  const navigate = useNavigate();

  if (!oneUser) {
    navigate("/signin");
  }
  return children;
};

export default ProtectedRoute;
