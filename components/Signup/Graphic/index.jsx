// libraries
import Fade from "react-reveal/Fade";

// styles
import styles from "./styles.module.sass";

const SignupLeftbar = () => {
  return (
    <Fade left duration={600}>
      <div className={styles.graphic}>
        <h1>Live Mentoring Platform Reinvented</h1>
        <div>
          <img src="/img/signup-art.svg" alt="" />
        </div>
      </div>
    </Fade>
  );
};

export default SignupLeftbar;
