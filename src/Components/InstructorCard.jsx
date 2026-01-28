import React from 'react'
import Navbar from "../Components/Navbar";
 import rhino from '../assets/rhino.jpg'
 import peter from '../assets/peter.jpg'

 import mj from '../assets/mj.jpg'

 import may from '../assets/may.jpg'

 import emma from '../assets/emma.jpg'
 import me from '../assets/me.jpg'
import Footer from './Footer';





const InstructorCard = () => {
const instructors = [
  {
    id: 1,
    name: "Nehab",
    role: "Data Science Instructor",
    image: `${may}`,
    about:
      "Nehab is a passionate Data Science mentor with 7+ years of experience working on real-world machine learning projects and analytics solutions. She focuses on helping students understand concepts in a simple, practical way.",
    experience:
      "I believe data science should be learned through real problems, not just theory.",
    skills: ["Python", "Machine Learning", "Deep Learning"],
    teaches: [
      "Data Science & Machine Learning",
      "Deep Learning with TensorFlow",
      "AI for Beginners",
    ],
  },

  {
    id: 2,
    name: "Ashkar S",
    role: "Web Development Instructor",
    image: `${me}`,
    about:
      "Ashkar is a MERN-stack developer with hands-on experience building full-stack applications and guiding students through real project-based learning.",
    experience:
      "Code every day, build projects, and your confidence will grow naturally.",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    teaches: ["MERN Stack Bootcamp", "React Masterclass", "Node.js Essentials"],
  },

  {
    id: 3,
    name: "sidharth",
    role: "UI/UX Design Mentor",
    image: `${emma}`,
    about:
      "sidharth is a creative UI/UX mentor with 6+ years in product design, specializing in user-centered design, wireframing, and interactive prototyping.",
    experience:
      "Good design is invisible — users should feel the experience, not notice the interface.",
    skills: ["Figma", "Wireframing", "Prototyping", "Design Systems"],
    teaches: [
      "UI/UX Masterclass",
      "Figma for Beginners",
      "Product Design Basics",
    ],
  },

  {
    id: 4,
    name: "Akhil",
    role: "Python Programming Instructor",
    image: `${mj}`,
    about:
      "he is a Python mentor who focuses on helping students build a solid foundation in programming, problem solving, and automation through real-world examples.",
    experience:
      "Programming becomes powerful when you learn to apply it to daily problems.",
    skills: ["Python", "OOP", "Automation", "Flask"],
    teaches: [
      "Python Fundamentals",
      "Programming with OOP",
      "Python for Automation",
    ],
  },

  {
    id: 5,
    name: "Justin",
    role: "Cybersecurity Specialist Instructor",
    image: `${rhino}`,
    about:
      "he is a cybersecurity mentor focused on ethical hacking, system security, and network defense through hands-on learning and simulation-based training.",
    experience: "Security is not just a skill — it is a continuous mindset.",
    skills: ["Ethical Hacking", "Network Security", "SOC Analysis"],
    teaches: ["Ethical Hacking Basics", "Network Security", "Cyber Defense"],
  },

 {
  id: 6,
  name: "Ajay",
  role: "React & Next.js Core Instructor",
  image: `${peter}`,
  about:
    "he is a frontend engineer who specializes in building modern, high-performance web applications using React and Next.js. He focuses on writing clean, scalable code and teaching students how real-world frontend architecture works.",
  experience:
    "Great frontend development is about clarity, structure, and thinking in components.",
  skills: ["React", "Next.js", "JavaScript", "Frontend Architecture"],
  teaches: [
    "React Core Concepts",
    "Next.js — From Basics to Advanced",
    "Frontend Performance & Optimization"
  ],
}

];





  return (
    <>
    
      <Navbar />

      <div className='my-30'>
     <div className="max-w-6xl mx-auto mt-10 space-y-20">
  {instructors.map((ins) => (
    <div key={ins.id} className="grid grid-cols-1 md:grid-cols-2 gap-10">

   
      <div className="flex flex-col items-center  ">
        <img
          src={ins.image}
          className="w-[420px] h-[420px] object-cover object-center rounded-2xl"
          alt={ins.name}
        />

        <h1 className="text-3xl font-bold text-blue-500 mt-5">{ins.name}</h1>
        <p className="text-gray-500 mt-1">{ins.role}</p>
      </div>

      
      <div>
        <h2 className="text-2xl font-semibold mb-3">About Instructor</h2>
        <p className="text-gray-700 leading-relaxed">{ins.about}</p>

        <h3 className="text-xl text-blue-500 font-semibold mt-6 mb-2">Hear Me</h3>
        <p className="text-gray-700">{ins.experience}</p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {ins.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-2">Teaches</h3>
        <ul className="list-disc ml-6 text-gray-700">
            {ins.teaches.map((t) => (
              <li key={t}>{t}</li>
            ))}
        </ul>
      </div>
    </div>
  ))}
</div>



      </div>
      <Footer />
    </>
  )
}

export default InstructorCard
