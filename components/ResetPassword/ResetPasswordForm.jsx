// libraries
import { useState } from "react";
import Fade from "react-reveal/Fade";

// components
import Loading from "../common/Loading";

const ResetPasswordForm = ({
  setShowPassword,
  showPassword,
  onSubmit,
  loading,
}) => {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const [errors, setErrors] = useState({
    emailError: false,
    password: password,
    cPassword: cPassword,
  });

  const handleForm = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit();
    }
  };

  const validate = () => {
    if (email !== "" && password && cPassword && password != password) {
      setErrors({
        ...errors,
        emailError: false,
        passwordError: false,
        cPasswordError: false,
        passMatch: false,
      });

      return true;
    }

    setErrors({
      ...errors,
      emailError: email === "" ? true : false,
      passwordError: password === "" ? true : false,
      cPasswordError: cPassword === "" ? true : false,
      passMatch: password != cPassword ? true : false,
    });

    return false;
  };

  return (
    <Fade bottom duration={600}>
      <form onSubmit={handleForm}>
        <h2>Reset Password</h2>
        <p>To change the password, type in your email and password</p>
        <div className="signup-form__inp">
          <strong>Email</strong>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.emailError) {
                setErrors({ ...errors, emailError: false });
              }
            }}
            type="email"
            placeholder="Enter your email"
          />
          {errors.emailError && (
            <span style={{ color: "red", fontSize: "0.8rem" }}>* Required</span>
          )}
        </div>
        <div className="signup-form__inp">
          <strong>Password</strong>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.passwordError) {
                setErrors({ ...errors, passwordError: false });
              }
            }}
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
          />
          {errors.passwordError && (
            <span style={{ color: "red", fontSize: "0.8rem" }}>* Required</span>
          )}
          <img
            style={{ bottom: `${errors.passwordError ? "32px" : "14px"}` }}
            src={showPassword ? "/img/show-password.svg" : "/img/pass-show.svg"}
            alt=""
            className="show-password"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <div className="signup-form__inp">
          <strong>Password</strong>
          <input
            value={cPassword}
            onChange={(e) => {
              setCPassword(e.target.value);
              if (errors.cPasswordError) {
                setErrors({ ...errors, cPasswordError: false });
              }
            }}
            type={showPassword ? "text" : "password"}
            placeholder="Confirm your password"
          />
          {errors.cPasswordError && (
            <span style={{ color: "red", fontSize: "0.8rem" }}>* Required</span>
          )}
          {errors.passMatch && (
            <span style={{ color: "red", fontSize: "0.8rem" }}>
              * Passwords don't match
            </span>
          )}
          <img
            style={{ bottom: `${errors.cPasswordError ? "32px" : "14px"}` }}
            src={showPassword ? "/img/show-password.svg" : "/img/pass-show.svg"}
            alt=""
            className="show-password"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <button
          className="signup-form__btn"
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
