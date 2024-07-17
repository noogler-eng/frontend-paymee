import PayPopUp from "./PayPopUp";
import { useEffect, useState } from "react";

export default function User({ user, current, setCurrent }) {
  
  const [isOpen, setIsOpen] = useState(false);
  
  async function handelPay(){
    setCurrent(user._id);
    setIsOpen(!isOpen);
  }

  useEffect(()=>{
    if(current != user._id){
      setIsOpen(false);
    }
  }, [current])
  
  
  return (
    <div className="flex items-center rounded-md border border-gray-200 bg-white p-3 shadow-lg w-2/6 flex justify-center gap-4"
      style={{ opacity: 1, transform: "none" }}>
      { !isOpen ? (<div className="flex items-center">
        <div className="mr-2 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-extrabold">
          {user.firstname.toString()[0].toUpperCase()}
          {user.lastname.toString()[0].toUpperCase()}
        </div>
        <div>
          <div className="mb-2.5 flex items-center space-x-2">
            <div className="p-1 px-4 rounded-md bg-gray-200 ">
              {user.firstname.toUpperCase() + " " + user.lastname.toUpperCase()}
            </div>
            <button className="p-1 px-4 rounded-md bg-gray-200" onClick={handelPay}>pay</button>
          </div>
          <div className="rounded-md bg-gray-200 p-1 px-4">{user._id}</div>
        </div></div>):  <PayPopUp isOpen={isOpen} setIsOpen={setIsOpen} recepient={user}/>}
    </div>
  );
}
