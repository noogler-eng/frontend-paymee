import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms/user_atom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import LinkTag from "../components/LinkTag";

export default function Dashboard() {
  const user = useRecoilValue(userAtom);
  const [balance, setBalance] = useState(0);
  const [sendTransaction, setSendTransaction] = useState([]);
  const [recTransaction, setRecTransaction] = useState([]);

  function handelBalance() {
    axios
      .get("https://backend-paymee.onrender.com/api/app/balance", {
        headers: {
          authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBalance(res.data.balance);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handelTransactions() {
    axios
      .get("https://backend-paymee.onrender.com/api/app/transactions", {
        headers: {
          authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setSendTransaction(res.data.send_transactions);
        setRecTransaction(res.data.rec_transactions);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getValue(transactions) {
    let value = 0;
    transactions.forEach((transaction) => {
      value += transaction.amount;
    });
    return format.format(value);
  }

  useEffect(() => {
    handelBalance();
    handelTransactions();
  }, []);

  let format = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });

  return (
    <div>
      <Navbar/>
      <div className="flex flex-col">
        <div className="mt-2 px-4 py-2">
         <LinkTag current={"Dashboard"}/>
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
              <span className="text-border text-shadow-black text-gray-200">
                {user?.firstname}
              </span>
            </span>
            <script>self.__wrap_n!=1&&self.__wrap_b(":r6:",1)</script>
          </h1>
        </div>
        <div className="flex justify-center mt-10">
          <div className="relative list-none break-inside-avoid rounded-3xl border border-gray-300 backdrop-blur-lg row-span-2 bg-gradient-to-tr from-transparent via-transparent to-[rgb(255,97,97,0.25)] bg-black w-4/6 p-8">
            <div className="relative text-orange-100 font-extrabold text-3xl">
              Balance - Rs. {format.format(balance)}
            </div>
            <h1 className="bg-gradient-to-r from-white via-purple-600 to-white bg-clip-text text-transparent text-8xl font-semibold m-4 self-left text-right">
              paymee card
            </h1>
            <div className="text-gray-200">userid - {user?.user_id}</div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex flex-col space-y-0.5 invert">
                <div className="font-semibold text-gray-800">
                  username - {user?.firstname} {user?.lastname}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <div class="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20 grid gap-y-4 divide-x divide-gray-200 md:grid-cols-3 md:gap-y-0">
            <div class="flex flex-col items-center justify-center space-y-2">
              <p class="text-2xl font-bold md:text-2xl">
                {sendTransaction.length + recTransaction.length}
              </p>
              <p class="font-semibold uppercase text-gray-500 md:text-sm">
                Total Transactions
              </p>
            </div>
            <div class="flex flex-col items-center justify-center space-y-2">
              <p class="text-2xl font-bold md:text-2xl">
                Rs. {getValue(recTransaction)}
              </p>
              <p class="font-semibold uppercase text-gray-500 md:text-sm">
                Amount Received
              </p>
            </div>
            <div class="flex flex-col items-center justify-center space-y-2">
              <p class="text-2xl font-bold md:text-2xl">
                Rs. {getValue(sendTransaction)}
              </p>
              <p class="font-semibold uppercase text-gray-500 md:text-sm">
                Amount Sent
              </p>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <h2 className="text-center bg-gradient-to-r from-black to-black bg-clip-text text-transparent text-2xl font-extrabold">
            Sent TXN'S
          </h2>
          <div className="flex flex-col items-center my-4 gap-2">
            {sendTransaction.map((transaction) => {
              return (
                <div className="flex flex p-2 border-2 border-black border rounded-xl w-4/6 justify-between items-center px-4">
                  <div>
                    <div>From: {transaction.from_name}</div>
                    <div>sender_id: {transaction.from}</div>
                  </div>
                  <div>
                    <div>To: {transaction.to_name}</div>
                    <div>receiver_id: {transaction.to}</div>
                  </div>
                  <div>Amount: {format.format(transaction.amount)}</div>
                </div>
              );
            })}
          </div>
          <div className="my-16">
            <h2 className="text-center bg-gradient-to-r from-black to-black bg-clip-text text-transparent text-2xl font-extrabold">
              Rec TXN'S
            </h2>
            <div className="flex flex-col items-center my-4 gap-2">
              {recTransaction.map((transaction) => {
                return (
                  <div className="flex flex p-2 border-2 border-black border rounded-xl w-4/6 justify-between items-center px-4">
                    <div>
                      <div>From: {transaction.from_name}</div>
                      <div>sender_id: {transaction.from}</div>
                    </div>
                    <div>
                      <div>To: {transaction.to_name}</div>
                      <div>receiver_id: {transaction.to}</div>
                    </div>
                    <div>Amount: {format.format(transaction.amount)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
