import React from 'react'
import SideUserBar from '@/components/chatComponents/SideUserBar'
import UserChatSection from '@/components/chatComponents/UserChatSection'


const Dashboard = () => {

  return (
    <div className=' grid p-3 grid-cols-[30%,1fr]'>
      <SideUserBar />
      <UserChatSection/>
    </div>
  )
}

export default Dashboard
