import React from "react";
import Navbar from "../Components/Navbar";
import about1 from "../assets/abut.jpg";
import { PiStudentDuotone } from "react-icons/pi";
import { GrCertificate } from "react-icons/gr";
import { LiaBookSolid } from "react-icons/lia";
import { FaPeopleRobbery } from "react-icons/fa6";
import me from '../assets/me.jpg';
import two from '../assets/two.jpg'
import three from '../assets/three.jpg'
import four from '../assets/four.jpg'
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-sky-50">
        <div className="grid grid-cols-2 gap-10  mx-20 text-center">
          <div className="my-52">
            <h1 className="text-4xl text-blue-500 font-bold">
              About Our Learning Platform
            </h1>
            <p className="my-10 text-gray-600">
              Empowering students worldwide to unlock their potential through
              accessible, high-quality education. Join thousands who are
              transforming their careers and achieving their dreams.
            </p>
          </div>
          <div className="my-52">
            <img className="rounded-2xl" src={about1} alt="" />
          </div>
        </div>
      </div>
      {/* misssomm */}

      <div className="min-h-screen bg-gray-50 flex justify-center items-start py-16">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-10">
          <h1 className="text-4xl text-blue-500 font-bold text-center my-12">
            Our Mission & Vision
          </h1>
          <p className=" text-gray-700 leading-relaxed text-justify">
            At our core, we believe that quality education should be accessible
            to everyone, regardless of their background or circumstances. Our
            mission is to democratize learning by providing world-class courses
            that empower individuals to acquire new skills, advance their
            careers, and pursue their passions. We are committed to fostering a
            global community of learners who support and inspire each other.
          </p>

          <p className=" text-gray-700 leading-relaxed text-justify">
            Our vision is to create a future where continuous learning is
            seamlessly integrated into everyday life. Through innovative
            technology, engaging content, and expert instruction, we aim to
            transform education into an experience that is not only effective
            but also enjoyable. We strive to be the catalyst for personal and
            professional growth, helping millions achieve their fullest
            potential and contribute meaningfully to society.
          </p>
        </div>
      </div>

      {/* impact */}

      <div className="bg-sky-50 min-h-screen">
        <h1 className="text-4xl text-blue-500 font-bold text-center  ">
          Our Impact in Numbers
        </h1>

        <div className="my-10">
          <div className="max-w-6xl mx-auto my-20 px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 my-20">
              <div className="bg-white rounded-2xl hover:scale-105 transition duration-200 shadow-sm p-6 ">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex  items-center justify-center mx-19  my-2">
                  <FaPeopleRobbery className="text-4xl text-blue-600" />
                </div>

                <h3 className="text-3xl text-blue-500 text-center font-bold">
                  100+
                </h3>
                <p className="text-gray-500 text-center text-2xl mt-2">
                  Active Learners
                </p>
              </div>

              <div className="bg-white rounded-2xl hover:scale-105 transition duration-200 shadow-sm p-6  ">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex  items-center justify-center mx-19 my-2">
                  <LiaBookSolid className="text-4xl text-blue-600 " />
                </div>

                <h3 className="text-3xl text-blue-500 text-center font-bold">
                  10+
                </h3>
                <p className="text-gray-500 text-center text-2xl mt-2">
                  Active Courses
                </p>
              </div>

              <div className="bg-white rounded-2xl hover:scale-105 transition duration-200  shadow-sm p-6">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-3 mx-19 my-2">
                  <PiStudentDuotone className="text-4xl text-blue-600" />
                </div>

                <h3 className="text-3xl text-blue-500 text-center font-bold">
                  5+
                </h3>
                <p className="text-gray-500 text-center text-2xl mt-2">
                  Inspectors
                </p>
              </div>

              <div className="bg-white rounded-2xl hover:scale-105 transition duration-200 shadow-sm p-6">
                <div className="w-10 h-10 rounded-full bg-blue-50  flex items-center justify-center mb-3 mx-19 my-2">
                  <GrCertificate className="text-4xl text-blue-600" />
                </div>

                <h3 className="text-3xl text-blue-500 text-center font-bold">
                  10+
                </h3>
                <p className="text-gray-500 text-center text-2xl mt-2">
                  certificates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* team section */}
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

            <a href="#" className="text-sm hover:underline">
              Founder & CEO
            </a>

            <p className="text-gray-500 text-sm mt-1">
              Visionary leader with 1 years in this field
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

            <a href="#" className=" text-sm hover:underline">
             Chief Technology Officer
            </a>

            <p className="text-gray-500 text-sm mt-1">
             Building innovative learning solutions
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

            <a href="#" className=" text-sm hover:underline">
             Head of Content
            </a>

            <p className="text-gray-500 text-sm mt-1">
              Curating world-class educational content
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

            <a href="#" className=" text-sm hover:underline">
             Head of Student Success
            </a>

            <p className="text-gray-500 text-sm mt-1">
              Ensuring every learner achieves their goals
            </p>
          </div>
        </div>
        </div>

      
      </div>
      {/* last */}

      <div>
         <div className="min-h-screen bg-gray-50 my-[-100px] flex justify-center items-start py-16">
        <div className="max-w-4xl w-full bg-sky-50 rounded-2xl shadow-lg p-10">
          <h1 className="text-4xl text-blue-500 font-bold text-center my-12">
            We believe learning should be accessible to everyone
          </h1>
          <p className=" text-gray-700 leading-relaxed text-xl text-center">
            Join our community of learners and start your journey towards success today
          </p>
          <div className="flex justify-center my-7">
            <Link to={'/register'}>
              <button className="border mx-6 p-2  rounded-md bg-blue-800 text-white hover:text-white hover:bg-blue-500">
          Get Started
        </button>
            </Link>


            
          </div>

       
        </div>
      </div>
      </div>
<Footer />
    


    </>
  );
};

export default About;
