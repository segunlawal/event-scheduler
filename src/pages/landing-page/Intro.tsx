import "../../../src/App.css";
import illustration from "../../assets/habit-illustration.png";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

export const Intro = (): JSX.Element => {
  const { oneUser } = UserAuth();

  return (
    <div className="hero flex md:px-[135px] px-10 md:py-[72px] py-7 shadow-md">
      <div className="lg:w-1/2 w-full md:pt-[125px]">
        <button className="text-[#217BF4] bg-[#217BF4] bg-opacity-10 rounded-lg h-9 w-44">
          Habitter Community
        </button>
        <p className="text-[#0A093D] font-bold md:text-5xl text-3xl tracking-tight pt-5">
          Track Your Habits,
        </p>
        <p className="text-[#0A093D] font-bold md:text-5xl text-3xl tracking-tight">
          Change Your Life
        </p>
        <p className="text-[#656464] pt-[18px]">
          Build good habits, break free from bad habits. One day at a time.
        </p>
        <Link to={oneUser === true ? "/dashboard" : "/signup"}>
          {
            <button
              type="submit"
              className="bg-[#217BF4] mt-6 px-6 py-4 text-white  font-light rounded-xl drop-shadow"
            >
              {oneUser === null ? "Get Started" : "Go to Dashboard"}
            </button>
          }
        </Link>
      </div>
      <div className="w-1/2 hidden lg:block">
        <img src={illustration} alt="habit illustrtion" />
      </div>
    </div>
  );
};
