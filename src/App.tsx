/* eslint-disable @typescript-eslint/no-unused-vars */
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/landing-page/Home";
import SignUp from "./pages/authentication/SignUp/SignUp";
import SignIn from "./pages/authentication/SignIn/SignIn";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContextProvider } from "./context/AuthContext";

function App(): JSX.Element {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
