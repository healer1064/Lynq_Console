// libraries
import { useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import LoginForm from "../../components/Login/LoginForm";
import SignupLeftbar from "../../components/Signup/SignupLeftbar";

// context
import ProfileContext from "../../context/profile";

const index = () => {
  const { setToken } = useContext(ProfileContext);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSignIn = ({ email, password }) => {
    setLoading(true);

    async function signInReq() {
      const _data = { email: email, password: password };

      const response = await fetch(`https://api.lynq.app/account/signin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_data),
      });

      return await response.json();
    }

    signInReq().then((res) => {
      console.log("res", res);
      setLoading(false);
      if (res?.message === undefined) {
        setToken(res.token);
        router.push("/");
      } else {
        toast.error(res.message);
      }
    });
  };

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
      <ToastContainer />
      <div className="signup">
        <SignupLeftbar />
        <div className="signup-form">
          <Link href="/plans">
            <a className="signup-form__logo">
              <img src="/img/lynq-logo.png" alt="" />
            </a>
          </Link>
          <LoginForm
            setShowPassword={setShowPassword}
            showPassword={showPassword}
            signIn={onSignIn}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default index;
