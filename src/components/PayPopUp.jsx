import { useState } from "react";
import { useRecoilValue } from "recoil";
import { Avatar, Button } from "@nextui-org/react";
import { userAtom } from "../../store/atoms/user_atom";
import toast from "react-hot-toast";
import { clsx } from "clsx";
import axios from "axios";

export default function PayPopUp({ isOpen, setIsOpen, recepient }) {
  const [amount, setAmount] = useState(0);
  const user = useRecoilValue(userAtom);

  function handelPay() {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_SERVER}/api/app/transfer`,
        {
          from: user.userId,
          to: recepient._id,
          amount: amount,
        },
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setIsOpen(!isOpen);
        toast.success(res.data.msg, {
          position: "top-center",
          duration: 4000,
          style: {
            backgroundColor: "#28a745",
            color: "#fff",
            fontWeight: "bold",
          },
        });
      })
      .catch((error) => {
        toast.error(error.response.data.msg, {
          position: "top-center",
          duration: 4000,
          style: {
            backgroundColor: "#dc3545",
            color: "#fff",
            fontWeight: "bold",
          },
        });
      });
  }

  return (
    <div
      className={clsx(isOpen ? "block w-full flex flex-col gap-4" : "hidden")}
    >
      <div className="w-full text-end">
        <span onClick={() => setIsOpen(!isOpen)} className="">
          x
        </span>
      </div>
      <div className="flex flex-col justify-center items-center justify-between gap-2">
        <div className="flex gap-5 items-center justify-center">
          <Avatar isBordered color="default" src={user?.imageUrl} />{" "}
          <span>{"->"}</span>{" "}
          <Avatar isBordered color="default" src={recepient?.imageUrl} />
        </div>
        <p className="text-sm">payment to: {recepient.email}</p>
        <div className="flex items-center gap-1">
          <input
            type="text"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            className="rounded-lg mx-auto max-w-fit border px-5 py-2 text-sm font-medium shadow-sm focus:outline-none text-center"
            placeholder="Rs"
          />
        </div>
        <Button onClick={handelPay}>Pay Secure</Button>
      </div>
    </div>
  );
}
