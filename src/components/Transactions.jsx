import { useState, useEffect } from "react";
import { MoveUpRight } from "lucide-react";
import { MoveDownLeft } from "lucide-react";
import axios from "axios";

export default function Transactions() {
  const [sendTransaction, setSendTransaction] = useState([]);
  const [recTransaction, setRecTransaction] = useState([]);

  // function to getting all my the transactions
  // it contains both postive and negative transaction
  function handelTransactions() {
    axios
      .get(`${import.meta.env.VITE_BACKEND_SERVER}/api/app/transactions`, {
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

  // getting the total amount of Incomming and outgoing from transaction
  function getValue(transactions) {
    let value = 0;
    transactions.forEach((transaction) => {
      value += transaction.amount;
    });
    return format.format(value);
  }

  let format = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });

  useEffect(() => {
    handelTransactions();
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-5 mt-16">
      <div className="w-1/2">
        <div class="w-full flex justify-between">
          <div class="flex flex-col items-center justify-center space-y-2">
            <p class="text-4xl font-bold">
              {sendTransaction.length + recTransaction.length}
            </p>
            <p class="font-semibold uppercase text-gray-500 md:text-sm">
              Total Transactions
            </p>
          </div>
          <div class="flex flex-col items-center justify-center space-y-2">
            <p class="text-4xl font-bold">{getValue(recTransaction)}</p>
            <p class="font-semibold uppercase text-gray-500 md:text-sm">
              Amount Received
            </p>
          </div>
          <div class="flex flex-col items-center justify-center space-y-2">
            <p class="text-4xl font-bold">{getValue(sendTransaction)}</p>
            <p class="font-semibold uppercase text-gray-500 md:text-sm">
              Amount Sent
            </p>
          </div>
        </div>
      </div>
      <div className="mt-16 w-full flex flex-col gap-8 items-center">
        <h2 className="text-center text-2xl font-semibold flex gap-2">
          Sent TXN'S <MoveUpRight size={30} className="font-extrabold" />
        </h2>
        <div className="flex flex-col items-center gap-2 max-h-96 overflow-y-scroll w-4/6 px-4">
          {sendTransaction.map((transaction, index) => {
            return (
              <div
                className="flex flex p-2 border-2 border-black border rounded-xl w-full justify-between items-center px-4"
                key={index}
              >
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
        <div className="w-full flex flex-col gap-8 items-center">
          <h2 className="text-center text-2xl font-semibold flex gap-2">
            Rec TXN'S <MoveDownLeft size={30} className="font-extrabold" />
          </h2>
          <div className="flex flex-col items-center my-4 gap-2 w-4/6 max-h-96 overflow-y-scroll px-4">
            {recTransaction.map((transaction, index) => {
              return (
                <div
                  className="flex flex p-2 border-2 border-black border rounded-xl w-full justify-between items-center px-4"
                  key={index}
                >
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
  );
}
