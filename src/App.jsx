
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Courses from './Pages/Courses'
import InstructorCard from './Components/InstructorCard'
import StudentProfile from './Pages/StudentProfile'

function App() {

  return (
    <>

  <Routes>
  
    <Route path='/' element={ <Home />} />
    <Route path='/register' element={<Auth insideRegister={true} />} />
    <Route path='/login' element={<Auth />} />
<Route path='/about' element={<About />} />

<Route path='/course' element={<Courses />} />
<Route path='/contact' element={<Contact />}/>
<Route path='/instructorCard' element={<InstructorCard />}/>
<Route path='/studentProfile' element={<StudentProfile />} />


  </Routes>
    

    </>
  )
}

export default App
