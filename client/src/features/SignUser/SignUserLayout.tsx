import { useState } from "react";
import RegisterForm from "./RegisterForm/RegisterForm";
import LoginForm from "./LoginForm/LoginForm";
import SideByDescription from "./SideByDescription/SideByDescription";

export default function SignUserLayout() {
  const [isLoginActive, setIsLoginActive] = useState(false);

  const toggleForm = () => {
    setIsLoginActive(!isLoginActive);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="relative h-150 w-full max-w-4xl overflow-hidden rounded-lg shadow-lg md:h-140">
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
