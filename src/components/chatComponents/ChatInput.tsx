"use client"
import { Send } from "lucide-react"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { useContext, useState } from "react"
import { MessageContext } from "@/providers/context"
import io from "socket.io-client"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { fetchUsers } from "@/actions/user/fetch-user"
import socket from "@/lib/socket"






const ChatInput = () => {
    const { message, setMessage, selectedUser } = useContext<any>(MessageContext)
    const { data: currentUser, status } = useSession()

    const sendMessage = () => {

        if (!message || !selectedUser) {
            console.log('Message or selectedUser is missing');
            return;
        }

        const newMessage = { content: message, to: selectedUser?.id, from: currentUser?.user?.id }
        console.log(newMessage)
        socket.emit("sendMessage", newMessage)
        setMessage('')
    }
    return (
        <div className=" absolute bottom-0 left-0 w-full">
            <div className=" relative flex h-full flex-1 items-stretch md:flex-col">
                <div className=" relative flex flex-col w-full flex-grow p-4">
                    <div className=" relative">
                        <Textarea
                            rows={1}
                            autoFocus
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter your message..."
                            className=" resize-none pr-[4rem] text-base py-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                        />
                        <Button
                            onClick={sendMessage}
                            type="button"
                            className=" absolute bottom-1.5 right-[8px]" aria-label="send message">
                            <Send className=" h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ChatInput
