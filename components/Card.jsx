import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms/user_atom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export default function UserCard() {
  const [isFollowed, setIsFollowed] = React.useState(false);
  const [balance, setBalance] = useState(0);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  // function to get the balance of current user
  function handelBalance() {
    if (!user?.userId) return;

    axios
      .get(
        "https://backend-paymee.onrender.com/api/app/balance",
        {
          userId: user?.userId,
        },
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setBalance(res.data.balance);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    handelBalance();
  }, []);

  return (
    <Card className="w-2/6">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={user?.imageUrl} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {user?.name}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {user?.email}
            </h5>
          </div>
        </div>
        <Button
          className={
            isFollowed
              ? "bg-transparent text-foreground border-default-200"
              : ""
          }
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => navigate("/dashboard/transfer")}
        >
          pay now
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>Balance: {balance}</p>
        <p>userId: {user.userId}</p>
        <span className="pt-2">
          #PayWithPayee
          <span className="py-2" aria-label="computer" role="img">
            💵
          </span>
        </span>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className=" text-default-400 text-small">payee</p>
        </div>
        <div className="flex gap-1">
          <p className="text-default-400 text-small">mastercard</p>
        </div>
      </CardFooter>
    </Card>
  );
}
