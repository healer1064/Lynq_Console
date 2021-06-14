// libraries
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";

// components
import Form from "../Form";
import Graphic from "../Graphic";

const index = () => {
  // states
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
    <div className={styles.forgot_password}>
      <Graphic />
      <div className={styles.form_wrap}>
        <Link href="/plans">
          <a className={styles.logo}>
            <img src="/img/lynq-logo.png" alt="" />
          </a>
        </Link>
        <Form
          onSubmit={handleSubmit}
          loading={loading}
          input={emailInput}
          setInput={setEmailInput}
        />
      </div>
    </div>
  );
};

export default index;
