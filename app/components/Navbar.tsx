"use client"; // ✅ This must be added to use useState

import React, { useState } from "react";

const Navbar = ({active,setActive}:{active:any,setActive:any}) => {
 

  return (
    <div className="fixed bottom-8 left-[44%]">
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
            onClick={() => setActive("public reels")}
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
