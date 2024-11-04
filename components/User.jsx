import PayPopUp from "./PayPopUp";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { BadgeJapaneseYen } from "lucide-react";
import { Avatar } from "@nextui-org/react";

export default function User({ user, current, setCurrent }) {
  const [isOpen, setIsOpen] = useState(false);

  async function handelPay() {
    setCurrent(user._id);
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (current != user._id) {
      setIsOpen(false);
    }
  }, [current]);

  return (
    <div
      className="flex items-center rounded-md border border-gray-200 bg-white p-3 shadow-lg w-2/6 flex justify-center gap-4"
      style={{ opacity: 1, transform: "none" }}
    >
      {!isOpen ? (
        <div className="flex items-center gap-5">
          <Avatar isBordered color="default" src={user?.imageUrl} />
          <div>
            <div className="mb-2.5 flex items-center space-x-2">
              <p className="text-gray-500 text-2xl">{user.firstname} {user.lastname}</p>
            </div>
            <div className="rounded-md bg-gray-200 p-1 px-4">{user._id}</div>
          </div>
        </div>
      ) : (
        <PayPopUp isOpen={isOpen} setIsOpen={setIsOpen} recepient={user} />
      )}
    </div>
  );
}
