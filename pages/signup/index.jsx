// libraries
import Head from "next/head";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import SignupForm from "../../components/Signup/SignupForm";
import SignupLeftbar from "../../components/Signup/SignupLeftbar";

// context
import ProfileContext from "../../context/profile";

export default function Signup() {
  const { setToken, setOnboarding } = useContext(ProfileContext);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSignUp = (_data) => {
    setLoading(true);

    async function signUpReq() {
      const response = await fetch(`https://api.lynq.app/account/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_data),
      });

      return await response.json();
    }

    signUpReq()
      .then((res) => {
        console.log("res", res);
        setLoading(false);
        if (res?.message === undefined) {
          setToken(res.token);
          setOnboarding(true);
          window.location.href = "/";
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => toast.error(err.message));
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
      <ToastContainer />
      <div className="signup">
        <SignupLeftbar />
        <div className="signup-form">
          <Link href="/plans">
            <a className="signup-form__logo">
              <img src="/img/lynq-logo.png" alt="" />
            </a>
          </Link>
          <SignupForm
            setShowPassword={setShowPassword}
            showPassword={showPassword}
            signUp={onSignUp}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
}
