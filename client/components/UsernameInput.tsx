import React, { FC } from "react";
import { useUser } from "../context/User.context";

const UsernameInputComponent: FC<{}> = () => {
  const { setUserConnected, setUsername, username } = useUser();
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="p-2 bg-gray-800 rounded shadow">
        <div className="flex justify-center p-2">
          <h1 className="text-gray-400 font-semibold text-xl">
            input your username
          </h1>
        </div>
        <div className="p-2 space-x-4">
          <input
            type="text"
            className="bg-gray-500 rounded p-1 text-gray-200 font-semibold focus:outline-none focus:border-gray-500 focus:bg-gray-700"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="p-2 bg-gray-900 rounded text-gray-200 font-semibold cursor-pointer hover:bg-gray-700 transition-colors"
            onClick={() => setUserConnected()}
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsernameInputComponent;
