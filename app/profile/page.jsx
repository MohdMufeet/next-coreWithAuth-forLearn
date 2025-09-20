"use client";
import { user } from "../../context/context";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

const page = () => {
  const data = user();
  const userdata = data.user;
  const [loading, setloading] = useState(true);
  const [uDataFromLs, setuDataFromLs] = useState();

  useEffect(() => {
    const udata = localStorage.getItem("user");

    const parsedData = JSON.parse(udata);
    setuDataFromLs(parsedData);
    setloading(false);
  }, []);
  if (loading) return null;

  return (
    <>
      <Navbar />

      <div
        className="
      bg-[#0084A8] w-[60%] lg:w-[40%] h-[50vh] lg:h-[40vh] m-auto absolute top-0 bottom-0 left-0 right-0 rounded-xl px-auto box-border text-center flex flex-col justify-center items-center"
      >
        {userdata && (
          <>
            <p className="text-2xl md:text-4xl text-white font-bold m-3">
              Welcome, {userdata?.name || uDataFromLs?.name}
            </p>
            <p className="text-base md:text-xl text-white m-3">
              Your Email Is {userdata?.email || uDataFromLs?.email}
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default page;
