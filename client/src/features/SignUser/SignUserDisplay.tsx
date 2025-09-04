import { useState } from "react";
import RegisterForm from "./RegisterForm/RegisterForm";
import LoginForm from "./LoginForm/LoginForm";
import SideByDescription from "./SideByDescription/SideByDescription";

export default function SignUserDisplay() {
  const [isLoginActive, setIsLoginActive] = useState(false);

  const toggleForm = () => {
    setIsLoginActive(!isLoginActive);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="relative flex h-200 w-full max-w-4xl flex-col items-center justify-center gap-15 overflow-hidden rounded-lg md:h-140 md:shadow-lg">
        <SideByDescription
          isLoginActive={isLoginActive}
          toggleForm={toggleForm}
        />
        <RegisterForm isLoginActive={isLoginActive} />
        <LoginForm isLoginActive={isLoginActive} />
      </div>
    </div>
  );
}
