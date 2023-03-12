import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { oneUser } = UserAuth();
  const navigate = useNavigate();

  if (oneUser) {
    navigate("/dashboard");
  }
  return children;
};

export default PublicRoute;
