import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import axios from "axios";

export default function Signin({ setIsSignUp, isSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const notify = () => toast("Here is your toast.");
  const navigate = useNavigate();

  function handelSignIn(e) {
    e.preventDefault();
    if (!email || !password) {
      notify("Please fill all the fields");
      throw new Error("please fill all field");
    }

    axios
      .post("https://backend-paymee.onrender.com/api/auth/sign-in", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="w-full flex justify-center items-center flex-col gap-2 w-full">
      <h1 className="bg-gradient-to-r from-black to-white bg-clip-text text-transparent text-5xl font-extrabold ">
        sign-in
      </h1>
      <form className="flex flex-col justify-center items-center gap-2 w-1/2" onSubmit={handelSignIn}>
        <Input
          type="email"
          variant={"flat"}
          label="Email"
          className="w-full"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          type="password"
          variant={"flat"}
          label="Password"
          className="w-full"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button color="default" type="submit" className="w-full">
          sign-in
        </Button>
      </form>
      <p>
        if you don't have account?{" "}
        <button
          className="rounded-full mx-auto max-w-fit border px-5 py-2 text-sm font-medium shadow-sm transition-all hover:ring-4 hover:ring-gray-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:ring-0 disabled:border-gray-200 border-gray-200 bg-white hover:border-gray-400 hover:text-gray-800 text-gray-500"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          sign-up
        </button>
        <Toaster />
      </p>
    </div>
  );
}
