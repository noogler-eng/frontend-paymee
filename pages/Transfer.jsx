import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import LinkTag from "../../components/LinkTag";
import User from "../../components/User";

export default function Transfer() {
  const [users, serUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [current, setCurrent] = useState(null);


  function handelUsers() {
    axios
      .get("https://backend-paymee.onrender.com/api/app/get-users", {
        headers: {
          authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((data) => {
        serUsers(data.data.msg);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    handelUsers();
  }, []);


  const searched_users = search? users.filter((user) => {
    return (user.firstname + " " + user.lastname).includes(search);
  }): users;

  const arr = searched_users.map((user, index) => <User user={user} current={current} setCurrent={setCurrent} key={index}/>);

  return (
    <div className="flex flex-col items-center">
      <Navbar/>
      <LinkTag current={"Transfer"}/>
      <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.15] text-black sm:text-4xl sm:leading-[1.15] text-center">
        Transfer With No
        <br />
        <span className="bg-gradient-to-r from-purple-500 via-black-600 to-black bg-clip-text text-transparent text-6xl">
          Stuck and Safely
        </span>
      </h1>
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="search here..."
        className="text-black py-1 px-2 w-1/4 mt-8 rounded-lg border-2"
      />
      <div className="my-4 w-full flex justify-center flex-col items-center gap-1">
        {arr}
      </div>
    </div>
  );
}
