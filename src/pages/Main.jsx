import Signup from "./Signup";
import Signin from "./Signin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userAtom } from "../../store/atoms/user_atom";
import Minibar from "../components/Minibar";

export default function Main() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [user, setUser] = useRecoilState(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_SERVER}/api/app/get-user`, {
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
          balance: 0
        });
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex w-full h-max-screen">
      <div className="w-1/2 bg-[url('signup.jpg')] bg-no-repeat bg-clip-content bg-origin-content bg-center bg-cover overflow-hidden min-h-screen"></div>
      <div className="w-1/2 flex flex-col min-h-screen">
        <Minibar />
        <div className="flex-grow items-center justify-center">
          {isSignUp ? (
            <Signup setIsSignUp={setIsSignUp} isSignUp={isSignUp} />
          ) : (
            <Signin setIsSignUp={setIsSignUp} isSignUp={isSignUp} />
          )}
        </div>
      </div>
    </div>
  );
}
