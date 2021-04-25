// libraries
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import ResetPasswordForm from "../../components/ResetPassword/ResetPasswordForm";
import SignupLeftbar from "../../components/Signup/SignupLeftbar";

const index = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // router
  const router = useRouter();

  const { code } = router.query;

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "" || confirmPassword === "") {
      toast.error("Please fill all fields!");
    } else {
      if (password !== confirmPassword) {
        toast.error("Passwords don't match!");
      } else {
        setLoading(true);
        resetPassword();
      }
    }
  };

  const resetPassword = () => {
    async function reset() {
      const response = await fetch(
        `https://api.lynq.app/account/reset-password/${code}?new_password=${password}`,
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

    reset().then((res) => {
      console.log(res);
      setLoading(false);
      if (res.status == 200) {
        toast.success("Password reset successfully");
        router.push("/login");
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <>
      <Head>
        <title>Reset Password</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="signup">
        <SignupLeftbar />
        <div className="signup-form">
          <Link href="/plans">
            <a className="signup-form__logo">
              <img src="/img/lynq-logo.png" alt="" />
            </a>
          </Link>
          <ResetPasswordForm
            setShowPassword={setShowPassword}
            showPassword={showPassword}
            onSubmit={handleSubmit}
            loading={loading}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />
        </div>
      </div>
    </>
  );
};

export default index;
