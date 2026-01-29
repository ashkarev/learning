import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import { Dropdown } from "flowbite-react";





const Navbar = () => {
  const { removeToken, token } = useContext(authContext)
  const navigate = useNavigate();



  const onLoggedOut = () => {
    // localStorage.clear()
    removeToken()
    navigate('/')

  }
  return (
    <>
      <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 bg-gray-50 shadow-sm ">
        <div className="max flex flex-wrap items-center justify-between mx-15  p-4">
          <div
            href=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-10 rounded-2xl" alt="Flowbite Logo" />
            <Link to={'/'} className="self-center   hover:text-blue-500 text-xl text-heading font-semibold whitespace-nowrap">
              Blink Tutors
            </Link>
          </div>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
              <li>
                <Link
                  to={'/'}
                  className=" block py-2 px-3 2 text-lg    hover:text-blue-500 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link

                  to={'/about'}
                  className=" block py-2 px-3 2 text-lg   hover:text-blue-500 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to={'/careers'}
                  className=" block py-2 px-3 2 text-lg   hover:text-blue-500 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to={'/course'}
                  className=" block py-2 px-3 2 text-lg   hover:text-blue-500 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                >
                  Courses
                </Link>
              </li>

              <li>
                <Link
                  to={'/contact'}
                  className=" block py-2 px-3 2 text-lg   hover:text-blue-500 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                >
                  Contact
                </Link>
              </li>

              <li>
                {/* <Link to={'/register'} className="   p-2  rounded-md bg-blue-800 text-white hover:text-white hover:bg-blue-500">
                Register
                </Link> */}
                {
                  token ? (
                    <Dropdown
                      inline
                      placement="bottom-end"
                      dismissOnClick={false}
                      className="bg-white dark:bg-white shadow-sm rounded-md"
                      label={
                        <div className="flex items-center justify-center w-10 h-8 rounded-md bg-gray-100 hover:bg-gray-200 transition">
                          <img
                            className="w-5 h-5 rounded-full"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
                            alt="profile"
                          />
                        </div>
                      }
                    >
                      <Link
                        to="/studentProfile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-700 hover:text-blue-600"
                      >
                        Profile
                      </Link>

                      <button
                        onClick={onLoggedOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-700 hover:text-blue-600"
                      >
                        Logout
                      </button>
                    </Dropdown>
                  ) : (
                    <Link to="/login">
                      <button className="px-4 py-2 text-blue-600 hover:text-blue-800 border border-gray-200  shadow-2xl rounded-xl">
                        Login
                      </button>
                    </Link>
                  )
                }






              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
