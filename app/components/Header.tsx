"use client"
import React from 'react'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const Header = () => {
  const {data:session}=useSession()
  return (
    <div>
      <div className="navbar bg-base-300">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">ReelsPro</a>
  </div>
  <div className="flex-none gap-2">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={session?.user.image!||"https://ik.imagekit.io/kx5q7kr95/blank_profile.png?updatedAt=1739388776297"} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-300  rounded-box z-[1] mt-3 w-52 p-3 shadow">
        <li className='py-2'>
          <a className="justify-between h-8 font-medium text-base  hover:bg-gray-700  bg-gray-800">
            Profile
            <span >{session?.user.name?.split(" ")[0]}</span>
          </a>
        </li>
        <li className='py-2'>
          <Link href='/uploadvideos' className="justify-between h-8 font-medium text-base  hover:bg-gray-700  bg-gray-800">
            Upload reels
          </Link>
        </li>
        <li>  <button onClick={() => signOut({callbackUrl:"/login"})} className="btn btn-error w-full">Logout</button></li>
      </ul>
    </div>
  </div>
</div>
    </div>
  )
}

export default Header
