"use client"
import { ReactNode, createContext, useState } from "react"

export const MessageContext = createContext<any>(undefined)

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<any>(undefined)
  const [selectedUser, setSelectedUser] = useState<any>((undefined))
  return (
    <MessageContext.Provider value={{
      message,
      setMessage,
      selectedUser,
      setSelectedUser
    }}>
      {children}
    </MessageContext.Provider>
  )
}

export default ContextProvider
