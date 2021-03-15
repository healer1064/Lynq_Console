import Fade from "react-reveal/Fade";

const SignupLeftbar = () => {
  return (
    <Fade left duration={600}>
      <div className="signup-left">
        <h1>Live Mentoring Platform Reinvented</h1>
        <div className="signup-art">
          <img src="/img/signup-art.svg" alt="" />
        </div>
      </div>
    </Fade>
  );
};

export default SignupLeftbar;
