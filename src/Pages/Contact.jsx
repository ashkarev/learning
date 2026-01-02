import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const Contact = () => {
  return (
    <>
    <Navbar />

    <div>
        <div className='my-20'>
            <h1 className="text-4xl text-blue-500 font-bold text-center ">
            Contact Us
          </h1>
          <p className=" text-gray-700 leading-relaxed text-xl text-center my-2">
           Have questions? We're here to help you succeed.
          </p>
        </div>
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto my-16">

  
  <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
    <h2 className="text-3xl text-blue-500 font-bold text-center my-5">Send us a message</h2>

    <div className="flex flex-col gap-4">

      <input
        type="text"
        placeholder=" Enter Your  name"
        className="hover:border-blue-500 rounded-xl p-3 bg-gray-50"
      />

      <input
        type="email"
        placeholder="Enter email"
        className=" hover:border-blue-500 rounded-xl p-3 bg-gray-50"
      />

      <input
        type="text"
        placeholder="Subject"
        className=" hover:border-blue-500 rounded-xl p-3 bg-gray-50"
      />

      <textarea
        placeholder="Tell us more about your inquiry…"
        rows="4"
        className="hover:border-blue-500 rounded-xl p-3 bg-gray-50"
      />

     <button className="border mx-6 p-2  rounded-lg bg-blue-800 text-white hover:text-white hover:bg-blue-500">
          Send Message
        </button>
    </div>
  </div>

  
  <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
    <h2 className="text-3xl  mb-6 text-blue-500 font-bold">Get in Touch</h2>

    <div className="space-y-6 text-gray-700">

      <div>
        <p className="font-semibold">Support Email</p>
        <p>supportblinktutors@gmail.com</p>
      </div>

      <div>
        <p className="font-semibold">Phone Number</p>
        <p> 123-4567</p>
      </div>

      <div>
        <p className="font-semibold">Office Location</p>
        <p>kerala</p>
        <p>India</p>
      </div>

    </div>
  </div>

</div>

    </div>
    <Footer />
      
    </>
  )
}

export default Contact
