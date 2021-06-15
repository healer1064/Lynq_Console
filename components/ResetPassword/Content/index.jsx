// libraries
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";

// requests
import { postResetPassReq } from "@/utils/requests/reset-password";

// components
import Form from "../Form";
import Graphic from "../Graphic";

const index = () => {
  // states
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // router
  const router = useRouter();

  // params
  const { code } = router.query;

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "" || confirmPassword === "") {
      toast.info("Please fill all fields!");
    } else {
      if (password !== confirmPassword) {
        toast.info("Passwords don't match!");
      } else {
        setLoading(true);
        postResetPassReq(code, password)
          .then((res) => {
            setLoading(false);
            if (res.status == 200) {
              toast.success("Password reset successfully");
              router.push("/login");
            } else {
              toast.error(res.message);
            }
          })
          .catch(() => toast.error("Failed to reset password!"));
      }
    }
  };

  return (
    <div className={styles.reset_password}>
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
          onSubmit={handleSubmit}
          loading={loading}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
      </div>
    </div>
  );
};

export default index;
