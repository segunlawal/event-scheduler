/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../../../firebase-config";
import "../../../App.css";
import logo from "../../../assets/habitter.png";
// interface SignUpProps {
//   user: User | null;
//   setUser: Dispatch<SetStateAction<User | null>>;
// }
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
    <div className="onboard min-h-screen flex flex-col">
      <div className="flex justify-center gap-1">
        <img src={logo} alt="habitter logo" className="w-[36px] h-[36px]" />
        <p className="font-semibold text-3xl">Habitter</p>
      </div>
      <p className="text-2xl mx-auto font-semibold tracking-tight">
        Create an account to start tracking your habits
      </p>
      <div className="flex flex-col mx-auto">
        <label htmlFor="first-name" className="text-sm">
          First Name
        </label>
        <input
          type="text"
          name="first-name"
          className="border-2 rounded-lg p-2 w-96 bg-transparent border-[#217BF4]  focus:outline-none"
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
          placeholder="First Name"
        />
      </div>
      <div className="flex flex-col mx-auto">
        <label htmlFor="last-name" className="text-sm">
          Last Name
        </label>
        <input
          type="text"
          name="last-name"
          className="border-[1px] rounded-md p-2 w-96"
          onChange={(event) => {
            setLastName(event.target.value);
          }}
          placeholder="Last Name"
        />
      </div>
      <div className="flex flex-col mx-auto">
        <label htmlFor="last-name" className="text-sm">
          Email
        </label>
        <input
          type="email"
          name="last-name"
          className="border-[1px] rounded-md p-2 w-96"
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
          placeholder="Email"
        />
      </div>

      <div className="flex flex-col mx-auto">
        <label htmlFor="password" className="text-sm">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="border-[1px] rounded-md p-2 w-96"
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
          placeholder="Password"
        />
      </div>
      <button
        type="submit"
        className="text-white px-10 py-2 bg-[#217BF4]"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={signUp}
      >
        Create Account
      </button>
      <p>OR</p>
      <button type="submit" className="px-10 border-2 py-2 border-[#217BF4]">
        Sign Up using Google
      </button>
    </div>
  );
}

export default SignUp;
