// libraries
import React from "react";
import Fade from "react-reveal/Fade";

// styles
import styles from "./styles.module.sass";

// components
import Loading from "@/components/common/Loading";

const ResetPasswordForm = ({
  setShowPassword,
  showPassword,
  onSubmit,
  loading,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  return (
    <Fade bottom duration={600}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2>Reset Password</h2>
        <p>To change the password, type in your email and password</p>
        <div className={styles.form_input}>
          <strong>Password</strong>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
          />
          <img
            src={showPassword ? "/img/show-password.svg" : "/img/pass-show.svg"}
            alt=""
            className={styles.show_password}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <div className={styles.form_input}>
          <strong>Password</strong>
          <input
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            type={showPassword ? "text" : "password"}
            placeholder="Confirm your password"
          />

          <img
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
          {loading && <Loading />}Reset Password
        </button>
      </form>
    </Fade>
  );
};

export default ResetPasswordForm;
