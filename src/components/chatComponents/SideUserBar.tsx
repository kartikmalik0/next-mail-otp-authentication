"use client"

import { useQuery } from "@tanstack/react-query"
import UserCard from "./UserCard"
import { fetchUsers } from "@/actions/user/fetch-user"

const SideUserBar = () => {

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      return await fetchUsers()
    }
  })
  return (
    <div className=" flex flex-col h-[100vh] border-r-2 ">
      Messages
      {
        users?.map((user) => (
          <UserCard user={user} key={user?.id}/>
        ))
      }
    </div>
  )
}

export default SideUserBar
