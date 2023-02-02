/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/landing-page/Home";
import SignUp from "./pages/authentication/SignUp/SignUp";
import SignIn from "./pages/authentication/SignIn/SignIn";
import Blog from "./pages/blog/Blog";
import Dashboard from "./pages/dashboard/Dashboard";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase-config";
import ProtectedRoute from "./components/ProtectedRoute";
// import PublicRoute from "./components/PublicRoute";
import { AuthContextProvider } from "./context/AuthContext";

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
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
