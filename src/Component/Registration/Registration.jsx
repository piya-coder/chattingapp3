import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { Link } from "react-router-dom";

import { ToastContainer, toast, Bounce } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaMessage } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

export const Registration = () => {
  const auth = getAuth();
  const [Email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  ///email regex///
  const passregex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/;
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ///input functionality implementation///
  const handleInput = (event) => {
    setEmail(event.target.value);
  };
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  ///error state///
  const [EmailError, setEmailError] = useState("");
  const [UsernameError, setUsernameError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const handleRegister = () => {
    if (!Email) {
      setEmailError("emailwrong");
    } else if (!regex.test(Email)) {
      setEmailError("emailwrong");
    } else if (!Username) {
      setEmailError("");
      setUsernameError("namenot");
    } else if (!Password) {
      setUsernameError("");
      setEmailError("");
      setPasswordError("passrohd wrodffj");
    } else if (!passregex.test(Password)) {
      setPasswordError("passrohd wrodffj");
    } else {
      setEmail("");
      setUsername("");
      setPassword("");
      setUsernameError("");
      setEmailError("");
      setPasswordError("");
      setLoading(true);
      ///sign up a new user///
      createUserWithEmailAndPassword(auth, Email, Password)
        .then((userCredential) => {
          toast("🦄 Please check your mail to verify!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            style: { width: "500px" },
          }).catch((error) => {
            console.log(error);
          });
          console.log(userCredential);
          sendEmailVerification(auth.currentUser).then(() => {
            console.log("check the mail");
          });
        })
        .catch((error) => {
          if (error.message.includes("email")) {
            toast(`${"email is already used"}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
              style: { width: "40vw" },
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <>
      <div className="flex justify-between">
        <ToastContainer />
        <div className=" w-1/4 h-100vh  ">
          <div className="flex flex-row justify-self-start items-center gap-3">
            <span className="text-[26px] text-white font-medium">
              <FaMessage />
            </span>
            <h1 className="text-[26px] text-white font-medium">Doot</h1>
          </div>
          <h2 className="text-base text-white font-normal opacity-40">
            Responsive Bootstrap 5 Chat App
          </h2>
        </div>
        <div
          className=" h-100vh bg-white 
          w-3/4 flex flex-col justify-center items-center
          pt-[40px] pb-8 rounded-2xl "
        >
          <div
            className=" flex justify-center items-center align-middle 
          flex-col gap-1 "
          >
            <h1 className=" text-black text-[26px] font-medium ">
              Register Account
            </h1>
            <p className=" text-black text-base font-normal opacity-80 ">
              Get your free Doot account now.
            </p>
          </div>
          <div className="flex flex-col gap-3 mt-[60px]">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className=" flex flex-col w-input relative ">
                <label
                  htmlFor="email"
                  className="  text-base 
                  font-medium text-black mb-2
                 "
                >
                  Email
                </label>
                <input
                  autoComplete="off"
                  onChange={handleInput}
                  type="text"
                  placeholder="Enter email"
                  name="email"
                  id="email"
                  className="inputfield w-full bottom-2 rounded-lg pr-5 py-3 pl-4
                  "
                />
                {EmailError && (
                  <span className=" text-red-500 text-[13px] font-normal mt-2 capitalize  ">
                    Please enter email
                  </span>
                )}
                <div
                  className=" sideIcon absolute top-[50px] right-3
                cursor-pointer "
                >
                  <FiAlertCircle />
                </div>
              </div>
              <div className=" flex flex-col w-input relative  ">
                <label
                  htmlFor=""
                  className="  text-base 
                font-medium text-black mb-2
                 "
                >
                  Username
                </label>
                <input
                  onChange={handleUsername}
                  type="text"
                  placeholder="Enter Username"
                  name="Username"
                  id="Username"
                  className="inputfield w-full bottom-2 rounded-lg pr-5 py-3 pl-4 "
                />
                {UsernameError && (
                  <span className=" text-red-500 text-[13px] font-normal mt-2 capitalize  ">
                    Please enter Username
                  </span>
                )}
                <div
                  className=" absolute top-[50px] right-3
                cursor-pointer "
                >
                  <FiAlertCircle />
                </div>
              </div>
              <div className=" flex flex-col w-input relative ">
                <label
                  htmlFor=""
                  className="  text-base 
                font-medium text-black mb-2
                 "
                >
                  Password
                </label>
                <input
                  onChange={handlePassword}
                  type="password"
                  placeholder="Enter Password"
                  name="Password"
                  id="Password"
                  className="inputfield w-full bottom-2 
                  rounded-lg pr-5 py-3 pl-4
                "
                />
                {PasswordError && (
                  <span className=" text-red-500 text-[13px] font-normal mt-2 capitalize  ">
                    Please enter Password
                  </span>
                )}
                <div
                  className=" absolute top-[50px] right-3
                cursor-pointer "
                >
                  <FiAlertCircle />
                </div>
              </div>
              <div>
                <p className=" text-small text-black font-normal ">
                  By registering you agree to the Doot{" "}
                  <span className=" text-small text-primary-color font-normal ">
                    Terms of Use
                  </span>
                </p>
                <button
                  className="
                  w-input text-white text-small f
                  ont-medium bg-primary-color 
                  opacity-90 hover:bg-[#097c2e] px-1 
                  py-3 mt-8 rounded-lg ease-linear duration-300 "
                  type="submit"
                  onClick={handleRegister}
                >
                  {" "}
                  Register
                </button>
                {Loading && (
                  <button type="button" class=" relative " disabled>
                    <span
                      class="animate-spin h-5 w-5 mr-3 absolute top-[-14px] rounded-xl right-[10px] bg-primary-color
                    border-[3px] border-white border-opacity-50"
                    >
                      <span className=" animate-spin h-2 w-2 rounded-full bg-primary-color absolute  "></span>
                    </span>
                  </button>
                )}
              </div>
            </form>

            <div className="flex flex-row justify-center items-center relative mt-8 ">
              <h2
                className=" signUp text-black text-base font-medium absolute
              "
              >
                Sign up using
              </h2>
            </div>
            <div className=" w-input flex justify-between mt-8 ">
              <button
                className=" icons
                px-[80px] py-[15px] 
                rounded-lg bg-slate-100
                hover:bg-slate-300 font-medium text-small
                ease-linear duration-300
                cursor-pointer  "
              >
                <FaFacebookF />
              </button>
              <button
                className=" icons 
                px-[80px] py-[8px] 
                rounded-lg bg-slate-100
                 hover:bg-slate-300 ease-linear duration-300 font-medium text-small 
                cursor-pointer "
              >
                <FcGoogle />
              </button>
            </div>
            <div className="text-center">
              <p className=" text-small text-black font-normal ">
                Already have an account ?
                <span
                  className=" text-small text-primary-color font-normal 
                  opacity-90
                  hover:text-[#097c2e] hover:underline hover:decoration-primary-color ease-linear 
                  duration-200"
                >
                  <Link to={"/login"}>Login</Link>
                </span>
              </p>
              <div className="flex justify-center gap-2 mt-[65px] ">
                <p className=" text-small text-black font-normal ">
                  © 2024 Doot.Crafted with
                </p>
                <span className=" text-red-400">
                  {" "}
                  <FaHeart />
                </span>
                <p className="text-small text-black font-normal">
                  by Themesbrand
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
