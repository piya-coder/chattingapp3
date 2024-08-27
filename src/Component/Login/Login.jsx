import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaMessage } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider,
  signInWithPopup, FacebookAuthProvider 
  } from "firebase/auth";
import { Link } from "react-router-dom";



export const Login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const providerfacebook = new FacebookAuthProvider();

  ///usestate functionality implementation
  const [Eye, setEye] = useState(false);
 
  const HandleEye = () => {
    setEye(!Eye);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleInputValue = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.id]: e.target.value,
    });
  };

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [Error, setError] = useState({
    Emailerror: "",
    PasswordError: "",
  });
  ///email regex///
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/;
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ///handleLogin functionality implementation
  const handleLogin = (e) => {
    if (!inputValue.email) {
      setError({
        ...Error,
        Emailerror: "email is incorrect",
        PasswordError : "Password is incorrect",
      });
    } else if (!regex.test(inputValue.email)) {
      setError({
        ...Error,
        Emailerror: "email is incorrect", 
      });
    } else if (!inputValue.password) {
      setError({
        ...Error,
        PasswordError: "Password is incorrect",
      });
    } else if (!passwordRegex.test(inputValue.password)) {
      setError({
        ...Error,
        PasswordError: "Password is incorrect",
      });
    } else {     
      setInputValue({
        email: "",
        password: "",
      })
      setError({
        Emailerror: "",
        PasswordError: "",
      });
     signInWithEmailAndPassword(auth, inputValue.email , inputValue.password)
  .then((userCredential) => {
   console.log(userCredential);
   
  })
  .catch((error) => {
    console.log(error);
    
  });
  };
  console.log("helloodfhslkfj");
}

///handleLoginwithGoogle functionality 
const handleLoginwithGoogle = () =>{
  signInWithPopup(auth, provider).then((user)=>{
    const credential = GoogleAuthProvider.credentialFromResult(user);
    const token = credential.accessToken;
  }).catch((error)=>{
    console.log(error);
    
  })

}

///handleLoginwithFacebook functionality implementation
const handleLoginwithFacebook = ()=>{
  signInWithPopup(auth, providerfacebook)
  .then((result) => {
    const user = result.user;
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
  }).catch((error)=>{
    console.log(error);
    
  })
}
  return (
    <>
      <div className="flex justify-between">
        <div className=" w-1/4 h-100vh  ">
          <div className="flex flex-row justify-self-start items-center gap-3">
            <span className="text-[26px] text-white font-medium">
              <FaMessage />
            </span>
            <h1 className="text-[26px] text-white font-medium">Doot</h1>
          </div>
          <h2 className="text-base text-white font-normal opacity-40">
            Welcome Back !
          </h2>
        </div>
        <div
          className=" h-100vh bg-white 
          w-3/4 flex flex-col justify-center items-center
          pt-[140px] pb-8 rounded-2xl "
        >
          <div
            className=" flex justify-center items-center align-middle 
          flex-col gap-1 "
          >
            <h1 className=" text-black text-[26px] font-medium ">
              Welcome Back !
            </h1>
            <p className=" text-black text-base font-normal opacity-80 ">
              Sign in to continue to Doot.
            </p>
          </div>
          <div className="flex flex-col gap-3 mt-[60px]">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className=" flex flex-col w-input relative ">
                <label
                  htmlFor="email"
                  className="  text-base 
                  font-medium text-black mb-2"
                >
                  Email
                </label>
                <input
                  value={inputValue.email}
                  onChange={handleInputValue}
                  autoComplete="off"
                  type="text"
                  placeholder="Enter email"
                  name="email"
                  id="email"
                  className="inputfield w-full bottom-2 rounded-lg pr-5 py-3 pl-4 "
                />
                {Error.Emailerror && (
                  <span className=" text-red-500 text-[13px] font-normal mt-2 capitalize  ">
                   {Error.Emailerror}
                  </span>
                )}
              </div>
              <div className=" flex flex-col w-input relative ">
                <label
                  htmlFor=""
                  className="  text-base 
                font-medium text-black mb-2"
                >
                  Password
                </label>
                <input
                  type={Eye ? "text" : "password"}
                  autoComplete="off"
                  onChange={handleInputValue}
                  placeholder="Enter Password"
                  name="Password"
                  id="Password"
                  className="inputfield w-full bottom-2 
                  rounded-lg pr-5 py-3 pl-4"
                />
                {Error.PasswordError && (
                  <span className=" text-red-500 text-[13px] font-normal mt-2 capitalize  ">
                    {Error.PasswordError}
                  </span>
                )}

                <div
                  className=" absolute top-[50px] right-3
                cursor-pointer opacity-50 "
                  onClick={HandleEye}
                >
                  {Eye ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div>
                <p className=" text-small text-black font-normal ">
                  Remember me
                </p>
                <button
                  className="
                  w-input text-white text-small f
                  ont-medium bg-primary-color 
                  opacity-90 hover:bg-[#097c2e] px-1 
                  py-3 mt-8 rounded-lg ease-linear duration-300 "
                  type="submit"
                  onClick={handleLogin}
                >
                  Log in
                </button>
              </div>
            </form>

            <div className="flex flex-row justify-center items-center relative mt-8 ">
              <h2 className=" signUp text-black text-base font-medium absolute ">
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
                cursor-pointer" 
                onClick={handleLoginwithFacebook}
              >
                <FaFacebookF />
              </button>
              <button
                className=" icons 
                px-[80px] py-[8px] 
                rounded-lg bg-slate-100
                 hover:bg-slate-300 ease-linear duration-300 font-medium text-small 
                cursor-pointer " onClick={handleLoginwithGoogle}
              >
                <FcGoogle />
              </button>
            </div>
            <div className="text-center">
              <p className=" text-small text-black font-normal ">
                Don't have an account ?
                <span
                  className=" text-small text-primary-color font-normal 
                  opacity-90
                  hover:text-[#097c2e] hover:underline hover:decoration-primary-color ease-linear 
                  duration-200" 
                >
                  <Link to={"/"}>
                  Register</Link>
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
