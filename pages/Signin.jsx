import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signin({setIsSignUp, isSignUp}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handelSignIn() {
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }

    axios
      .post("https://backend-paymee.onrender.com/api/auth/sign-in", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard")
      })
      .catch((err) => {
        console.log(err);
      });

    setEmail("");
    setPassword("");
  }

  return (
    <div className="h-screen w-full flex justify-center items-center flex flex-col gap-4">
      <h1 className="bg-gradient-to-r from-black to-white bg-clip-text text-transparent text-5xl font-extrabold ">sign-in</h1>
      <div className="flex flex-col justify-center items-center gap-4">
        <input
          type="text"
          value={email}
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="rounded-lg p-1 px-4 border-2"
        />
        <input
          type="text"
          value={password}
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="rounded-lg p-1 px-4 border-2"
        />
        <button
          onClick={handelSignIn}
          className="rounded-full mx-auto max-w-fit border px-5 py-2 text-sm font-medium shadow-sm transition-all hover:ring-4 hover:ring-gray-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:ring-0 disabled:border-gray-200 border-black bg-black text-white hover:bg-gray-800"
        >
          sign-in
        </button>
        <p>
        if you don't have account?{" "}
        <button
          className="rounded-full mx-auto max-w-fit border px-5 py-2 text-sm font-medium shadow-sm transition-all hover:ring-4 hover:ring-gray-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:ring-0 disabled:border-gray-200 border-gray-200 bg-white hover:border-gray-400 hover:text-gray-800 text-gray-500"
          onClick={()=>setIsSignUp(!isSignUp)}
        >
          sign-in
        </button>
      </p>
      </div>
    </div>
  );
}
