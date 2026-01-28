import React from "react";
import cor1 from '../assets/cor2.jpg'
import cor2 from '../assets/cor21.jpg'
import cor3 from '../assets/cor3.jpg'
import cor4 from '../assets/cor4.jpg'
import { Carousel } from "flowbite-react";
import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <>
      <div className="my-10 grid grid-cols-2 gap-4  bg-sky-50">

        <div className="my-48 mx-10">
            <h1 className="text-5xl">Learn Anytime, <span className="text-blue-500">Anywhere</span> </h1>
        <p className="my-10 text-xl text-gray-500">
          Unlock your potential with thousands of courses from expert <br />
          instructors. Start your learning journey today.
        </p>

        <Link to={'/login'}>
         <button className="border mx-6 p-2  rounded-md bg-blue-800 text-white hover:text-white hover:bg-blue-500">
          Get Started
        </button>
        </Link>
       
        <Link to={'/course'} className="border  p-2  rounded-md bg-blue-800 text-white hover:text-white hover:bg-blue-500">
          Courses
        </Link>
        </div>
        
            
<div className="h-56 sm:h-64 xl:h-80 2xl:h-96 my-20 mx-10">
  <Carousel slide={true} indicators={true}>
        <img src={cor2} alt="..." className="w-full h-full object-cover" />
        <img src={cor1} alt="..."  className="w-full h-full object-cover" />
        <img src={cor3} alt="..."  className="w-full h-full object-cover" />
        <img src={cor4} alt="..."  className="w-full h-full object-cover" />
      </Carousel>
       </div>


        
      </div>
    </>
  );
};

export default Hero;
