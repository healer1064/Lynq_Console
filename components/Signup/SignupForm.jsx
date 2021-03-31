// libraries
import { useState } from "react";
import Link from "next/link";
import Fade from "react-reveal/Fade";

// components
import Loading from "../common/Loading";

const SignupForm = ({
  setShowPassword,
  showPassword,
  signUp,
  loading,
  toggle,
}) => {
  // states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    passwordError: false,
    termsError: false,
  });

  const handleForm = (e) => {
    e.preventDefault();
    if (validate()) {
      let name = fullName.split(" ");
      signUp({
        firstName: name[0],
        lastName: name[1],
        email: email,
        password: password,
        toc: terms,
      });
    }
  };

  const validate = () => {
    if (fullName !== "" && email !== "" && password !== "" && terms === true) {
      setErrors({
        ...errors,
        nameError: false,
        emailError: false,
        passwordError: false,
        termsError: false,
      });

      return true;
    }

    setErrors({
      ...errors,
      nameError: fullName === "" ? true : false,
      emailError: email === "" ? true : false,
      passwordError: password === "" ? true : false,
      termsError: terms === false ? true : false,
    });

    return false;
  };

  return (
    <Fade bottom duration={600}>
      <form onSubmit={handleForm}>
        <h2>Sign Up</h2>
        <p>To Access the panel Register with following information</p>
        <div className="signup-form__inp">
          <strong>Full Name</strong>
          <input
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.nameError) {
                setErrors({ ...errors, nameError: false });
              }
            }}
            type="text"
            placeholder="Enter your full name"
          />
          {errors.nameError && (
            <span style={{ color: "red", fontSize: "0.8rem" }}>* Required</span>
          )}
        </div>
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
              if (errors.termsError) {
                setErrors({ ...errors, termsError: false });
              }
            }}
          />
          <div className="checkmark"></div>
          <span>
            I have read, and I accept the{" "}
            <strong
              style={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={toggle}
            >
              Terms and Conditions.
            </strong>
            {/* <Link href="/terms&conditions">
            </Link> */}
          </span>
        </label>
        {errors.termsError && (
          <span
            style={{
              color: "red",
              fontSize: "0.8rem",
              marginTop: "-26px",
              marginBottom: "26px",
            }}
          >
            * Required
          </span>
        )}
        <button
          className="signup-form__btn"
          style={{
            position: "relative",
          }}
        >
          {loading && <Loading />}Sign Up
        </button>
        <span className="signup-form__login">
          Already have an account?{" "}
          <Link href="/login">
            <a>Log In</a>
          </Link>
        </span>
      </form>
    </Fade>
  );
};

export default SignupForm;
