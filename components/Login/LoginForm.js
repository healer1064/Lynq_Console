// libraries
import { useState } from "react";
import Link from "next/link";

const LoginForm = ({ setShowPassword, showPassword }) => {
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
      //   let name = fullName.split(" ");
      //   signUp({
      //     firstName: name[0],
      //     lastName: name[1],
      //     email: email,
      //     password: password,
      //     toc: terms,
      //   });
      alert("done");
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
      <button className="signup-form__btn">
        {/* {!loading ? "Sign Up" : "Loading..."} */}
        Login
      </button>
      <span className="signup-form__login">
        Don't have an account?{" "}
        <Link href="/signup">
          <a>Sign Up</a>
        </Link>
      </span>
    </form>
  );
};

export default LoginForm;
