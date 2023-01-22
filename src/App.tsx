import React from "react";

import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/landing-page/Home";
import { Blog } from "./pages/blog/Blog";
import { SignUp } from "./pages/authentication/SignUp/SignUp";
import { SignIn } from "./pages/authentication/SignIn/SignIn";

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
