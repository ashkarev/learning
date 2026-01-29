import { GoogleLogin } from "@react-oauth/google";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { googleApi, loginApi, registerApi } from "../services/allApi";
import { authContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const Auth = ({ insideRegister }) => {

  const { saveToken } = useContext(authContext);


  // const saveToken=useContext(authContext)
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });



  const onRegisterClick = async () => {
    try {
      if (
        userData.userName == "" ||
        userData.email == "" ||
        userData.password == ""
      ) {
        toast.error("Please Fill the form to continue");
      } else {
        let apires = await registerApi(userData);
        // console.log(apires)
        if (apires.status == 201) {
          toast.success("Successfully Registered");
          navigate("/login");
        } else {
          console.log(apires);
          if (apires.response && apires.response.data) {
            toast.error(apires.response.data.message);
          } else {
            toast.error("Registration failed");
          }
        }
      }
    } catch (error) {
      console.log(apires);
      toast.error("something went wrong");
    }
  };

  const onLoginClick = async () => {
    try {
      let reqBody = {
        email: userData.email,
        password: userData.password,
      };
      let apires = await loginApi(reqBody);
      // console.log(apires)
      if (apires.status == 200) {
        toast.success("successfully Login");
        saveToken(apires.data.token);
        localStorage.setItem("user", JSON.stringify(apires.data.existingUser));

        try {
          const decoded = jwtDecode(apires.data.token);
          if (decoded.userType && decoded.userType.toLowerCase() === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } catch (error) {
          navigate("/");
        }
      } else {
        if (apires.response && apires.response.data) {
          toast.error(apires.response.data.message);
        } else {
          toast.error("Login failed");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const googleClick = async (credentials) => {
    console.log(credentials)

    let decodeData = jwtDecode(credentials.credential)
    console.log(decodeData)
    let payload = {
      userName: decodeData.name,
      email: decodeData.email,
      proPic: decodeData.picture,
    };
    let apires = await googleApi(payload);
    console.log(apires);

    if (apires.status == 200 || apires.status == 201) {
      toast.success(apires.data.message);
      saveToken(apires.data.token);
      // saveToken(apires.data.token)

      try {
        const decoded = jwtDecode(apires.data.token);
        if (decoded.role && decoded.role.toLowerCase() === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } catch (error) {
        navigate("/");
      }

    } else {
      toast.error(apires.response.data.message);
    }


  }

  return (
    <>
      <section className="flex flex-col lg:flex-row min-h-screen bg-sky-50 justify-center items-center p-4">
        <h1 className="text-4xl md:text-6xl text-blue-500 font-bold text-center mb-8 lg:mb-0 lg:mr-20">
          Blink Tutors
        </h1>
        <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-6 md:p-10 w-full max-w-[450px]">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl md:text-3xl text-blue-500 font-bold my-2">
              {insideRegister ? "Register" : "Login"}
            </h1>
            {insideRegister && (
              <input
                onChange={(e) =>
                  setUserData({ ...userData, userName: e.target.value })
                }
                type="text"
                placeholder="Enter UserName"
                className="w-full p-2 rounded-md hover:border hover:border-blue-500 my-2 border-gray-200"
              />
            )}

            <input
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              type="text"
              placeholder="Enter Your Email"
              className="w-full p-2 rounded-md hover:border hover:border-blue-500 my-2 border-gray-200"
            />
            <input
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              type="password"
              placeholder="password"
              className="w-full p-2 rounded-md hover:border hover:border-blue-500 my-2 border-gray-200"
            />

            {insideRegister ? (
              <button
                onClick={onRegisterClick}
                className="border my-8 w-full   p-2  rounded-md bg-blue-800 text-white hover:text-white hover:bg-blue-500"
              >
                Register
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="border my-8 w-full   p-2  rounded-md bg-blue-800 text-white hover:text-white hover:bg-blue-500"
              >
                Login
              </button>
            )}

            <GoogleLogin
              onSuccess={(credentialresponse) => {
                googleClick(credentialresponse)
              }}
              theme="outline"
              shape="circle"
              size="large"
            ></GoogleLogin>
            <hr className="w-full my-2" />

            <span className="my-2">Forget Password ?</span>

            {insideRegister ? (
              <div className="text-center">
                <h1 className="text-2xl text-blue-500">Already a user</h1>
                <Link to={"/login"}>
                  <p className="  ">Login</p>
                </Link>
              </div>
            ) : (
              <div className="text-center">
                <h1 className=" text-2xl text-blue-500 ">New User</h1>
                <Link to={"/register"}>
                  <p>Register</p>
                </Link>
              </div>
            )}
          </div>
          <Link to={"/"}>
            <button className="text-sky-500"> Back to home</button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Auth;
