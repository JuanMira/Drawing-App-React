import { createContext, useContext, useEffect, useState } from "react";

interface IContext {
  username: string;
  setUsername: Function;
  setUserConnected: Function;
  logged: boolean;
}

const UserContext = createContext<IContext>({
  username: "",
  setUsername: () => false,
  setUserConnected: () => false,
  logged: false,
});

function UserProvider(props: any) {
  const [username, setUsername] = useState<string>("");
  const [logged, setLogged] = useState<boolean>(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setLogged(true);
      setUserConnected();
    } else {
      setLogged(false);
    }
  }, []);

  const setUserConnected = () => {
    const userInLocalStorage = localStorage.getItem("username");
    if (!userInLocalStorage) {
      localStorage.setItem("username", username);
    }
    setUsername(localStorage.getItem("username"));
    setLogged(true);
  };

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        setUserConnected,
        logged,
      }}
      {...props}
    />
  );
}

export const useUser = () => useContext(UserContext);

export default UserProvider;
