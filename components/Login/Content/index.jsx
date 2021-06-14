// libraries
import { useState, useContext } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";

// requests
import { postSigninReq } from "@/utils/requests/login";

// components
import Graphic from "../Graphic";
import Form from "../Form";

// context
import ProfileContext from "@/context/profile";

const index = () => {
  // context
  const { setToken } = useContext(ProfileContext);

  // states
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // handle sign-in
  const onSignIn = ({ email, password }) => {
    setLoading(true);
    postSigninReq({ email, password })
      .then((res) => {
        setLoading(false);
        if (res?.message === undefined) {
          setToken(res.token);
          window.location.href = "/";
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className={styles.login}>
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
          signIn={onSignIn}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default index;
