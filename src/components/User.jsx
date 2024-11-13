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
      className="flex items-center rounded-md border border-gray-200 bg-white p-3 shadow-lg w-full flex justify-center gap-4 shadow-xl shadow-gray-500/100"
      style={{ opacity: 1, transform: "none" }}
    >
      <div className="w-4/6 flex items-center justify-center gap-5">
        {!isOpen ? (
          <div className="flex justify-center gap-5 items-center">
            <Avatar isBordered color="default" src={user?.imageUrl} />
            <div className="flex flex-col gap-1">
              <p className="text-gray-500 text-2xl">
                {user.firstname} {user.lastname}
              </p>
              <div className="rounded-md bg-gray-200 p-1 px-4">{user._id}</div>
            </div>
            <Button
              onClick={() => handelPay()}
              className="font-semibold flex items-center gap-2"
            >
              <BadgeJapaneseYen size={15} />{" "}
              <p className="font-semibold">pay now</p>
            </Button>
          </div>
        ) : (
          <PayPopUp isOpen={isOpen} setIsOpen={setIsOpen} recepient={user} />
        )}
      </div>
    </div>
  );
}
