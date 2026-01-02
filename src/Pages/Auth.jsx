import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import { Link } from "react-router-dom";

const Auth = ({insideRegister}) => {

  
  return (
    <>
    <section className="min-h-screen bg-sky-50  justify-center items-center grid grid-cols-2">
      <h1 className=" text-6xl text-blue-500 font-bold text-center ">Blink Tutors</h1>
       <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-10  w-[450px]">
        
          <div className="flex flex-col items-center  ">
            <h1 className="text-3xl text-blue-500 font-bold my-2">
              {
                insideRegister? "Register": "Login"
              }
              
            </h1>
            {
              insideRegister&&(
 <input
              type="text"
              placeholder="Enter UserName"
              className="w-100 p-2 rounded-md hover:border hover:border-blue-500 my-2 border-gray-200"
            />
              )
            }
          
            <input
              type="text"
              placeholder="Enter Your Email"
              className="w-100 p-2 rounded-md hover:border hover:border-blue-500 my-2 border-gray-200"
            />
            <input
              type="password"
              placeholder="password"
              className="w-100 p-2 rounded-md hover:border hover:border-blue-500 my-2 border-gray-200"
            />

            {
              insideRegister ? (
                  <button className="border my-8 w-100   p-2  rounded-md bg-blue-800 text-white hover:text-white hover:bg-blue-500">
              Log In
            </button>) :(
                <button className="border my-8 w-100   p-2  rounded-md bg-blue-800 text-white hover:text-white hover:bg-blue-500">
              Sign Up
            </button>
            )
              
            }

            

            <GoogleLogin
            
              theme="outline"
              shape="circle"
              size="large"
            ></GoogleLogin>
            <hr className="w-100 my-2"/>

            <span className="my-2">Forget Password ?</span>

            {
              insideRegister ?(
                <div className="text-center">
                  <h1 className="text-2xl text-blue-500">Already a user</h1>
                   <Link to={'/login'}>
                   <p className="  ">
                    Login
                   </p>
                    </Link>
                </div>
               
              ):(
                
                 <div className="text-center">
                 
                  
                  <h1 className=" text-2xl text-blue-500 ">New User</h1>
                   <Link to={'/register'}> 
                   <p>
                    Register
                    </p>
                    </Link>
                </div>

              )
            }
          </div>
          <Link to={'/'}>
          <button className="text-sky-500"> Back to home</button>
          
          </Link>
        </div>
   
    </section>
     
    </>
  );
};

export default Auth;
