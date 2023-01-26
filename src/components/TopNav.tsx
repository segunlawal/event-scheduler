/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/habitter.png";
import "../../src/App.css";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { UserAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

// eslint-disable-next-line no-unused-vars
export default function NavBar(): JSX.Element {
  const navMenu = useRef(null);
  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate();
  const handleClickAway = (): void => {
    setNavbar(false);
  };
  const { oneUser } = UserAuth();

  const logOut = async (): Promise<void> => {
    //
    await signOut(auth);
    navigate("/");
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <nav
        ref={navMenu}
        className="md:py-7 py-5 mx-8 border-b-[1px] border-[#217BF4] border-opacity-[0.2]"
      >
        <div className="justify-between mx-auto lg:items-center lg:flex">
          <div>
            <div className="flex items-center justify-between lg:block">
              <NavLink to="/" className="flex gap-[6px]">
                <img
                  src={logo}
                  alt="habitter logo"
                  className="w-[36px] h-[36px]"
                />
                <span className="font-semibold text-[1.5rem]">Habitter</span>
              </NavLink>
              <div className="lg:hidden">
                <button
                  type="submit"
                  className="p-2 rounded-md outline-none"
                  onClick={() => {
                    setNavbar(!navbar);
                  }}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-9 h-9 text-white"
                      viewBox="0 0 20 20"
                      fill="#434343"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-9 h-9 text-white"
                      fill="black"
                      viewBox="0 0 24 24"
                      stroke="#434343"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 lg:block md:pb-0 lg:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="bg- lg:bg-inherit items-center xl:gap-12 justify-center space-y-5 lg:flex lg:space-x-6 lg:space-y-0">
                <li className="leading-[25px]">
                  <NavLink
                    to="/blog"
                    reloadDocument
                    className={({ isActive }) =>
                      isActive
                        ? " flex items-center text-[#217BF4] font-bold"
                        : "hover:text-[#217BF4] flex items-center"
                    }
                  >
                    Blog
                  </NavLink>
                </li>
                <li className="leading-[25px]">
                  <NavLink
                    reloadDocument
                    to={oneUser === null ? "/signup" : "/dashboard"}
                    className={({ isActive }) =>
                      isActive
                        ? " flex items-center text-[#217BF4] font-bold"
                        : "hover:text-[#217BF4] flex items-center"
                    }
                  >
                    {oneUser === null ? "Sign Up" : "Dashboard"}
                  </NavLink>
                </li>
                <li className="leading-[25px]">
                  {oneUser === null ? (
                    <NavLink
                      reloadDocument
                      to="/signin"
                      className={({ isActive }) =>
                        isActive
                          ? " flex items-center text-[#217BF4] font-bold"
                          : "hover:text-[#217BF4] flex items-center"
                      }
                    >
                      Sign In
                    </NavLink>
                  ) : (
                    <button type="submit" onClick={logOut}>
                      Log Out
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </ClickAwayListener>
  );
}
