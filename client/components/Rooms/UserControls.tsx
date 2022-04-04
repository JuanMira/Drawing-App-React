import React, { FC } from "react";
import { useUser } from "../../context/User.context";
import { AiOutlineLogout } from "react-icons/ai";
const UserControls: FC<{}> = () => {
  const { username } = useUser();
  return (
    <div className="p-2 flex justify-between">
      <span className="font-bold text-gray-300 text-2xl">{username}</span>
      <button className="text-gray-300 text-2xl p-2 rounded-full bg-red-700 hover:bg-red-500 transition-colors">
        <AiOutlineLogout />
      </button>
    </div>
  );
};
export default UserControls;
