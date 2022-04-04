import router from "next/router";
import { useEffect } from "react";
import UsernameInputComponent from "../components/UsernameInput";
import { useUser } from "../context/User.context";
import "../styles/Home.module.css";

export default function Home() {
  const { logged } = useUser();
  useEffect(() => {
    if (logged) {
      router.push("/rooms");
    }
  }, [logged]);
  return (
    <div className="bg-gray-900">
      <UsernameInputComponent />
    </div>
  );
}
