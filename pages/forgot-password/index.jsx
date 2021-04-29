// libraries
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import ForgotPasswordForm from "../../components/ForgotPassword/ForgotPasswordForm";
import SignupLeftbar from "../../components/Signup/SignupLeftbar";

const index = () => {
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailInput === "") {
      toast.error("Please fill email field!");
    } else {
      setLoading(true);
      forgotPassword();
    }
  };

  const forgotPassword = () => {
    async function forgot() {
      const response = await fetch(
        `https://api.lynq.app/account/reset-password?email=${emailInput}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return await response;
    }

    forgot().then((res) => {
      console.log(res);
      setLoading(false);
      if (res.status == 200) {
        toast.success("Reset link is sent to your email!");
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <>
      <Head>
        <title>Forgot Password</title>
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
          <ForgotPasswordForm
            onSubmit={handleSubmit}
            loading={loading}
            input={emailInput}
            setInput={setEmailInput}
          />
        </div>
      </div>
    </>
  );
};

export default index;
