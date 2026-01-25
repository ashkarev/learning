"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Pie,
  PieChart,
  Cell,
  Tooltip,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";

import React, { useContext, useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserDetails, updateUser } from "../services/allApi";
import { authContext } from "../context/AuthContext";
import { BiObjectsVerticalBottom } from "react-icons/bi";

const StudentProfile = () => {
  const [userData, setUserData] = useState({});
  const chartData = [
    { Day: "Mon", time: 1 },
    { Day: "Tue", time: 2 },
    { Day: "Sat", time: 1 },
    { Day: "Thu", time: 3 },
    { Day: "Fri", time: 2 },
  ];
  const [openModal, setOpenModal] = useState(false);

  const { token } = useContext(authContext);
  const [editData, setEditData] = useState({
    userName: "",
    email: "",
    phone: "",
    bio: "",
    Propic: "",
  });
  const [preview, setPreview] = useState(
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80",
  );

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setEditData(userData);
  }, [userData]);

  const getUser = async () => {
    try {
      let header = {
        Authorization: `Bearer ${token}`,
      };
      let apires = await getUserDetails(header);
      console.log(apires.data);
      if (apires.status == 200) {
        setUserData(apires.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("something happened while getting user Data");
    }
  };

  const onImageChange = (e) => {
    console.log(e.target.files[0]);

    let url = URL.createObjectURL(e.target.files[0]);
    setEditData({ ...editData, Propic: e.target.files[0] });
    setPreview(url);
  };
  const onSaveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("userName", editData.userName);
      formData.append("phone", editData.phone);
      formData.append("bio", editData.bio);

      if (editData.Propic instanceof File) {
        formData.append("Propic", editData.Propic);
      }

      const header = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const apires = await updateUser(editData._id, formData, header);

      if (apires.status === 200) {
        toast.success("Profile updated");
        setUserData(apires.data.userDetails);
        setOpenModal(false);
      }
    } catch (error) {
      toast.error("Profile update failed");
    }
  };

  return (
    <>
      {/* Top Blue Header */}
      <div className="bg-sky-700 w-full py-4 px-8">
        <h1 className="text-white text-3xl font-bold">Student Dashboard</h1>
        <p className="text-white/90 font-semibold">
          Track your learning journey and achievements
        </p>
        <div className="flex justify-end">
          <div className="w-25 text-center border-0 shadow-2xl rounded-xl ">
            <Link to={"/"}>
              <h1 className="text-white  p-1">Back to Home</h1>
            </Link>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="max-w-5xl mx-auto mt-10">
        <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-3xl shadow-xl grid grid-cols-2 gap-10 p-10 items-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-3">
              Welcome Student
            </h1>

            <div className="space-y-2 text-blue-500">
              <p>
                <span className="font-semibold text-black">User Name:</span>
                {userData.userName}
              </p>
              <p className="text-blue-500">
                <span className="font-semibold text-black">Email:</span>{" "}
                {userData.email}
              </p>
              <p className="text-blue-500">
                <span className="font-semibold text-black">Phone:</span>{" "}
                {userData.phone}
              </p>
              <p className="font-semibold ">
                <span className="text-black">BIO: {userData.bio}</span>
              </p>

              <p>
                <span className="font-semibold text-black">Joined on:</span>{" "}
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
              className="w-64 h-64 object-fill rounded-2xl shadow-md"
              src={preview}
              alt="profile"
            />
          </div>
        </div>
      </div>
      <Modal className="" show={openModal} onClose={() => setOpenModal(false)}>
        <div className="bg-white w-120 ">
          <ModalHeader className="text-3xl font-bold text-blue-500 text-center bg-blue-600 ">
            Edit Profile
          </ModalHeader>
          <ModalBody>
            <div className="space-y-6">
              <input
                onChange={(e) =>
                  setEditData({ ...editData, userName: e.target.value })
                }
                value={editData.userName}
                className="w-100 p-2  rounded-xl border-gray-200 shadow-2xs hover:border-blue-500"
                type="text"
                placeholder="your Name"
              />
              <input
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
                value={editData.email}
                className="w-100 p-2  rounded-xl border-gray-200 shadow-2xs hover:border-blue-500"
                type="text"
                placeholder="your email"
              />
              <input
                onChange={(e) =>
                  setEditData({ ...editData, phone: e.target.value })
                }
                value={editData.phone}
                className="w-100 p-2  rounded-xl border-gray-200 shadow-2xs hover:border-blue-500"
                type="text"
                placeholder="your Phone"
              />
              <textarea
                onChange={(e) =>
                  setEditData({ ...editData, bio: e.target.value })
                }
                value={editData.bio}
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

              <input
                className="hidden"
                type="file"
                name=""
                id="one"
                onChange={(e) => onImageChange(e)}
              />
              <label htmlFor="one">
                <img
                  className=" h-30 object-fill rounded-2xl shadow-md "
                  src={preview}
                  id="one"
                />
              </label>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="border border-gray-300 rounded-2xl text-white bg-blue-500 hover:bg-sky-400"
              onClick={onSaveProfile}
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
              <h2 className="text-2xl font-bold text-blue-500">
                Study Activity
              </h2>
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
