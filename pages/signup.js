import Head from 'next/head'
import {useState} from 'react'

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <div className="signup">
        <div className="signup-left">
          <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim adipiscing</h1>
          <div className="signup-art">
            <img src="/img/signup-art.svg" alt=""/>
          </div>
        </div>
        <div className="signup-form">
          <a href="#" className="signup-form__logo">
            <img src="/img/linq-logo-big.svg" alt=""/>
          </a>
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
        </div>
      </div>
    </>
  )
}
