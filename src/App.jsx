import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Dashboard from "../pages/Dashboard";
import Main from "../pages/Main";
import Transaction from "../pages/Transaction";
import Transfer from "../pages/Transfer";
import Navbar from "../components/Navbar";
import { useRecoilState } from "recoil"
import { userAtom } from "../store/atoms/user_atom";
import axios from "axios";
import { useEffect } from "react";

export default function App() {

  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    axios
      .get("https://backend-paymee.onrender.com/api/app/get-user", {
        headers: {
          authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((data) => {
        console.log(data);
        setUser({
          firstname: data.data.msg.firstname,
          lastname: data.data.msg.lastname,
          email: data.data.msg.email,
          user_id: data.data.msg._id,
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/sign-in"} element={<Signin />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/dashboard/transfer"} element={<Transfer />} />
        <Route path={"/dashboard/transactions"} element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  );
}
