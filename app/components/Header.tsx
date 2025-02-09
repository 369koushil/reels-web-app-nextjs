"use client"
import React from 'react'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

const Header = () => {
  const {data:session,status}=useSession()
  return (
    <div>
      <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">ReelsPro</a>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li>  <button onClick={() => signOut({callbackUrl:"/login"})} className="btn btn-error w-full">Logout</button></li>
      </ul>
    </div>
  </div>
  <div>
    {session?.user.name}
  </div>
</div>
    </div>
  )
}

export default Header
