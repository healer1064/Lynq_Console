// libraries
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// components
import SignupForm from "../../components/Signup/SignupForm";
import SignupLeftbar from "../../components/Signup/SignupLeftbar";
import Terms from "../../components/Terms";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const toggle = () => setIsOpen(!isOpen);

  const onSignUp = (_data) => {
    console.log(_data);
    setLoading(true);

    async function signUpReq() {
      const response = await fetch("/api/account/signup", {
        headers: new Headers({
          data: JSON.stringify(_data),
        }),
      });

      return await response.json();
    }

    signUpReq()
      .then((res) => {
        console.log("res", res);
        localStorage.setItem("linqToken", res.token);
        setLoading(false);
        router.push("/home");
      })
      .catch((err) => {
        console.log("signup error", err);
        setLoading(false);
      });
  };

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
          <Link href="/">
            <a className="signup-form__logo">
              <img src="/img/lynq-logo.png" alt="" />
            </a>
          </Link>
          <SignupForm
            setShowPassword={setShowPassword}
            showPassword={showPassword}
            signUp={onSignUp}
            loading={loading}
            toggle={toggle}
          />
        </div>
        {isOpen && <Terms toggle={toggle} />}
      </div>
    </>
  );
}
