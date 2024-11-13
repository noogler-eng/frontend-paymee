import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LinkTag from "../components/LinkTag";
import UserCard from "../components/Card";
import Transactions from "../components/Transactions";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../../store/atoms/user_atom";
import { Button } from "@nextui-org/react";
import axios from "axios";

const gradients = [
  "bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100",
  "bg-gradient-to-r from-green-100 via-yellow-100 to-orange-100",
  "bg-gradient-to-r from-indigo-100 via-blue-100 to-teal-100",
  "bg-gradient-to-r from-red-100 via-pink-100 to-purple-100",
  "bg-gradient-to-r from-yellow-100 via-green-100 to-blue-100",
];

export default function Dashboard() {
  const [gradient, setGradient] = useState(gradients[0]);
  const [loading, setLoading] = useState(false);
  const user = useRecoilValue(userAtom);
  const [balance, setBalance] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  function handleBalance() {
    axios
      .get(`${import.meta.env.VITE_BACKEND_SERVER}/api/app/balance`, {
        params: {
          userId: user?.userId, // Pass userId as a query parameter
        },
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBalance(res.data.balance);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const changeGradient = () => {
    const randomGradient =
      gradients[Math.floor(Math.random() * gradients.length)];
    setGradient(randomGradient);
  };

  useEffect(() => {
    handleBalance();
    const interval = setInterval(() => {
      changeGradient();
    }, 5 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handelAirdrop = async () => {
    setLoading(true);
    try {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_SERVER}/api/app/airdrop`,
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
          handleBalance();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className={`${gradient}`}>
      <Navbar />
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-center p-2">
          <div>
            This is{" "}
            <span className="text-red-600 font-extrabold underline">
              <i>Beta</i>
            </span>{" "}
            version of application Paymee,{" "}
            <Button
              variant="flat"
              color="primary"
              className="font-extrabold text-sm"
              onClick={handelAirdrop}
              isLoading={loading}
            >
              Airdrop
            </Button>{" "}
            Available for sometime only
          </div>
        </div>
        <div className="p-4 w-full">
          <h1 className="font-cal leading-[100%] md:!leading-xl text-[40px] tracking-[-0.002em] md:text-[75px] lg:text-[79px] xl:text-[70px] text-shadow-gray !xl:text-[clamp(52px,_7.8vw,_82px)] max-w-full !text-[clamp(52px,_7.45vw,_82px)] lg:max-w-lg">
            <span
              data-br=":r6:"
              data-brr="1"
              style={{
                display: "inline-block",
                verticalAlign: top,
                textDecoration: "inherit",
                textWrap: "balance",
              }}
            >
              Welcome
              <br />
              glad you are here{" "}
              <span className="text-border text-shadow-black text-gray-200 bg-black rounded-full text-center px-5 text-7xl">
                {user?.firstname}
              </span>
            </span>
            <script>self.__wrap_n!=1&&self.__wrap_b(":r6:",1)</script>
          </h1>
          <div className="mt-2 py-2">
            <LinkTag current={"Dashboard"} />
          </div>
        </div>
        <div className="w-full flex items-center justify-center w-full">
          <UserCard balance={balance}/>
        </div>
        <div className="w-full flex items-center justify-center">
          <Transactions />
        </div>
        <div className="w-full flex flex-col items-center justify-center my-10">
          <h2 className="text-2xl w-5/6 font-bold text-start">Policies</h2>
          <p className="w-5/6 text-start">
            User data is handled with strict confidentiality in compliance with
            data protection regulations like GDPR or CCPA. Only essential
            information is collected, stored securely, and shared solely with
            trusted partners, such as payment processors, to facilitate
            transactions. Users have control over their data settings, including
            viewing, exporting, or deleting their personal information.
          </p>
          <p className="w-5/6 text-start">
            The app employs advanced fraud detection algorithms to identify and
            block suspicious transactions in real time. Users are encouraged to
            report any fraudulent or unauthorized activities immediately. Any
            funds involved in confirmed fraudulent transactions may be frozen
            while an investigation is conducted, with support staff available
            for user inquiries throughout the process.
          </p>
        </div>
      </div>
    </div>
  );
}
