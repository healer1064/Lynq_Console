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
  const [loading, setLoading] = useState(false);

  // handle submit
  const handleSubmit = () => {
    toast.success("Email Sent");
    setLoading(true);
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
          <ForgotPasswordForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </>
  );
};

export default index;
