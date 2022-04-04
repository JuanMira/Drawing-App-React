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

export default EVENTS;
