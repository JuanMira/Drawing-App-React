import { createContext, useContext, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";
import EVENTS from "../config/events";

interface IContext {
  socket: Socket;
  roomID?: string;
  rooms: object;
  usersInRoom: string[];
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<IContext>({
  rooms: {},
  socket,
  usersInRoom: [],
});

export default function SocketProvider(props: any) {
  const [rooms, setRooms] = useState({});
  const [usersInRoom, setUsersInRoom] = useState<string[]>([]);

  socket.off(EVENTS.server.rooms).once(EVENTS.server.rooms, (value) => {
    setRooms(value);
    socket.removeListener(EVENTS.server.rooms);
  });

  socket
    .off(EVENTS.server.users_in_room)
    .once(EVENTS.server.users_in_room, (value) => {
      setUsersInRoom(value);
      socket.removeListener(EVENTS.server.users_in_room);
    });

  return (
    <SocketContext.Provider
      value={{
        socket,
        rooms,
        usersInRoom,
      }}
      {...props}
    />
  );
}

export const useSocket = () => useContext(SocketContext);
