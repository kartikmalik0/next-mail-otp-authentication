import ChatInput from "./ChatInput"
import ChatNav from "./ChatNav"
import ChattingSection from "./ChattingSection"

const UserChatSection = () => {
  return (
    <div className=" pl-3 relative">
      <ChatNav/>
      <ChattingSection/>
      <ChatInput/>
    </div>
  )
}

export default UserChatSection
