import Signup from "./Signup";
import Signin from "./Signin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userAtom } from "../../store/atoms/user_atom";

export default function Main() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [user, setUser] = useRecoilState(userAtom);
  const navigate = useNavigate();

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
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex w-full bg-custom-bg repeat bg-no-repeat h-screen">
      <div className="w-1/2"></div>
      <div className="w-1/2 flex items-center justify-center">
        {isSignUp ? (
          <Signup setIsSignUp={setIsSignUp} isSignUp={isSignUp} />
        ) : (
          <Signin setIsSignUp={setIsSignUp} isSignUp={isSignUp} />
        )}
      </div>
    </div>
  );
}
