import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 bg-gray-50 shadow-sm ">
        <div className="max flex flex-wrap items-center justify-between mx-15  p-4">
          <a
            href=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-10 rounded-2xl" alt="Flowbite Logo" />
            <Link to={'/'} className="self-center   hover:text-blue-500 text-xl text-heading font-semibold whitespace-nowrap">
              Blink Tutors
            </Link>
          </a>
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
                <Link to={'/register'} className="   p-2  rounded-md bg-blue-800 text-white hover:text-white hover:bg-blue-500">
                Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
