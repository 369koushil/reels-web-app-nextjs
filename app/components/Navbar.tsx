"use client"; // ✅ This must be added to use useState

import React from "react";
import { myClient } from "../libs/api-client";
import { IVideo } from "../models/Video";

interface NavbarProps {
  setPublicReelsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPublicVideos: React.Dispatch<React.SetStateAction<IVideo[]>>; // Replace `any[]` with the actual data type for videos if known
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar = ({setPublicReelsLoading, setPublicVideos,active,setActive}:NavbarProps) => {
 
  

  return (
    <div className="fixed bottom-8 left-[42%]">
      <ul className="menu text-lg font-medium menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
        <li>
          <a
            onClick={() => setActive("your reels")}
            className={active === "your reels" ? "bg-gray-700 hover:bg-gray-700" : ""}
          >
            Your reels
          </a>
        </li>
        <li>
          <a
            onClick={async() => {
              setActive("public reels")
              const data =await myClient.getPublicVideos()
              setPublicVideos(data)
              setPublicReelsLoading(false)
            }}
            className={active === "public reels" ? "bg-gray-700" : ""}
          >
            Public reels
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
