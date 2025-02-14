"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const { data: session } = useSession();
  const userImage = session?.user?.image || "https://ik.imagekit.io/kx5q7kr95/blank_profile.png?updatedAt=1739388776297";

  return (
    <div className="border-b-2 border-black">
      <div className="navbar text-primaryh bg-primarybg">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">ReelsPro</a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  alt="User Profile"
                  src={userImage}
                  width={40}
                  height={40}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm bg-gray-200 dropdown-content  rounded-lg z-[1] mt-3 w-52 p-3 shadow"
            >
              <li className="py-2">
                <a className="justify-between text-primaryh border-2 border-black h-8 font-medium text-base hover:bg-white bg-gray-200">
                  Profile
                  <span>{session?.user.name?.split(" ")[0]}</span>
                </a>
              </li>
              <li className="py-2">
                <Link
                  href="/uploadvideos"
                  className="justify-between border-2 border-black  h-8 font-medium text-base hover:bg-primarynav bg-primarynav"
                >
                  Upload reels
                </Link>
              </li>
              <li>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="btn btn-error w-full"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
