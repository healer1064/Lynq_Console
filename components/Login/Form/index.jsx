// libraries
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import Fade from "react-reveal/Fade";

// styles
import styles from "./styles.module.sass";

// components
import Loading from "@/components/common/Loading";

const Form = ({ setShowPassword, showPassword, signIn, loading }) => {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    if (validate()) {
      signIn({
        email: email,
        password: password,
      });
    }
  };

  const validate = () => {
    if (email !== "" && password !== "") {
      return true;
    } else {
      toast.info("Please fill all fields");
      return false;
    }
  };

  return (
    <Fade bottom duration={600}>
      <form className={styles.form} onSubmit={handleForm}>
        <h2>Login</h2>
        <p>To Access the panel Login with your credentials</p>
        <div className={styles.form_input}>
          <strong>Email</strong>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div className={styles.form_input}>
          {" "}
          <strong>Password</strong>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
          />
          <img
            style={{ bottom: "14px" }}
            src={showPassword ? "/img/show-password.svg" : "/img/pass-show.svg"}
            alt=""
            className={styles.show_password}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <button
          className={styles.btn}
          style={{
            position: "relative",
          }}
        >
          {loading && <Loading />}Login
        </button>
        <span className={styles.login}>
          Don't have an account?{" "}
          <Link href="/signup">
            <a>Sign Up</a>
          </Link>
        </span>
        <span className={styles.login}>
          Lost your password?{" "}
          <Link href="/forgot-password">
            <a>Get it fixed!</a>
          </Link>
        </span>
      </form>
    </Fade>
  );
};

export default Form;
