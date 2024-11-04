import Signup from "./Signup";
import Signin from "./Signin";
import { useState } from "react";

export default function Main() {
  const [isSignUp, setIsSignUp] = useState(true);

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
