import { useState } from "react";
import RegisterForm from "./RegisterForm/RegisterForm";
import LoginForm from "./LoginForm/LoginForm";
import SideByDescription from "./SideByDescription/SideByDescription";

export default function SignUserDisplay() {
  const [isLoginActive, setIsLoginActive] = useState(false);

  const toggleForm = () => {
    setIsLoginActive(!isLoginActive);
  };

  // relative kada se obrise radi md:h-auto, zbog cega relative pravi problem?

  // Zasto se nista ne prikazuje kada se obrise fix-an height, zar onda div ne bih trebao da zauzima visinu na osnovu content-a?
  // - Da treba da zauzima visinu na osnovu content-a ali na elementu imam aktivan position: relative i elemente unutra oznaceni sa position: absolute, cim je element obelezen sa position: absolute onda nece doprisnositi visini to jest parent ga nece registrovati, zato div nema svoju visinu i tek se vidi kada se doda fiksa sa height: 400px;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="relative flex w-full max-w-4xl flex-col items-center justify-center gap-15 overflow-hidden rounded-lg md:h-160 md:shadow-lg">
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
