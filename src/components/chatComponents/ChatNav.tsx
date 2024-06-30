import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"


const ChatNav = () => {
    return (
        <div className="flex gap-2 py-3 px-2 items-center border-b-2 border-dotted">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className=" flex flex-col justify-center">
                <p className="font-bold leading-3 text-[15px]">John doe</p>
                <p className="text-[12px] text-gray-500 font-medium">Last seen today at 2:58</p>
            </div>
        </div>
    )
}

export default ChatNav
