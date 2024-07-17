import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup({setIsSignUp, isSignUp}) {
  
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  function handelSignUp() {
    if (!firstname || !lastname || !email || !password) {
      alert("Please fill all the fields");
      return;
    }

    axios
      .post("https://backend-paymee.onrender.com/api/auth/sign-up", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        setIsSignUp(!isSignUp);
      })
      .catch((err) => {
        console.log(err);
      }
    );

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  }


  return (
    <div className="h-screen w-full flex flex-col gap-4 justify-center items-center">
      <h2 className="font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl sm:leading-tight">
        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {" Powerful "}
        </span>
        wallet and{" "}
        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {" modern "}
        </span>
        keep your balance safe
      </h2>

      <h1 className="bg-gradient-to-r from-black to-white bg-clip-text text-transparent text-5xl font-extrabold">
        sign-up
      </h1>

      <input
        type="text"
        value={firstname}
        placeholder="firstname"
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
        className="rounded-lg p-1 px-4 border-2"
      />
      <input
        type="text"
        value={lastname}
        placeholder="lastname"
        onChange={(e) => {
          setLastName(e.target.value);
        }}
        className="rounded-lg p-1 px-4 border-2"
      />
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
        onClick={handelSignUp}
        className="rounded-full mx-auto max-w-fit border px-5 py-2 text-sm font-medium shadow-sm transition-all hover:ring-4 hover:ring-gray-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:ring-0 disabled:border-gray-200 border-black bg-black text-white hover:bg-gray-800"
      >
        sign-up
      </button>
      <p>
        if you already have account?{" "}
        <button
          className="rounded-full mx-auto max-w-fit border px-5 py-2 text-sm font-medium shadow-sm transition-all hover:ring-4 hover:ring-gray-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:ring-0 disabled:border-gray-200 border-gray-200 bg-white hover:border-gray-400 hover:text-gray-800 text-gray-500"
          onClick={()=>setIsSignUp(!isSignUp)}
        >
          sign-in
        </button>
      </p>
    </div>
  );
}
