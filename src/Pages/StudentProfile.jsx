"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis,Pie,PieChart,Cell,Tooltip } from "recharts";
import { ChartContainer } from "@/components/ui/chart";



import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";


import PieChartCard from "@/Components/ui/PieChart.jsx";
import PerformanceInsights from "../Components/PerformanceInsight";
import AchievementInProfile from "../Components/AchievementInProfile";
import Footer from "../Components/Footer";



const StudentProfile = () => {

    const chartData = [
  { Day: "Mon", time: 1 },
  { Day: "Tue", time: 2 },
  { Day: "Sat", time: 1 },
  { Day: "Thu", time: 3 },
  { Day: "Fri", time: 2 },

];
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      {/* Top Blue Header */}
      <div className="bg-sky-700 w-full py-4 px-8">
        <h1 className="text-white text-3xl font-bold">Student Dashboard</h1>
        <p className="text-white/90 font-semibold">
          Track your learning journey and achievements
        </p>
      </div>

      {/* Profile Card */}
      <div className="max-w-5xl mx-auto mt-10">
        <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-3xl shadow-xl grid grid-cols-2 gap-10 p-10 items-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-3">
              Welcome Student
            </h1>

            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">User Name:</span> Ashkar S
              </p>
              <p>
                <span className="font-semibold">Email:</span> student@gmail.com
              </p>
              <p>
                <span className="font-semibold">Phone:</span> 123456789
              </p>
              <p className="font-semibold">Date of Birth : </p>
              <p className="font-semibold">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae
                ducimus quidem nobis aliquam, corrupti veritatis aliquid sunt
                aut optio quibusdam commodi minus nisi nesciunt! Inventore ab
                nam explicabo consequuntur aperiam.
              </p>

              <p>
                <span className="font-semibold">Joined on:</span>{" "}
                <span className="text-sky-500 font-semibold">Jan 1</span>
              </p>
            </div>

            <Button
              onClick={() => setOpenModal(true)}
              className="mt-5 rounded-xl text-blue-500 border border-gra"
            >
              Edit Profile
            </Button>
          </div>

          <div className="flex justify-center ">
            <img
              className="w-64 h-64 object-fill rounded-2xl shadow-md "
              src="https://static.vecteezy.com/system/resources/previews/042/332/098/non_2x/default-avatar-profile-icon-grey-photo-placeholder-female-no-photo-images-for-unfilled-user-profile-greyscale-illustration-for-socail-media-web-vector.jpg"
              alt="profile"
            />
          </div>
        </div>
      </div>
      <Modal className="" show={openModal} onClose={() => setOpenModal(false)}>
        <div className="bg-white w-120 ">
          <ModalHeader>
            <h1 className="text-3xl font-bold text-blue-500 text-center">
              Edit Profile
            </h1>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-6">
              <input
                className="w-100 p-2  rounded-xl border-gray-200 shadow-2xs hover:border-blue-500"
                type="text"
                placeholder="your Name"
              />
              <input
                className="w-100 p-2  rounded-xl border-gray-200 shadow-2xs hover:border-blue-500"
                type="text"
                placeholder="your email"
              />
              <input
                className="w-100 p-2  rounded-xl border-gray-200 shadow-2xs hover:border-blue-500"
                type="text"
                placeholder="your Phone"
              />
              <textarea
                className="w-100 p-2  rounded-xl border-gray-200 shadow-2xs hover:border-blue-500"
                placeholder="bio"
                name=""
                id=""
              ></textarea>
              <input
                className="w-52 p-2  rounded-xl border-gray-200 shadow-2xs hover:border-blue-500"
                type="date"
                placeholder="DOB"
              />
              <input className="hidden" type="file" name="" id="one" />
              <label htmlFor="one">
                <img
                  className=" h-30 object-fill rounded-2xl shadow-md "
                  src="https://static.vecteezy.com/system/resources/previews/042/332/098/non_2x/default-avatar-profile-icon-grey-photo-placeholder-female-no-photo-images-for-unfilled-user-profile-greyscale-illustration-for-socail-media-web-vector.jpg"
                  alt="profile"
                  id="one"
                />
              </label>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="border border-gray-300 rounded-2xl text-white bg-blue-500 hover:bg-sky-400"
              onClick={() => setOpenModal(false)}
            >
              Save changes
            </Button>
            <Button
              className="border border-gray-300 rounded-2xl text-white bg-red-500 hover:bg-red-400"
              onClick={() => setOpenModal(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </div>
      </Modal>


      {/* chart */}
      <div className="bg-sky-50">
        <div className="border-0 grid grid-cols-2  mx-18">

        <ChartContainer className="">
  <div className="my-10">
    <h2 className="text-2xl font-bold text-blue-500">Study Activity</h2>
    <p className="text-sm text-gray-500"></p>
  </div>

  <BarChart width={500} height={280} data={chartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="Day" />
    <Bar dataKey="time" fill="#3b82f6" radius={8} />
  </BarChart>

  <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
    <TrendingUp className="h-4 w-4 text-green-500" />
    this Month
  </div>
</ChartContainer>


<div className="my-10">
    <PieChartCard />
</div>




      </div>
      </div>
      
      {/* performance */}

      <div className="my-20">
          <h1 className="text-3xl text-center text-blue-500 font-bold ">
          Performance Insights
        </h1>
        <PerformanceInsights />

      </div>

      {/* acheivenment */}
  <div className="bg-sky-50">
     <div className="mx-30  ">
         <h1 className="text-4xl text-center text-blue-500 font-bold my-auto ">
         Certification
        </h1>
        <AchievementInProfile />

      </div>
  </div>
  <Footer />
     
    </>
  );
};

export default StudentProfile;
