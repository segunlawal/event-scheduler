/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../../../components/TopNav";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../../../firebase-config";
interface SignInProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}
const SignIn: React.FC<SignInProps> = (user, setUser) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  const signIn = async (): Promise<void> => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
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

      <div className="flex flex-col">
        <label htmlFor="last-name">Email</label>
        <input
          type="email"
          name="last-name"
          className="border-[1px] rounded-sm mx-auto"
          onChange={(event) => {
            setLoginEmail(event.target.value);
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
            setLoginPassword(event.target.value);
          }}
        />
      </div>
      <button
        type="submit"
        className="text-white px-10 py-2 bg-[#217BF4]"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={signIn}
      >
        Sign In
      </button>
      <p>OR</p>
      <button type="submit" className="px-10 border-2 py-2 border-[#217BF4]">
        Sign In With Google
      </button>
    </div>
  );
};

export default SignIn;
