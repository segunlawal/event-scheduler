import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
const PublicRoute = ({ children }) => {
  const { oneUser } = UserAuth();
  const navigate = useNavigate();

  if (oneUser) {
    navigate("/dashboard");
  }
  return children;
};

export default PublicRoute;
