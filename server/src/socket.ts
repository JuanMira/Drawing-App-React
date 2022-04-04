import { Server, Socket } from "socket.io";
import { nanoid } from "nanoid";

const EVENTS = {
  connection: "connection",
  disconnect: "disconnect",
  client: {
    create_room: "create_room",
    join_room: "join_room",
    preview_users: "preview_users",
  },
  server: {
    rooms: "rooms",
    joined_room: "joined_room",
    users_in_room: "users_in_room",
    preview_all_users: "preview_all_users",
  },
};

const rooms: Record<string, { name: string }> = {};
const usersInRoom: Record<string, string[]> = {};
const users: string[] = [];

function socket({ io }: { io: Server }) {
  console.log("Socket enabled");
  io.on(EVENTS.connection, (socket: Socket) => {
    console.log(`User connected ${socket.id}`);
    socket.emit(EVENTS.server.rooms, rooms);

    socket.once(EVENTS.client.create_room, ({ roomName }) => {
      const roomID = nanoid();
      rooms[roomID] = {
        name: roomName,
      };
      socket.join(roomID);
      socket.broadcast.emit(EVENTS.server.rooms, rooms);
      socket.emit(EVENTS.server.rooms, rooms);
      socket.emit(EVENTS.server.joined_room, roomID);
    });

    socket.once(EVENTS.client.preview_users, ({ roomID }) => {
      socket.emit(EVENTS.server.preview_all_users, users[roomID]);
    });

    socket.once(EVENTS.client.join_room, ({ roomID, username }) => {
      socket.join(roomID);
      if (!users.includes(username)) users.push(username);
      usersInRoom[roomID] = users;
      socket.emit(EVENTS.server.joined_room, roomID);
      socket.emit(EVENTS.server.users_in_room, usersInRoom);
    });

    socket.once(EVENTS.disconnect, (socket: Socket) => {
      console.log(`User diconnected ${socket.id}`);
    });
  });
}

export default socket;
