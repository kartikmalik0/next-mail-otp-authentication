import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const UserCard = () => {
    return (
        <div className="flex items-center w-full cursor-pointer gap-2 py-2 px-3 hover:bg-[#f4f4f4] transition-all mt-3">
            <Avatar className=" h-9 w-9">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className=" font-semibold">
                John Doe
            </p>
        </div>
    )
}

export default UserCard
