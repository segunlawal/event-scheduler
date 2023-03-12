/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../assets/habitter.png";
import { UserAuth } from "../../../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FormValues {
  loginEmail: string;
  loginPassword: string;
}
const SignInSchema = Yup.object().shape({
  loginEmail: Yup.string()
    .email("Invalid email")
    .required("Please enter your email address"),
  loginPassword: Yup.string().required("Password is required"),
});

function SignIn(): JSX.Element {
  const navigate = useNavigate();
  const { oneUser, googleSignIn } = UserAuth();
  const [showPassword, setShowPassword] = useState("password");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handletoggle = (): void => {
    showPassword === "password"
      ? setShowPassword("text")
      : setShowPassword("password");
  };
  const signIn = async (values: FormValues): Promise<void> => {
    const { loginEmail, loginPassword } = values;
    setIsButtonDisabled(true);
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
      setIsButtonDisabled(false);
    } catch (error: any) {
      toast.error(error.message);
      setIsButtonDisabled(false);
    }
  };

  const handleGoogleSignIn = async (): Promise<void> => {
    try {
      await googleSignIn();
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // handle navigation for google sign in
  useEffect(() => {
    if (oneUser?.email != null) {
      navigate("/dashboard");
    }
  }, [oneUser]);

  return (
    <div className="onboard min-h-screen flex flex-col py-20">
      <ToastContainer />
      <Link to="/">
        <div className="flex justify-center gap-1">
          <img src={logo} alt="habitter logo" className="w-9 h-9" />
          <p className="font-semibold text-3xl">EventiCal</p>
        </div>
      </Link>
      <p className="text-3xl mx-auto font-semibold tracking-tight py-7">
        Welcome back!
      </p>
      <p className="mx-auto">Please, enter your details</p>

      <Formik
        initialValues={{
          loginEmail: "",
          loginPassword: "",
        }}
        validationSchema={SignInSchema}
        onSubmit={signIn}
      >
        {(formik) => (
          <Form className="flex flex-col mx-auto">
            <div className="flex flex-col mx-auto">
              <label htmlFor="loginEmail" className="text-sm pb-1">
                Email
              </label>
              <Field
                name="loginEmail"
                className="focus:border-2 border-[1px] rounded-lg p-3 sm:w-[30rem] w-80 bg-transparent border-[#2b2b39] focus:outline-none"
                placeholder="Email"
              />

              <ErrorMessage
                name="loginEmail"
                component="div"
                className="text-red-700"
              />
            </div>
            <div className="flex flex-col mx-auto">
              <label htmlFor="loginPassword" className="text-sm pb-1 mt-5">
                Password
              </label>

              <div className="input-container relative">
                <Field
                  name="loginPassword"
                  className="focus:border-2 border-[1px] rounded-lg p-3 sm:w-[30rem] w-80 bg-transparent border-[#2b2b39] focus:outline-none"
                  placeholder="Enter password"
                  type={showPassword}
                />
                {showPassword === "password" ? (
                  <FaEye
                    onClick={handletoggle}
                    size="1.2rem"
                    className="cursor-pointer absolute top-[33%] right-[3%]"
                  />
                ) : (
                  <FaEyeSlash
                    onClick={handletoggle}
                    size="1.2rem"
                    className="cursor-pointer absolute top-[33%] right-[3%]"
                  />
                )}
              </div>
              <ErrorMessage
                name="loginPassword"
                component="div"
                className="text-red-700"
              />
            </div>

            <button
              disabled={!formik.isValid || !formik.dirty || isButtonDisabled}
              type="submit"
              className="text-white text-md font-light px-10 py-2 bg-[#217BF4] sm:w-[30rem] w-80 mx-auto rounded-lg mt-3 disabled:opacity-50 transition-all duration-300"
            >
              Log In
            </button>
          </Form>
        )}
      </Formik>
      <p className="mx-auto py-1">OR</p>
      <button
        type="submit"
        className="px-10 border-2 py-2 border-[#217BF4] sm:w-[30rem] w-80 mx-auto rounded-lg flex gap-2 justify-center"
        onClick={handleGoogleSignIn}
      >
        <FcGoogle className="flex my-auto text-2xl" />
        <p>Sign in with Google</p>
      </button>
      <p className="mx-auto py-3">
        Don&apos;t have an account?{" "}
        <Link to="/signup">
          <span className="text-[#217BF4] tracking-tighter">Sign Up</span>
        </Link>
      </p>
    </div>
  );
}

export default SignIn;
