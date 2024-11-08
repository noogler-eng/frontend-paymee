import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Main from "./pages/Main";
import Transaction from "./pages/Transaction";
import Transfer from "./pages/Transfer";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user_atom";
import { useEffect } from "react";
import axios from "axios";

export default function App() {
  const [user, setUser] = useRecoilState(userAtom);

  // setting up the user to recoil
  // recoil is subsitute of api-context
  // token = bearer + jsonwebtoken
  useEffect(() => {
    axios
      .get("https://backend-paymee.onrender.com/api/app/get-user", {
        headers: {
          authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((data) => {
        setUser({
          firstname: data.data.msg.firstname,
          lastname: data.data.msg.lastname,
          imageUrl: data.data.msg.imageUrl,
          email: data.data.msg.email,
          userId: data.data.msg._id,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/dashboard/transfer"} element={<Transfer />} />
        <Route path={"/dashboard/transactions"} element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  );
}
