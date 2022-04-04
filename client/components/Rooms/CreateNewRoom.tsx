import React, { FC, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import EVENTS from "../../config/events";
import { useSocket } from "../../context/Socket.context";
const CreateNewRoom: FC<{}> = () => {
  const { socket } = useSocket();
  const [roomName, setRoomName] = useState<string>("");
  const handleCreateRoom = () => {
    if (!roomName.trim()) return;
    socket.emit(EVENTS.client.create_room, { roomName });
    setRoomName("");
  };

  return (
    <div className="p-2 rounded flex">
      <div className="p-2 flex justify-center items-center flex-col w-full">
        <h1 className="font-semibold text-gray-200 text-xl">Create new room</h1>
        <div className="flex space-x-4 mt-5">
          <input
            type="text"
            placeholder="Room name"
            className="bg-gray-500 rounded p-1 text-gray-200 font-semibold focus:outline-none focus:border-gray-500 focus:bg-gray-700"
            onChange={(e) => setRoomName(e.target.value)}
            value={roomName}
          />
          <button
            className="p-2 bg-gray-800 rounded text-gray-200 font-semibold cursor-pointer hover:bg-gray-700 transition-colors"
            onClick={handleCreateRoom}
          >
            <AiOutlinePlus />
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateNewRoom;
