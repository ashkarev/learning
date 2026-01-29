import React from "react";
import Navbar from "../Components/Navbar";
import { FaStar } from "react-icons/fa";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import courseBg from "../assets/courseBG.jpg";
import { Link, useNavigate } from "react-router-dom";
import web from "../assets/web.jpg";
import py from "../assets/py.png";
import ui from "../assets/ui.jpg";
import ml from "../assets/ml.jpg";
import react from "../assets/react.jpg";
import me from '../assets/me.jpg';
import two from '../assets/two.jpg'
import three from '../assets/three.jpg'
import four from '../assets/four.jpg'

import cyb from "../assets/cyb.jpeg";
import Footer from "../Components/Footer";

const Courses = () => {
  const navigate = useNavigate();

  const courseCard = [
    {
      title: "Data Science & Machine Learning A-Z",
      teacher: "nehab",
      hours: "36 hours",
      price: "₹ 100",
      img: `${ml}`,
      videoId: "X3paOmcrTjQ" // Sample DS video
    },
    {
      title: "UI/UX Design Masterclass",
      teacher: "sidarth ",
      hours: "24 hours",
      price: "₹ 100",
      img: `${ui}`,
      videoId: "c9Wg6Cb_YlU" // Sample UI/UX video
    },
    {
      title: "React & Next.js — The Complete Guide",
      teacher: "ajay",
      hours: "42 hours",
      price: "₹ 100",
      img: `${react}`,
      videoId: "SqcY0GlETPk" // React Tutorial
    },
    {
      title: "Full-Stack Web Development Bootcamp",
      teacher: "Ashkar S",
      hours: "48 hours",
      price: "₹ 100",
      img: `${web}`,
      videoId: "nu_pCVPKzTk" // Full Stack
    },
    {
      title: "Python for Beginners to Advanced",
      teacher: "Mj",
      hours: "30 hours",
      price: "₹ 100",
      img: `${py}`,
      videoId: "_uQrJ0TkZlc" // Python
    },
    {
      title: "Cybersecurity & Ethical Hacking",
      teacher: "Rhino",
      hours: "32 hours",
      price: "₹ 100",
      img: `${cyb}`,
      videoId: "3Kq1MIfTWCE" // CyberSec
    },
  ];

  const handleCourseClick = (course) => {
    navigate('/course-detail', { state: { course } });
  };

  return (
    <>
      <Navbar />

      {/* hero */}
      <div className="px-4">
        <div className="flex justify-center">
          <div
            style={{ backgroundImage: `url(${courseBg})` }}
            className="my-10 md:my-40 bg-cover bg-blend-soft-light bg-right border-gray-500 shadow-2xl h-auto md:h-100 rounded-2xl w-full max-w-[1000px] p-6 md:p-0"
          >
            <div className="inline-block p-2 border border-gray-300 rounded-3xl bg-blue-500 my-6 md:my-10 md:mx-10 text-white">
              <h1 className="text-center px-4">Featured Course</h1>
            </div>
            <div className="md:mx-10 pb-10 md:pb-0">
              <h1 className="text-3xl md:text-4xl text-blue-500 font-bold text-shadow-2xl">
                Complete Web Development Bootcamp 2024
              </h1>
              <p className="my-5 text-gray-900">
                Master full-stack development from beginner to advanced with
                hands-on projects
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 border w-full md:w-fit p-4 md:p-2 rounded-2xl md:rounded-3xl border-gray-100 bg-sky-100 ">
                <h2 className="flex gap-2 items-center">
                  <LiaChalkboardTeacherSolid className="text-3xl bg-blue-400 rounded-2xl text-white p-1" />
                  Ashkar S
                </h2>
                <span className="flex items-center"> ⁊ 48 hours</span>
                <span className="flex items-center"> ₹ 100</span>
                <div className="flex gap-1 items-center">
                  <FaStar className="text-amber-300 text-xl" />
                  <FaStar className="text-amber-300 text-xl" />
                  <FaStar className="text-amber-300 text-xl" />
                  <FaStar className="text-amber-300 text-xl" />
                  <FaStar className="text-amber-300 text-xl" />
                </div>
              </div>
              <Link to={"/register"}>
                <button className="border my-8 md:my-10 p-2 px-6 rounded-lg bg-blue-800 text-white hover:bg-blue-500 transition-colors w-full md:w-auto">
                  Enroll Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>


      {/* filter needed */}
      {/* <div className=" flex flex-row gap-3 mx-50 ">


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
      </div> */}

      {/* course card */}

      <div className="max-w-6xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6 text-blue-500 text-center">Explore Courses</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courseCard.map((course, i) => (
            <div
              key={i}
              onClick={() => handleCourseClick(course)}
              className="flex gap-4 bg-white rounded-2xl shadow-md p-3 hover:shadow-xl transition cursor-pointer hover:scale-[1.02] duration-200"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:mx-10 my-10 md:my-20">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center flex flex-col items-center gap-6 w-full hover:scale-105 transition-transform duration-500">
            <img
              src={me}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
            />
            <div className="w-full">
              <h2 className="text-xl font-semibold text-blue-500">Ashkar S</h2>
              <p className="text-lg">Web Development</p>
              <hr className="text-gray-400 my-2" />
              <p className="text-gray-500 text-base">1 Courses ⁊ 2+Years</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-6 w-full text-center hover:scale-105 transition-transform duration-500">
            <img
              src={two}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
            />
            <div className="w-full">
              <h2 className="text-xl font-semibold text-blue-500">gwen</h2>
              <p className="text-lg">Data Science</p>
              <hr className="text-gray-400 my-2" />
              <p className="text-gray-500 text-base">1 Courses ⁊ 2+ Years</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-6 w-full text-center hover:scale-105 transition-transform duration-500">
            <img
              src={three}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
            />
            <div className="w-full">
              <h2 className="text-xl font-semibold text-blue-500">miles</h2>
              <p className="text-lg">UIUX</p>
              <hr className="text-gray-400 my-2" />
              <p className="text-gray-500 text-base">1 Courses ⁊ 3+ Years</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-6 w-full text-center hover:scale-105 transition-transform duration-500">
            <img
              src={four}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
            />
            <div className="w-full">
              <h2 className="text-xl font-semibold text-blue-500">mary</h2>
              <p className="text-lg">Python</p>
              <hr className="text-gray-400 my-2" />
              <p className="text-gray-500 text-base">1 Courses ⁊ 1+ Years</p>
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
