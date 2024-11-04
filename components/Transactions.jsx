import { useState, useEffect } from "react";
import axios from "axios";

export default function Transactions() {
  const [sendTransaction, setSendTransaction] = useState([]);
  const [recTransaction, setRecTransaction] = useState([]);

  // function to getting all my the transactions
  // it contains both postive and negative transaction
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
    <div>
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
  );
}
