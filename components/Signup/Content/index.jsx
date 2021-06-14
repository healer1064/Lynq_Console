// libraries
import { useState, useContext } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// requests
import { postSignupReq } from "@/utils/requests/signup";

// components
import Graphic from "../Graphic";
import Form from "../Form";

const index = () => {
  // context
  const { setToken } = useContext(ProfileContext);

  // states
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // handle signup
  const onSignUp = (_data) => {
    setLoading(true);
    postSignupReq(_data)
      .then((res) => {
        setLoading(false);
        if (res?.message === undefined) {
          setToken(res.token);
          localStorage.getItem("lynqOnboarding") &&
            localStorage.removeItem("lynqOnboarding");
          window.location.href = "/";
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className={styles.signup}>
      <Graphic />
      <div className={styles.form_wrap}>
        <Link href="/plans">
          <a className={styles.logo}>
            <img src="/img/lynq-logo.png" alt="" />
          </a>
        </Link>
        <Form
          setShowPassword={setShowPassword}
          showPassword={showPassword}
          signUp={onSignUp}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default index;
