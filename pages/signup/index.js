// libraries
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

// components
import SignupForm from "../../components/Signup/SignupForm";
import SignupLeftbar from "../../components/Signup/SignupLeftbar";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Signup</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="signup">
        <SignupLeftbar />
        <div className="signup-form">
          <a
            href="#"
            className="signup-form__logo"
            onClick={() => router.push("/")}
          >
            <img src="/img/linq-logo-big.svg" alt="" />
          </a>
          <SignupForm
            setShowPassword={setShowPassword}
            showPassword={showPassword}
            router={router}
          />
        </div>
      </div>
    </>
  );
}
