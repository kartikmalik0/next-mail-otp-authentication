"use client"

import UserCard from "./UserCard"

const SideUserBar = () => {
  return (
    <div className=" flex flex-col h-[100vh] border-r-2 ">
      Messages
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
    </div>
  )
}

export default SideUserBar
