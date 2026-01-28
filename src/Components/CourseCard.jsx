import { Card } from 'flowbite-react'
import course from '../assets/course.jpg'
import { Link } from 'react-router-dom'
import web from "../assets/web.jpg";
import ui from "../assets/ui.jpg";
import ml from "../assets/ml.jpg";



const CourseCard = () => {
  return (
    <>
<div>
    <div className='text-center'>
        <h1 className=' text-4xl text-blue-500 font-bold '>Popular Courses</h1>
        <p className='text-2xl text-gray-400'>Explore our most popular courses chosen by thousands of students</p>
    </div>
 <div className='grid grid-cols-3 my-10 mx-20 '>
        <div className=''>
        <Card
      className="max-w-sm h-100 bg-white dark:bg-white dark:border-gray-200  hover:scale-105 transition duration-200"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={web}
    >
      <h5 className="text-2xl font-bold tracking-tight ">
        Web Development Bootcamp
      </h5>
      <p className="font-normal text-gray-500">
      Master HTML, CSS, JavaScript, and React to build modern web applications from scratch.
      </p>
    </Card>
        </div>
          <div className=''>
        <Card
      className="max-w-sm h-100 bg-white dark:bg-white dark:border-gray-200  hover:scale-105 transition duration-200"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={ml}
    >
      <h5 className="text-2xl font-bold tracking-tight ">
     Data Science & Machine Learning A-Z
      </h5>
      <p className="font-normal text-gray-500">
     Advaned  with Powerbi and all
      </p>
    </Card>
        </div>
          <div className=''>
        <Card
      className="max-w-sm h-100 bg-white dark:bg-white dark:border-gray-200  hover:scale-105 transition duration-200"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={ui}
    >
      <h5 className="text-2xl font-bold tracking-tight ">
      UI/UX Design Masterclass
      </h5>
      <p className="font-normal text-gray-500">
      explore the various design skills
      </p>
    </Card>
        </div>
    </div>


<div className='flex justify-center'>

  <Link to={'/course'}>
   <button className="border my-8   p-2  rounded-md bg-blue-800 text-white hover:text-white hover:bg-blue-500">
        View More  Courses
        </button>
  </Link>
   
</div>
     

</div>
    

   
      
    </>
  )
}

export default CourseCard
