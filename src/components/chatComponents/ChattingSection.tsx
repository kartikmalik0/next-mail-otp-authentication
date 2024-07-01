"use client"
import { useContext, useEffect, useState } from "react";
import socket from "@/lib/socket";
import { MessageContext } from "@/providers/context";

const ChattingSection = () => {
  const { selectedUser } = useContext(MessageContext);
  const [messages, setMessages] = useState<Record<string, any[]>>({});

  const handleMessage = (msg: any) => {
    console.log('Received message:', msg);
    setMessages((prevMessages = {}) => {
      console.log('Previous messages state:', prevMessages);
      const userMessages = prevMessages[msg.to] || [];
      const updatedMessages = { ...prevMessages, [msg.to]: [...userMessages, msg] };
      console.log('Updated messages state:', updatedMessages);
      return updatedMessages;
    });
  };

  useEffect(() => {
    socket.on('receiveMessage', handleMessage);
    return () => {
      socket.off('receiveMessage', handleMessage);
    };
  }, []);

  console.log('Messages:', messages);
  console.log('Selected User:', selectedUser);

  return (
    <div className="h-[calc(100vh-10rem)] bg-blue-200 p-4 overflow-y-auto">
      {selectedUser && messages[selectedUser.id] && messages[selectedUser.id].map((msg, index) => (
        <div key={index} className={`mb-4 flex ${msg.from === selectedUser.id ? 'justify-start' : 'justify-end'}`}>
          <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.from === selectedUser.id ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}>
            {msg.content}
            <span className="block text-xs text-gray-500 mt-1">
              {/* Format timestamp if needed */}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChattingSection;




//ajj kaal khyal mere udd re hawa me,
//chode haath dalne mne chlde bila me,
//kime aya thi nhi or kime saath nhi je jana,
//teri bnn ja hawa tu kde baith desiya me,


//jika hove bda dil log app hi bulale,
//chod sare fdu kam dhyan khud pe lagle,
// tu jo bnn rhya pupt teri 3-4 cheli ,
// dek ake mhra hood bne sabad pheli  


//vo jo yrr mera mne sara de rhya sahara,
//drr lage        ja mrrr kde uki btt me kuwara,
//baki sochi bhi thi     k kde ke ma geet gaunga,
//soch ke aai khill , ydd se vo phul hazara