// libraries
import { useState } from "react";
import Link from "next/link";
import Fade from "react-reveal/Fade";

// components
import Loading from "../common/Loading";

const LoginForm = ({ setShowPassword, showPassword, signIn, loading }) => {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const [errors, setErrors] = useState({
    emailError: false,
    passwordError: false,
  });

  const handleForm = (e) => {
    e.preventDefault();
    if (validate()) {
      signIn({
        email: email,
        password: password,
        logged: terms,
      });
    }
  };

  const validate = () => {
    if (email !== "" && password) {
      setErrors({
        ...errors,
        emailError: false,
        passwordError: false,
      });

      return true;
    }

    setErrors({
      ...errors,
      emailError: email === "" ? true : false,
      passwordError: password === "" ? true : false,
    });

    return false;
  };

  return (
    <Fade bottom duration={600}>
      <form onSubmit={handleForm}>
        <h2>Login</h2>
        <p>To Access the panel Login with your credentials</p>
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
            placeholder="Enter your password"
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
        <label className="signup-form__terms">
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => {
              setTerms(e.target.checked);
            }}
          />
          <div className="checkmark"></div>
          <span>Keep Me Logged In</span>
        </label>
        <button
          className="signup-form__btn"
          style={{
            position: "relative",
          }}
        >
          {loading && <Loading />}Login
        </button>
        <span className="signup-form__login">
          Don't have an account?{" "}
          <Link href="/signup">
            <a>Sign Up</a>
          </Link>
        </span>
      </form>
    </Fade>
  );
};

export default LoginForm;
