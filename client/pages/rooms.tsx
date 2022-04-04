import { useEffect } from "react";
import router from "next/router";
import CreateNewRoom from "../components/Rooms/CreateNewRoom";
import UserControls from "../components/Rooms/UserControls";
import { useUser } from "../context/User.context";
import { useSocket } from "../context/Socket.context";
import RoomPreview from "../components/Rooms/RoomPreview";

export default function Rooms() {
  const { logged } = useUser();
  const { rooms } = useSocket();
  useEffect(() => {
    if (!logged) router.push("/");
  }, [logged]);

  return (
    <div className="bg-gray-900 w-screen h-screen p-4">
      <UserControls />
      <div className="bg-gray-600 mt-10 rounded p-2 h-5/6">
        <div className="w-1/2"></div>
        <CreateNewRoom />
        <div className="overflow-auto max-h-96">
          {Object.keys(rooms).map((key) => (
            <RoomPreview key={key} roomName={rooms[key].name} roomID={key} />
          ))}
        </div>
      </div>
    </div>
  );
}
