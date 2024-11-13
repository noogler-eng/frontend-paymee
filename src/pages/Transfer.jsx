import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import LinkTag from "../components/LinkTag";
import User from "../components/User";

const gradients = [
  "bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100",
  "bg-gradient-to-r from-green-100 via-yellow-100 to-orange-100",
  "bg-gradient-to-r from-indigo-100 via-blue-100 to-teal-100",
  "bg-gradient-to-r from-red-100 via-pink-100 to-purple-100",
  "bg-gradient-to-r from-yellow-100 via-green-100 to-blue-100",
];

export default function Transfer() {
  const [gradient, setGradient] = useState(gradients[0]);
  const [users, serUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [current, setCurrent] = useState(null);

  function handelUsers() {
    axios
      .get(`${import.meta.env.VITE_BACKEND_SERVER}/api/app/get-users`, {
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

  const changeGradient = () => {
    const randomGradient =
      gradients[Math.floor(Math.random() * gradients.length)];
    setGradient(randomGradient);
  };

  useEffect(() => {
    handelUsers();
    const interval = setInterval(() => {
      changeGradient();
    }, 5 * 1000);
    return () => clearInterval(interval);
  }, []);

  const searched_users = search
    ? users.filter((user) => {
        return (user.firstname + " " + user.lastname).includes(search);
      })
    : users;

  const accounts = searched_users.map((user, index) => (
    <User user={user} current={current} setCurrent={setCurrent} key={index} />
  ));

  return (
    <div
      className={`flex flex-col items-center w-full ${gradient} min-h-screen`}
    >
      <Navbar />
      <div className="mt-8 w-full flex flex-col items-center w-full">
        <LinkTag current={"Transfer"} />
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
          className="text-black py-1 px-2 mt-8 rounded-lg border text-center outline:focus-none w-1/2 shadow-xl shadow-gray-500/100"
        />
        <div className="my-4 flex justify-center flex-col items-center gap-1 w-1/2 overflow-y-scroll max-h-96">
          {accounts}
        </div>
      </div>
    </div>
  );
}
