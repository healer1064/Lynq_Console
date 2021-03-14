// libraries
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

// components
import LoginForm from "../../components/Login/LoginForm";
import SignupLeftbar from "../../components/Signup/SignupLeftbar";

const index = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="signup">
        <SignupLeftbar />
        <div className="signup-form">
          <Link href="/">
            <a className="signup-form__logo">
              <img src="/img/lynq-logo.png" alt="" />
            </a>
          </Link>
          <LoginForm
            setShowPassword={setShowPassword}
            showPassword={showPassword}
            // signUp={onSignUp}
            // loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default index;
