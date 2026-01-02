import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className=" mt-16 ">
  <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

    
    <div>
      <h2 className="text-2xl font-bold text-blue-500">LearnHub</h2>
      <p className="text-gray-600 mt-3 text-sm">
        Empowering learners with quality education anytime, anywhere.
      </p>
    </div>

 
    <div>
      <h3 className="font-semibold mb-3 text-blue-500">Quick Links</h3>
      <ul className="space-y-2 text-gray-600 text-sm">
        <li className="hover:text-blue-600 cursor-pointer">Home</li>
        <li className="hover:text-blue-600 cursor-pointer">Courses</li>
        <li className="hover:text-blue-600 cursor-pointer">About</li>
        <li className="hover:text-blue-600 cursor-pointer">Contact</li>
      </ul>
    </div>

   
    <div>
      <h3 className="font-semibold mb-3 text-blue-500">Support</h3>
      <ul className="space-y-2 text-gray-600 text-sm">
        <li className="hover:text-blue-600 cursor-pointer">Help Center</li>
        <li className="hover:text-blue-600 cursor-pointer">FAQs</li>
        <li className="hover:text-blue-600 cursor-pointer">Privacy Policy</li>
        <li className="hover:text-blue-600 cursor-pointer">Terms & Conditions</li>
      </ul>
    </div>

   
    <div>
      <h3 className="font-semibold mb-3 text-blue-500">Stay Updated</h3>
      <p className="text-gray-600 text-sm mb-3">
        Subscribe to get course updates and offers.
      </p>

      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 rounded-md border focus:ring-1 focus:ring-blue-500 outline-none bg-white"
        />
        <button className="px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700">
          Join
        </button>
      </div>
    </div>
  </div>



</footer>

      
    </>
  )
}

export default Footer
