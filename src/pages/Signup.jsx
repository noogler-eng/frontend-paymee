import { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function Signup({ setIsSignUp, isSignUp }) {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");

  const notify = () => toast("Here is your toast.");

  // uploading the image to cloudinary and getting back the image url
  const handelSignUp = async (e) => {
    e.preventDefault();
    if (!firstname || !lastname || !email || !password || !file) {
      notify("please fill the fileds");
      throw new Error("please fill the fileds");
    }

    let imageUrl = "";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "payment");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_CLOUD}`,
        formData
      );
      imageUrl = await response.data.secure_url;

      axios
        .post(`${import.meta.env.VITE_BACKEND_SERVER}/api/auth/sign-up`, {
          firstname: firstname,
          lastname: lastname,
          imageUrl: imageUrl,
          email: email,
          password: password,
        })
        .then((res) => {
          setIsSignUp(!isSignUp);
        })
        .catch((err) => {
          console.log(err);
        });

      notify("successfully onboarded!");
      setIsSignUp(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col gap-4 justify-center items-center">
      <h2 className="font-display text-2xl font-extrabold leading-tight text-black sm:text-5xl sm:leading-tight text-center">
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

      <form
        className="flex flex-col gap-2 w-3/6 items-center justify-center"
        onSubmit={handelSignUp}
      >
        <div className="flex gap-2">
          <Input
            type="text"
            variant="flat"
            label="FirstName"
            className="w-full"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstname}
          />
          <Input
            type="text"
            variant="flat"
            label="LastName"
            className="w-full"
            onChange={(e) => setLastName(e.target.value)}
            value={lastname}
          />
        </div>
        <Input
          type="email"
          variant={"flat"}
          label="Email"
          className="w-full"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="file"
          variant={"flat"}
          placeholder="image"
          className="w-full"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Input
          type="password"
          variant={"flat"}
          label="Password"
          className="w-full"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button color="default" className="w-full" type="submit">
          sign-up
        </Button>
      </form>
      <p>
        if you already have account?{" "}
        <button
          className="rounded-full mx-auto max-w-fit border px-5 py-2 text-sm font-medium shadow-sm transition-all hover:ring-4 hover:ring-gray-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:ring-0 disabled:border-gray-200 border-gray-200 bg-white hover:border-gray-400 hover:text-gray-800 text-gray-500"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          sign-in
        </button>
        <Toaster />
      </p>
      <p className="text-red-600"><i>Length of password must be 6 letters</i></p>
    </div>
  );
}
