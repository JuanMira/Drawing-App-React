import { useRouter } from "next/router";
import { useEffect } from "react";
import DrawingArea from "../../components/Draw/DrawingArea";
import EVENTS from "../../config/events";
import { useSocket } from "../../context/Socket.context";
import { useUser } from "../../context/User.context";
import dynamic from "next/dynamic";

const NoSSRComponent = dynamic(
  () => import("../../components/Draw/DrawingArea"),
  {
    ssr: false,
  }
);

export default function RoomByID() {
  const router = useRouter();
  const { socket, usersInRoom } = useSocket();
  const { username } = useUser();
  const { roomID } = router.query;

  const handleJoinRoom = () => {
    socket.emit(EVENTS.client.join_room, { roomID, username });
  };

  useEffect(() => {
    handleJoinRoom();
  }, []);

  return (
    <div className="bg-gray-900 h-screen w-screen flex justify-center items-center">
      <div className="w-5/6 h-5/6 rounded">
        <NoSSRComponent />
      </div>
    </div>
  );
}
