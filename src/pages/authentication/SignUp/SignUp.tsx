/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../../../firebase-config";
import "../../../App.css";
import logo from "../../../assets/habitter.png";
import { FcGoogle } from "react-icons/fc";
function SignUp(): JSX.Element {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  // const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  const signUp = async (): Promise<void> => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      navigate("/dashboard");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  // const signIn = async () => {
  //   //
  // };

  return (
    <div className="onboard min-h-screen flex flex-col py-20">
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
        <label htmlFor="first-name" className="text-sm pb-1">
          First Name
        </label>
        <input
          type="text"
          name="first-name"
          className="focus:border-2 border-[1px] rounded-lg p-3 mb-5 sm:w-[30rem] w-80 bg-transparent border-[#2b2b39] focus:outline-none"
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
          placeholder="First Name"
        />
      </div>
      <div className="flex flex-col mx-auto">
        <label htmlFor="last-name" className="text-sm pb-1">
          Last Name
        </label>
        <input
          type="text"
          name="last-name"
          className="focus:border-2 border-[1px] rounded-lg p-3 mb-5 sm:w-[30rem] w-80 bg-transparent border-[#2b2b39] focus:outline-none"
          onChange={(event) => {
            setLastName(event.target.value);
          }}
          placeholder="Last Name"
        />
      </div>
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
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={signUp}
      >
        Create Account
      </button>
      <p className="mx-auto py-1">OR</p>
      <button
        type="submit"
        className="px-10 border-2 py-2 border-[#217BF4] sm:w-[30rem] w-80 mx-auto rounded-lg flex gap-2 justify-center"
      >
        <FcGoogle className="flex my-auto" />
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
