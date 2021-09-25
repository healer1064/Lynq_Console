// libraries
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import Fade from "react-reveal/Fade";

// styles
import styles from "./styles.module.sass";

// components
import Loading from "@/components/common/Loading";

const index = ({ setShowPassword, showPassword, signUp, loading }) => {
  // states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);

  // handle submit
  const onSubmit = (e) => {
    e.preventDefault();
    if (fullName !== "" && email !== "" && password !== "" && terms === true) {
      var regexp = /[a-zA-Z]+\s+[a-zA-Z]+/g;
      if (regexp.test(fullName)) {
        let name = fullName.split(" ");
        signUp({
          firstName: name[0],
          lastName: name[1],
          email: email,
          password: password,
          toc: terms,
        });
      } else {
        toast.info("Please type full name");
      }
    } else {
      toast.info("Please fill all fields!");
    }
  };

  return (
    <Fade bottom duration={600}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2>Sign Up</h2>
        <p>To Access the panel Register with following information</p>
        <div className={styles.form_input}>
          <strong>Full Name</strong>
          <input
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            type='text'
            placeholder='Enter your full name'
          />
        </div>
        <div className={styles.form_input}>
          <strong>Email</strong>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type='email'
            placeholder='Enter your email'
          />
        </div>
        <div className={styles.form_input}>
          <strong>Password</strong>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type={showPassword ? "text" : "password"}
            placeholder='Enter your password'
          />
          <img
            style={{ bottom: "14px" }}
            src={showPassword ? "/img/show-password.svg" : "/img/pass-show.svg"}
            alt=''
            className={styles.show_password}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <label className={styles.terms}>
          <input
            type='checkbox'
            checked={terms}
            onChange={(e) => {
              setTerms(e.target.checked);
            }}
          />
          <div className={styles.checkmark}></div>
          <span>
            I have read, and I accept the{" "}
            <a href='/terms-and-conditions' target='_blank'>
              <strong style={{ fontWeight: "bold", cursor: "pointer" }}>
                Terms and Conditions.
              </strong>
            </a>
          </span>
        </label>
        <button className={styles.btn}>{loading && <Loading />}Sign Up</button>
        <span className={styles.login}>
          Already have an account?{" "}
          <Link href='/login'>
            <a>Log In</a>
          </Link>
        </span>
      </form>
    </Fade>
  );
};

export default index;
