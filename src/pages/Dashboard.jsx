import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import LinkTag from "../components/LinkTag";
import UserCard from "../components/Card";
import Transactions from "../components/Transactions";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../../store/atoms/user_atom";

export default function Dashboard() {
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col w-full">
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
      </div>
    </div>
  );
}
