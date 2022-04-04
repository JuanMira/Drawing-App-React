import React, { FC, useEffect, useState } from "react";
import router from "next/router";
import { BsChevronDoubleRight } from "react-icons/bs";
import { useSocket } from "../../context/Socket.context";
import EVENTS from "../../config/events";
const RoomPreview: FC<{
  roomName: string;
  roomID: string;
}> = ({ roomName, roomID }) => {
  const { socket } = useSocket();
  const [usersInRoom, setUsersInRoom] = useState();
  useEffect(() => {
    socket.emit(EVENTS.client.preview_users, { roomID });
  }, []);

  socket
    .off(EVENTS.server.preview_all_users)
    .once(EVENTS.server.preview_all_users, (value) => {
      setUsersInRoom(value);
    });

  const handleEnterRoom = () => {
    router.push(`/room/${roomID}`);
  };

  return (
    <div className="p-4 bg-gray-700 w-full rounded  mt-5 flex justify-between">
      <span className="font-semibold text-2xl text-gray-200">{roomName}</span>
      <button
        onClick={handleEnterRoom}
        className="w-24 p-2 font-semibold text-gray-200 bg-gray-800 rounded shadow flex justify-between items-center hover:bg-gray-600 transition-colors"
      >
        Enter{" "}
        <span className="mx-2 ">
          <BsChevronDoubleRight />
        </span>
      </button>
    </div>
  );
};
export default RoomPreview;
