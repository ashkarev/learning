
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts";
import { ChartContainer } from "@/Components/ui/chart";

import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";

import PieChartCard from "@/Components/ui/PieChart.jsx";
import PerformanceInsights from "../Components/PerformanceInsight.jsx";
import AchievementInProfile from "../Components/AchievementInProfile.jsx";
import Footer from "../Components/Footer.jsx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserDetails, updateUser } from "../services/allApi";
import { authContext } from "../context/AuthContext";
import { baseUrl } from "../services/baseUrl";

const StudentProfile = () => {
  const { token } = useContext(authContext);

  const [userData, setUserData] = useState({});
  const [editData, setEditData] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const [preview, setPreview] = useState(
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
  );

  const chartData = [
    { Day: "Mon", time: 1 },
    { Day: "Tue", time: 2 },
    { Day: "Sat", time: 1 },
    { Day: "Thu", time: 3 },
    { Day: "Fri", time: 2 },
  ];


  useEffect(() => {
    getUser();
  }, []);


  useEffect(() => {
    setEditData(userData || {});

    if (userData?.proPic) {
      if (userData.proPic.startsWith("http")) {
        setPreview(userData.proPic);
      } else {
        setPreview(`${baseUrl}/uploads/${userData.proPic}`);
      }
    }
  }, [userData]);

  const getUser = async () => {
    try {
      let header = { Authorization: `Bearer ${token}` };
      let apires = await getUserDetails(header);

      if (apires.status === 200) {
        setUserData(apires.data);
      }
    } catch (error) {
      toast.error("Failed to load profile");
    }
  };


  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditData({ ...editData, proPic: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSaveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("userName", editData.userName || "");
      formData.append("phone", editData.phone || "");
      formData.append("bio", editData.bio || "");

      if (editData.proPic instanceof File) {
        formData.append("proPic", editData.proPic);
      }

      if (!editData._id) {
        toast.error("Refresh page and try again");
        return;
      }

      const header = { Authorization: `Bearer ${token}` };

      const apires = await updateUser(editData._id, formData, header);

      if (apires.status === 200) {
        toast.success("Profile updated");
        setUserData(apires.data.userDetails);
        getUser();
        setOpenModal(false);
      }
    } catch (error) {
      toast.error("Profile update failed");
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-sky-700 w-full py-4 px-4 md:px-8">
        <h1 className="text-white text-2xl md:text-3xl font-bold">Student Dashboard</h1>
        <p className="text-white/90 text-sm md:text-base font-semibold">
          Track your learning journey
        </p>
        <div className="flex justify-end">
          <Link to={"/"}>
            <h1 className="text-white p-1">Back to Home</h1>
          </Link>
        </div>
      </div>

      {/* Profile Card */}
      <div className="max-w-5xl mx-auto mt-6 md:mt-10 px-4 md:px-0">
        <div className="bg-white rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 p-6 md:p-10 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-blue-600 mb-3">
              Welcome {userData.userName || "Student"}
            </h1>

            <div className="space-y-2 text-blue-500">
              <p><b>Username:</b> {userData.userName}</p>
              <p><b>Email:</b> {userData.email}</p>
              <p><b>Phone:</b> {userData.phone}</p>
              <p><b>Bio:</b> {userData.bio}</p>
            </div>

            <Button
              onClick={() => setOpenModal(true)}
              className="mt-5 rounded-xl text-blue-500 border border-gray-300"
            >
              Edit Profile
            </Button>
          </div>

          <div className="flex justify-center order-first md:order-last">
            <img
              className="w-48 h-48 md:w-72 md:h-72 object-fill rounded-2xl shadow-md"
              src={preview}
              alt="profile"
            />
          </div>
        </div>
      </div>

      {/* Basic Edit Modal (Flowbite) */}
      <Modal className="" show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className="bg-blue-500 w-full text-white">Edit Profile</ModalHeader>
        <ModalBody className="bg-white w-full">
          <div className="space-y-4 ">
            <div>
              <div className="mb-2 block">
                <label className="font-bold">User Name</label>
              </div>
              <input
                className="w-full p-2 border rounded"
                value={editData.userName || ""}
                onChange={(e) =>
                  setEditData({ ...editData, userName: e.target.value })
                }
                placeholder="User Name"
              />
            </div>

            <div>
              <div className="mb-2 block">
                <label className="font-bold">Phone Number</label>
              </div>
              <input
                className="w-full p-2 border rounded"
                value={editData.phone || ""}
                onChange={(e) =>
                  setEditData({ ...editData, phone: e.target.value })
                }
                placeholder="Phone"
              />
            </div>

            <div>
              <div className="mb-2 block">
                <label className="font-bold">Bio</label>
              </div>
              <textarea
                className="w-full p-2 border rounded"
                rows={4}
                value={editData.bio || ""}
                onChange={(e) =>
                  setEditData({ ...editData, bio: e.target.value })
                }
                placeholder="Bio"
              />
            </div>

            <div>
              <div className="mb-2 block">
                <label className="font-bold text-blue-500 cursor-pointer" htmlFor="imgUpload">
                  Change Profile Picture
                </label>
              </div>
              <input
                type="file"
                className="hidden"
                id="imgUpload"
                onChange={onImageChange}
              />
              <img
                className="w-30 h-30 object-cover mt-2 rounded"
                src={preview}
                alt="preview"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="bg-blue-500 w-full">
          <Button onClick={onSaveProfile}>Save</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Charts */}
      <div className="bg-sky-50 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 md:px-18">
          <ChartContainer className="w-full">
            <BarChart width={500} height={280} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Day" />
              <Bar dataKey="time" fill="#3b82f6" radius={8} />
            </BarChart>
          </ChartContainer>

          <PieChartCard />
        </div>

        {/* Performance and Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 my-5 p-4 md:p-5 mx-0 md:mx-13">
          <PerformanceInsights />
          <AchievementInProfile />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default StudentProfile;
