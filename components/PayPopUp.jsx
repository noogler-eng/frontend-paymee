import { useState } from "react";
import { clsx } from "clsx";
import Avtaar from "./Avtaar";
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms/user_atom";
import axios from "axios";

export default function PayPopUp({isOpen, setIsOpen, recepient}){

    const [amount, setAmount] = useState(0);
    const user = useRecoilValue(userAtom);


    function handelPay(){
        axios
        .post("https://backend-paymee.onrender.com/api/app/transfer", {
            from: user.user_id,
            to: recepient._id,
            amount: amount
        }, {
          headers: {
            authorization: "bearer " + localStorage.getItem("token"),
          },
        })
        .then((data) => {
          console.log(data);
          setIsOpen(!isOpen);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return <div className={clsx(
        isOpen ? "block w-full flex flex-col gap-4": "hidden")}>
        <div className="w-full text-end">
            <span onClick={()=>setIsOpen(!isOpen)} className="">x</span>
        </div>
        <div className="flex flex-col justify-center items-center justify-between gap-2">
            <div className="flex gap-1 items-center justify-center"> 
                <Avtaar firstName={user.firstname} lastName={user.lastname}/> <span>{"->"}</span> <Avtaar firstName={recepient.firstname} lastName={recepient.lastname}/>
            </div>
            <p className="text-sm">payment to: {recepient.email}</p>
            <div className="flex items-center gap-1">
                <input type="text" value={amount} onChange={(e)=>{
                    setAmount(e.target.value);
                }} className="rounded-lg mx-auto max-w-fit border px-5 py-2 text-sm font-medium shadow-sm transition-all hover:ring-4 hover:ring-gray-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:ring-0 disabled:border-gray-200 border-gray-200 bg-white hover:border-gray-400 hover:text-gray-800 text-gray-500" placeholder="Rs"/>   
            </div>
            <button onClick={handelPay} className="rounded-full mx-auto max-w-fit border px-5 py-2 text-sm font-medium shadow-sm transition-all hover:ring-4 hover:ring-gray-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:ring-0 disabled:border-gray-200 border-black bg-black text-white hover:bg-gray-800">pay secure</button>
        </div>
    </div>

}