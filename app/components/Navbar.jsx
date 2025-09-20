"use client";
import LINK from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const Navbar = () => {
  const router = useRouter();
  async function handleLogout() {
    localStorage.removeItem("user");
    await axios.post("/api/logout", {
      method: "POST",
    });

    router.push("/");
  }

  return (
    <>
      <div className="w-screen bg-[#0084A8] flex h-[10vh] justify-center md:justify-between px-10 items-center">
        <p className="font-bold text-4xl text-white hidden md:block">
          Next Auth
        </p>

        <div className="flex justify-center items-center text-white ">
          <LINK className="font-italic text-xl px-6 hover:text-black" href="/">
            Home
          </LINK>

          <button
            onClick={handleLogout}
            className="text-xl px-6 font-italic hover:text-black"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
