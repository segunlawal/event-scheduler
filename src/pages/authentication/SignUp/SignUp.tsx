/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase-config";
import "../../../App.css";
import logo from "../../../assets/habitter.png";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserAuth } from "../../../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
interface FormValues {
  registerEmail: string;
  registerPassword: string;
}
const SignUpSchema = Yup.object().shape({
  registerEmail: Yup.string()
    .email("Invalid email")
    .required("Please enter your email address"),
  registerPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 characters minimum."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("registerPassword"), null], "Passwords must match")
    .required("Please confirm your password"),
});
function SignUp(): JSX.Element {
  const navigate = useNavigate();
  const { oneUser, googleSignIn } = UserAuth();
  const [showPassword, setShowPassword] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState("password");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handletoggle = (): void => {
    showPassword === "password"
      ? setShowPassword("text")
      : setShowPassword("password");
  };
  const handletoggle2 = (): void => {
    showConfirmPassword === "password"
      ? setShowConfirmPassword("text")
      : setShowConfirmPassword("password");
  };

  const signUp = async (values: FormValues): Promise<void> => {
    const { registerEmail, registerPassword } = values;
    try {
      setIsButtonDisabled(true);
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setIsButtonDisabled(false);
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error: any) {
      toast.error(error.message);
      setIsButtonDisabled(false);
    }
  };

  const handleGoogleSignIn = async (): Promise<void> => {
    try {
      await googleSignIn();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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
          <img src={logo} alt="habitter logo" className="w-9 h-9" />
          <p className="font-semibold text-3xl">EventiCal</p>
        </div>
      </Link>
      <p className="text-3xl mx-auto font-semibold tracking-tight py-7">
        Create an account
      </p>

      <Formik
        initialValues={{
          registerEmail: "",
          registerPassword: "",
          confirmPassword: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={signUp}
      >
        {(formik) => (
          <Form className="flex flex-col mx-auto">
            <div className="flex flex-col mx-auto">
              <label htmlFor="registerEmail" className="text-sm pb-1">
                Email
              </label>
              <Field
                name="registerEmail"
                className="focus:border-2 border-[1px] rounded-lg p-3 sm:w-[30rem] w-80 bg-transparent border-[#2b2b39] focus:outline-none"
                placeholder="Email"
              />
              <ErrorMessage
                name="registerEmail"
                component="div"
                className="text-red-700"
              />
            </div>
            <div className="flex flex-col mx-auto">
              <label htmlFor="registerPassword" className="text-sm pb-1 mt-5">
                Password
              </label>
              <div className="input-container relative">
                <Field
                  name="registerPassword"
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
                name="registerPassword"
                component="div"
                className="text-red-700"
              />
            </div>
            <div className="flex flex-col mx-auto">
              <label htmlFor="confirmPassword" className="text-sm mt-5 pb-1">
                Confirm Password
              </label>
              <div className="input-container relative">
                <Field
                  name="confirmPassword"
                  className="focus:border-2 border-[1px] rounded-lg p-3 sm:w-[30rem] w-80 bg-transparent border-[#2b2b39] focus:outline-none"
                  placeholder="Confirm password"
                  type={showConfirmPassword}
                />
                {showConfirmPassword === "password" ? (
                  <FaEye
                    onClick={handletoggle2}
                    size="1.2rem"
                    color="grey"
                    className="cursor-pointer absolute top-[33%] right-[3%]"
                  />
                ) : (
                  <FaEyeSlash
                    onClick={handletoggle2}
                    size="1.2rem"
                    color="grey"
                    className="cursor-pointer absolute top-[33%] right-[3%]"
                  />
                )}
              </div>

              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-700"
              />
            </div>

            <button
              disabled={!formik.isValid || !formik.dirty || isButtonDisabled}
              type="submit"
              className="text-white text-md font-light px-10 py-2 bg-[#217BF4] sm:w-[30rem] w-80 mx-auto rounded-lg mt-3 disabled:opacity-50 transition-all duration-300"
            >
              Create Account
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
