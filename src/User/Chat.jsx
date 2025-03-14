import React from "react";
import { PiChatTeardropTextFill } from "react-icons/pi";

const Chat = () => {
  return (
    <div>
      <div className="fixed bottom-5 right-5 p-3 rounded-tl-full rounded-bl-full rounded-br-full text-3xl text-white bg-[#1e82ab]">
        <PiChatTeardropTextFill />
      </div>
    </div>
  );
};

export default Chat;
