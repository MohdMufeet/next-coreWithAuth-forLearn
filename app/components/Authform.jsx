"use client";
import axios from "axios";
import { useState } from "react";
import {user} from "../../context/context"
import { useRouter } from "next/navigation";





const Authform = () => {
const router = useRouter();
  const fuser = user();
  const [islogin, setIslogin] = useState(true);
  const [message, setMessage] = useState();

  const handleSubmit = async (e) => {
  
    let formdata = {};
    if (!islogin) {
      let uname = e.get("name");
      let uemail = e.get("email");
      let upass = e.get("password");
      formdata = { name: uname, email: uemail, password: upass };
    } else {
      let uemail = e.get("email");
      let upass = e.get("password");

      formdata = { email: uemail, password: upass };
    }

    const url = islogin ? "/api/auth?login=true" : "/api/auth?sign=true";

  
    const { data } = await axios.post(url, formdata, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (data.user) {
      setMessage(data.mes);
      fuser.setUser(data.user);
      const userDl =JSON.stringify(data.user);
      localStorage.setItem("token",data.token)
      localStorage.setItem("user",userDl)

         setTimeout(() => {
    router.push("/profile");
  }, 100); 
      
    
    }else{
      data.mes
      setMessage(data.mes);
    }
 
  }

  return (
    <>
      <div className="bg-[#FFFFFF] w-[90%] md:w-[50%] lg:w-[30%] h-[74%] m-auto absolute top-0 bottom-0 left-0 right-0 rounded-xl px-auto box-border text-center flex flex-col justify-center items-center">
      <h2 className="font-bold text-3xl ">{islogin ? "Login" : "Signup"}</h2>
      <form action={handleSubmit} className="flex flex-col justify-center">
        {!islogin && <input className="px-[30px] py-[10px] mt-[20px] mb-[15px] border border-[#979797] rounded" type="text" name="name" placeholder="Your Name" />}
        <input className="px-[30px] py-[10px] my-[15px] border border-[#979797] rounded" type="email" name="email" placeholder="Your Email" />
        <input className="px-[30px] py-[10px] my-[15px] border border-[#979797] rounded" type="password" name="password" placeholder="Your Password" />
        <button className="bg-[#007498] px-[30px] py-[10px] my-[15px] hover:bg-black hover:duration-200 hover:delay-100 hover:ease-in-out text-white" type="submit">{islogin ? "Login" : "Sign Up"}</button>
        
 
      </form>
   
      <p className="mb-4">
        {islogin ? (
          <>
            Don't have a account{" "}
            <button className="text-[#1379A3]"
              onClick={() => {
                setIslogin(false);
              }}
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            {" "}
            Already have an account{" "}
            <button className="text-[#1379A3]"
              onClick={() => {
                setIslogin(true);
              }}
            >
              Login
            </button>
          </>
        )}
      </p>
      {message && <p className={(message === "password wrong" || message === "No user found. Sign up." ) ? "text-red-700" : "text-green-700" }>{message}</p>}</div>

    </>
  );
};

export default Authform;
