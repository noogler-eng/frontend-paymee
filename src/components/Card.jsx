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
import { userAtom } from "../../store/atoms/user_atom";
import { useNavigate } from "react-router-dom";

export default function UserCard({ balance }) {
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  return (
    <Card className="w-2/6 shadow-xl shadow-gray-500/100">
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
          className="bg-transparent text-foreground border-default-200"
          color="primary"
          radius="full"
          size="sm"
          variant="bordered"
          onPress={() => navigate("/dashboard/transfer")}
        >
          pay now
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>Balance: {balance}</p>
        <p>userId: {user?.userId}</p>
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
