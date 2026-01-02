import { Card } from 'flowbite-react'
import course from '../assets/course.jpg'
import { GiGraduateCap } from "react-icons/gi";
import { FaChalkboardTeacher } from "react-icons/fa";

import { GiTimeBomb } from "react-icons/gi";

const Choose = () => {
  return (
    <>
<section className="py-16 bg-sky-50 h-[100vh]">
  <div className="max-w-6xl mx-auto my-20 px-6">

    <h2 className="text-3xl font-bold text-blue-500 text-center">
      Why Choose Us
    </h2>

    <p className="text-gray-600 text-center mt-2">
      Discover what makes our platform the best choice for your learning journey
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 my-20">

   
      <div className="bg-white rounded-2xl hover:scale-105 transition duration-200 shadow-sm p-6  ">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex  items-center justify-center mx-30 my-2">
  <GiGraduateCap className='text-4xl text-blue-600 ' />
</div>

        <h3 className="text-lg font-semibold">Quality Courses</h3>
        <p className="text-gray-500 text-sm mt-2">
          Access high-quality content created by industry experts
        </p>
      </div>


      <div className="bg-white rounded-2xl hover:scale-105 transition duration-200  shadow-sm p-6">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-3 mx-30 my-2">
<FaChalkboardTeacher className='text-4xl text-blue-600' />
</div>

        <h3 className="text-lg font-semibold">Expert Instructors</h3>
        <p className="text-gray-500 text-sm mt-2">
          Learn from experienced professionals in their fields
        </p>
      </div>

     
      <div className="bg-white rounded-2xl hover:scale-105 transition duration-200 shadow-sm p-6">
        <div className="w-10 h-10 rounded-full bg-blue-50  flex items-center justify-center mb-3 mx-30 my-2">
<GiTimeBomb className='text-4xl text-blue-600' />
</div>

        <h3 className="text-lg font-semibold">Flexible Learning</h3>
        <p className="text-gray-500 text-sm mt-2">
          Study at your own pace from anywhere
        </p>
      </div>

    </div>
  </div>
</section>

    

   
      
    </>
  )
}

export default Choose

