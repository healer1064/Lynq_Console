const SignupForm = ({setShowPassword, showPassword}) => {
    return (
        <form>
            <h2>Sign Up</h2>
            <p>To Access the panel Register with following information</p>
            <div className="signup-form__inp">
              <strong>Full Name</strong>
              <input type="text" placeholder="Enter your full name"/>
            </div>
            <div className="signup-form__inp">
              <strong>Email</strong>
              <input type="text" placeholder="Enter your email"/>
            </div>
            <div className="signup-form__inp">
              <strong>Password</strong>
              <input type={showPassword ? "text" : "password"} placeholder="Enter your password"/>
              <img src="/img/show-password.svg" alt="" className="show-password" onClick={() => setShowPassword(!showPassword)}/>
            </div>
            <label className="signup-form__terms">
              <input type="checkbox"/>
              <div className="checkmark"></div>
              <span>I have read, and I accept the Terms and Conditions</span>
            </label>
            <button className="signup-form__btn">
              Sign Up
            </button>
            <span className="signup-form__login">
              Already have an account? <a href="#">Log In</a>
            </span>
          </form>
    )
}

export default SignupForm
