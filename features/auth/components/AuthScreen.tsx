"use client";

import { useState } from "react";
import { AuthFlow } from "../types";
import SignInCard from "./SignInCard";
import SignUpCard from "./SignUpCard";

const AuthScreen = () => {
  const [authFlow, setAuthFlow] = useState<AuthFlow>("signIn");
  return (
    <div className="h-full flex items-center justify-center bg-[#5C3B58]">
      <div className="md:h-auto md:w-[420px]">
        {authFlow === "signIn" ? (
          <SignInCard setAuthFlow={setAuthFlow} />
        ) : (
          <SignUpCard setAuthFlow={setAuthFlow} />
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
