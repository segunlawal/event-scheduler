/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../../../components/TopNav";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../../../firebase-config";
interface SignUpProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}
const SignUp: React.FC<SignUpProps> = (user, setUser) => {
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
      console.log(auth);
      navigate("/dashboard");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  // const signIn = async () => {
  //   //
  // };

  return (
    <div className="text-center">
      <TopNav />
      <p className="text-xl">Welcome to Habitter</p>
      <p>Create an account to keep track of your habits</p>
      {/* <div className="flex flex-col">
        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          name="first-name"
          className="border-[1px] rounded-sm mx-auto"
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          name="last-name"
          className="border-[1px] rounded-sm mx-auto"
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />
      </div> */}
      <div className="flex flex-col">
        <label htmlFor="last-name">Email</label>
        <input
          type="email"
          name="last-name"
          className="border-[1px] rounded-sm mx-auto"
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className="border-[1px] rounded-sm mx-auto"
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
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
};

export default SignUp;
