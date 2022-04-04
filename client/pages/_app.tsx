import SocketProvider from "../context/Socket.context";
import UserProvider from "../context/User.context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <SocketProvider>
        <Component {...pageProps} />
      </SocketProvider>
    </UserProvider>
  );
}

export default MyApp;
