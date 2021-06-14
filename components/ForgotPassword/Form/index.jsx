// libraries
import Fade from "react-reveal/Fade";

// styles
import styles from "./styles.module.sass";

// components
import Loading from "@/components/common/Loading";

const ForgotPasswordForm = ({ onSubmit, loading, input, setInput }) => {
  return (
    <Fade bottom duration={600}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2>Forgot Password</h2>
        <p>To change the password, type in your email</p>
        <div className={styles.form_input}>
          <strong>Email</strong>
          <input
            type="email"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <button className={styles.btn}>
          {loading && <Loading />}Reset Password
        </button>
      </form>
    </Fade>
  );
};

export default ForgotPasswordForm;
