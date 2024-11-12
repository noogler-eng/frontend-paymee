import { useRecoilValue } from "recoil";
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
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const changeGradient = () => {
    const randomGradient =
      gradients[Math.floor(Math.random() * gradients.length)];
    setGradient(randomGradient);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeGradient();
    }, 5 * 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // handels the airdrop in this case in beta version
  const handelAirdrop = async () => {
    setLoading(true);
    try {
      axios
        .post(
          "https://backend-paymee.onrender.com/api/app/airdrop",
          {
            userId: user?.userId,
          },
          {
            headers: {
              authorization: "bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {})
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
        <div className="p-4">
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
          <UserCard />
        </div>
        <div className="w-full flex items-center justify-center">
          <Transactions />
        </div>
        <div className="w-full flex flex-col items-center justify-center mb-10">
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
