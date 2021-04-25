// libraries
import Fade from "react-reveal/Fade";

// components
import Loading from "../common/Loading";

const ForgotPasswordForm = ({ onSubmit, loading, input, setInput }) => {
  return (
    <Fade bottom duration={600}>
      <form onSubmit={onSubmit}>
        <h2>Forgot Password</h2>
        <p>To change the password, type in your email</p>
        <div className="signup-form__inp">
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
