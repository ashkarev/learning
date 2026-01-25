
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Courses from './Pages/Courses'
import InstructorCard from './Components/InstructorCard'
import StudentProfile from './Pages/StudentProfile'
import Careers from './Pages/Careers'
import CourseDetail from './Pages/CourseDetail'


import { Flip, ToastContainer } from 'react-toastify'
import AdminLayout from './Admin/AdminLayout'
import AdminHome from './Admin/AdminHome'
import UsersPage from './Admin/Users'
import CoursesPage from './Admin/Courses'
import AdminCareers from './Admin/AdminCareers'

import AdminApplications from './Admin/AdminApplications'

function App() {

  return (
    <>

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Auth insideRegister={true} />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/about' element={<About />} />

        <Route path='/course' element={<Courses />} />
        <Route path='/course-detail' element={<CourseDetail />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/instructorCard' element={<InstructorCard />} />

        <Route path='/studentProfile' element={<StudentProfile />} />
        <Route path='/careers' element={<Careers />} />


        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path='users' element={<UsersPage />} />
          <Route path='courses' element={<CoursesPage />} />
          <Route path='careers' element={<AdminCareers />} />
          <Route path='applications' element={<AdminApplications />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />


    </>
  )
}

export default App
