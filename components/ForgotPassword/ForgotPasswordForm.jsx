// libraries
import { useState } from "react";
import Link from "next/link";
import Fade from "react-reveal/Fade";

// components
import Loading from "../common/Loading";

const ForgotPasswordForm = ({ onSubmit, loading }) => {
  // states
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({
    emailError: false,
  });

  const handleForm = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit();
    }
  };

  const validate = () => {
    if (email !== "") {
      setErrors({
        ...errors,
        emailError: false,
      });

      return true;
    }

    setErrors({
      ...errors,
      emailError: email === "" ? true : false,
    });

    return false;
  };

  return (
    <Fade bottom duration={600}>
      <form onSubmit={handleForm}>
        <h2>Forgot Password</h2>
        <p>To change the password, type in your email</p>
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

export default ForgotPasswordForm;
