import React from "react";
import Navbar from "../Components/Navbar";
import { FaStar } from "react-icons/fa";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import courseBg from "../assets/courseBG.jpg";
import { Link } from "react-router-dom";
import web from "../assets/web.jpg";
import py from "../assets/py.png";
import ui from "../assets/ui.jpg";
import ml from "../assets/web.jpg";
import react from "../assets/react.jpg";
import me from '../assets/me.jpg';
import two from '../assets/two.jpg'
import three from '../assets/three.jpg'
import four from '../assets/four.jpg'

import cyb from "../assets/cyb.jpeg";
import Footer from "../Components/Footer";

const Courses = () => {
  const courseCard = [
    {
      title: "Data Science & Machine Learning A-Z",
      teacher: "may",
      hours: "36 hours",
      price: "₹ 100",
      img: `${ml}`,
    },
    {
      title: "UI/UX Design Masterclass",
      teacher: "Emma ",
      hours: "24 hours",
      price: "₹ 100",
      img: `${ui}`,
    },
    {
      title: "React & Next.js — The Complete Guide",
      teacher: "Peter",
      hours: "42 hours",
      price: "₹ 100",
      img: `${react}`,
    },
    {
      title: "Full-Stack Web Development Bootcamp",
      teacher: "Ashkar S",
      hours: "48 hours",
      price: "₹ 100",
      img: `${web}`,
    },
    {
      title: "Python for Beginners to Advanced",
      teacher: "Mj",
      hours: "30 hours",
      price: "₹ 100",
      img: `${py}`,
    },
    {
      title: "Cybersecurity & Ethical Hacking",
      teacher: "Rhino",
      hours: "32 hours",
      price: "₹ 100",
      img: `${cyb}`,
    },
  ];
  return (
    <>
      <Navbar />

      {/* hero */}
      <div>
        <div className="flex  justify-center  ">
          <div
            style={{ backgroundImage: `url(${courseBg})` }}
            className=" my-40 bg-cover bg-blend-soft-light bg-right  border-gray-500 shadow-2xl h-100 rounded-2xl w-[1000px]  "
          >
            <div className="p-2 border border-gray-300 rounded-3xl bg-blue-500 w-50 my-10 mx-10 text-white">
              <h1 className="text-center">Featured Course</h1>
            </div>
            <div className="mx-10">
              <h1 className="text-4xl text-blue-500 font-bold text-shadow-2xl">
                Complete Web Development Bootcamp 2024
              </h1>
              <p className="my-5  text-gray-900">
                Master full-stack development from beginner to advanced with
                hands-on projects
              </p>

              <div className="flex  gap-6 border w-135 p-2 rounded-3xl border-gray-100 bg-sky-100 ">
                <h2 className="flex gap-2 ">
                  <LiaChalkboardTeacherSolid className="text-3xl bg-blue-400 rounded-2xl text-white p-1" />{" "}
                  Ashkar S
                </h2>
                <span> ⁊ 48 hours</span>
                <span> ₹ 100</span>
                <FaStar className="text-amber-300 text-xl" />
                <FaStar className="text-amber-300 text-xl" />
                <FaStar className="text-amber-300 text-xl" />
                <FaStar className="text-amber-300 text-xl" />
                <FaStar className="text-amber-300 text-xl" />
              </div>
              <Link to={"/register"}>
                <button className="border my-10 p-2  rounded-lg bg-blue-800 text-white hover:text-white hover:bg-blue-500">
                  Enroll Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>


{/* filter needed */}
<div className=" flex flex-row gap-3 mx-50 ">
  

  <button className="px-4 py-2 rounded-full bg-blue-600 text-white border border-blue-600">
    All
  </button>

  <button className="px-4 py-2 rounded-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100">
    Web Development
  </button>

  <button className="px-4 py-2 rounded-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100">
    Data Science
  </button>

  <button className="px-4 py-2 rounded-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100">
    UI/UX
  </button>

  <button className="px-4 py-2 rounded-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100">
    AI
  </button>

  <button className="px-4 py-2 rounded-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100">
    Business
  </button>
</div>

{/* course card */}

      <div className="max-w-6xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6 text-blue-500 text-center">Explore Courses</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courseCard.map((course, i) => (
            <div
              key={i}
              className="flex   gap-4 bg-white rounded-2xl shadow-md p-3 hover:shadow-xl transition"
            >
              <img
                src={course.img}
                className="w-36 h-28 rounded-xl object-cover"
                alt=""
              />

              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{course.title}</h2>
                  <p className="text-gray-600 text-sm">{course.teacher}</p>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <span>⭐ ⭐ ⭐ ⭐ ⭐</span>
                    <span>{course.hours}</span>
                  </div>
                </div>

                <p className="text-blue-600 font-bold">{course.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* instructor */}

          <div className="min-h-screen ">
              <div className="text-center my-10">
                <h1 className="text-4xl text-blue-500 font-bold">Meet Our Team</h1>
                <p className="my-10 text-gray-600">
                  Passionate educators and innovators dedicated to transforming the
                  future of online learning
                </p>
              </div>
              <div className=" grid grid-cols-4 gap-6 mx-10 my-20">
                    <div className="bg-white rounded-2xl shadow-lg p-6 text-center flex flex-col  items-center gap-6 w-full max-w-xl hover:scale-105 duration-700">
                <img
                  src={me}
                  alt="profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                />
      
                <div>
                  <h2 className="text-xl font-semibold text-blue-500">Ashkar S</h2>
      
                  <a href="#" className="text-xl ">
                   Web Development
                  </a>
      <hr className="text-gray-400" />
                  <p className="text-gray-500 text-lg my-2">
                   1 Courses  2+Years
                  </p>
                </div>
              </div>
               <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-6 w-full max-w-xl text-center hover:scale-105 duration-700">
                <img
                  src={two}
                  alt="profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                />
      
                <div>
                  <h2 className="text-xl font-semibold  text-blue-500">gwen</h2>
      
                  <a href="#" className=" text-xl">
                  Data Science
                  </a>
      <hr className="text-gray-400" />
      
                  <p className="text-gray-500 text-lg mt-1">
                   1 Courses 2+ Years
                  </p>
                </div>
              </div>
               <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-6 w-full max-w-xl text-center hover:scale-105 duration-700">
                <img
                  src={three}
                  alt="profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                />
      
                <div>
                  <h2 className="text-xl font-semibold text-blue-500">miles</h2>
      
                  <a href="#" className="  text-xl">
                   UIUX
                  </a>
      <hr className="text-gray-400" />
      
                  <p className="text-gray-500 text-lg mt-1">
                  1 Courses 3+ Years
                  </p>
                </div>
              </div>
               <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-6 w-full max-w-xl text-center hover:scale-105 duration-700">
                <img
                  src={four}
                  alt="profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                />
      
                <div>
                  <h2 className="text-xl font-semibold text-blue-500">mary</h2>
      
                  <a href="#" className=" text-xl">
                   Python
                  </a>
      <hr className="text-gray-400" />

      
                  <p className="text-gray-500 text-lg mt-1">
                  1 Courses 1+ Years
                  </p>
                </div>
              </div>
              </div>
              <div className="flex justify-center">
                <Link to={'/instructorCard'}>
                  <button className="border mx-6 p-2  rounded-md bg-blue-800 text-white hover:text-white hover:bg-blue-500">
          View Our Team
        </button>
                </Link>
               
              </div>
            
      
            
            </div>
            <Footer />
    </>
  );
};

export default Courses;
