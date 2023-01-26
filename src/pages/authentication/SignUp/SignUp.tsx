/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase-config";
import "../../../App.css";
import logo from "../../../assets/habitter.png";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserAuth } from "../../../context/AuthContext";

function SignUp(): JSX.Element {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const navigate = useNavigate();
  const { oneUser, googleSignIn } = UserAuth();

  const signUp = async (): Promise<void> => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      toast.success("Account created successfully");
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async (): Promise<void> => {
    try {
      await googleSignIn();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // handle navigation for google sign in
  useEffect(() => {
    if (oneUser != null) {
      navigate("/dashboard");
    }
  }, [oneUser]);

  return (
    <div className="onboard min-h-screen flex flex-col py-20">
      <ToastContainer />
      <Link to="/">
        <div className="flex justify-center gap-1">
          <img src={logo} alt="habitter logo" className="w-[36px] h-[36px]" />
          <p className="font-semibold text-3xl">Habitter</p>
        </div>
      </Link>
      <p className="text-3xl mx-auto font-semibold tracking-tight py-7">
        Create an account
      </p>

      <div className="flex flex-col mx-auto">
        <label htmlFor="last-name" className="text-sm pb-1">
          Email
        </label>
        <input
          type="email"
          name="last-name"
          className="focus:border-2 border-[1px] rounded-lg p-3 mb-5 sm:w-[30rem] w-80 bg-transparent border-[#2b2b39] focus:outline-none"
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
          placeholder="Email"
        />
      </div>

      <div className="flex flex-col mx-auto">
        <label htmlFor="password" className="text-sm pb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="focus:border-2 border-[1px] rounded-lg p-3 mb-5 sm:w-[30rem] w-80 bg-transparent border-[#2b2b39] focus:outline-none"
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
          placeholder="Enter password"
        />
      </div>
      <button
        type="submit"
        className="text-white text-md font-light px-10 py-2 bg-[#217BF4] sm:w-[30rem] w-80 mx-auto rounded-lg mt-3"
        onClick={signUp}
      >
        Create Account
      </button>
      <p className="mx-auto py-1">OR</p>
      <button
        type="submit"
        className="px-10 border-2 py-2 border-[#217BF4] sm:w-[30rem] w-80 mx-auto rounded-lg flex gap-2 justify-center"
        onClick={handleGoogleSignIn}
      >
        <FcGoogle className="flex my-auto text-2xl" />
        <p>Sign up with Google</p>
      </button>
      <p className="mx-auto py-3">
        Already have an account?{" "}
        <Link to="/signin">
          <span className="text-[#217BF4] tracking-tighter">Log In</span>
        </Link>
      </p>
    </div>
  );
}

export default SignUp;
