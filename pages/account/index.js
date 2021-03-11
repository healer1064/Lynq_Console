// libraries
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// components
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";

const Account = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Account</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <div className="page-wrp">
        <Leftbar />
        <div className="content-wrp">
          <div className="account">
            <div className="account-tab">
              <p onClick={() => router.push("/account")} className="active">
                Account
              </p>
              <p onClick={() => router.push("/account/billing")}>Billing</p>
            </div>
            <div className="account-content">
              <div className="account-content-side-nav">
                <div>
                  <img src="/img/account-send.svg" alt="current-plan" />
                  <p>Current Plan</p>
                </div>
                <div>
                  <img src="/img/account-send.svg" alt="current-plan" />
                  <p>Informations</p>
                </div>
                <div>
                  <img src="/img/account-send.svg" alt="current-plan" />
                  <p>Business Infromation</p>
                </div>
                <div>
                  <img src="/img/account-send.svg" alt="current-plan" />
                  <p>Payments</p>
                </div>
                <div className="last">
                  <img src="/img/account-send.svg" alt="current-plan" />
                  <p>Change Password</p>
                </div>
              </div>
              <select className="account-content-side-nav-mob">
                <option>Current Plan</option>
                <option>Informations</option>
                <option>Business Infromation</option>
                <option>Payments</option>
                <option>Change Password</option>
              </select>
              <div className="account-info">
                <div className="account-subscription">
                  <h3>Subscription</h3>
                  <h6>Your Current Plan</h6>
                  <p>EARLY BIRD</p>
                  <h6>Processing Fees On Payments</h6>
                  <p>2.9%</p>
                  <h6>Example On $10 Ticket</h6>
                  <p>You will be paid $10 - $0.29 =$9.71</p>
                </div>
                <div className="account-personal">
                  <h3>
                    Personal Information{" "}
                    <Link href="/account/edit">
                      <span>Edit</span>
                    </Link>
                  </h3>
                  <h6>Profile Picture</h6>
                  <h6>First Name</h6>
                  <p>Tom</p>
                  <h6>Last Name</h6>
                  <p>Brody</p>
                  <h6>Email Address</h6>
                  <p>Tomtom123@gmail.com</p>
                  <h6>Address</h6>
                  <h6>City</h6>
                  <h6>Zip code</h6>
                  <h6>Phone Number</h6>
                </div>
                <div className="account-business">
                  <h3>
                    Business and Payments{" "}
                    <Link href="/account/edit">
                      <span>Edit</span>
                    </Link>
                  </h3>
                  <div>
                    <h6>Business Name</h6>
                    <p>Not defined</p>
                    <h6>Bank Name</h6>
                    <p>Not defined</p>
                    <h6>IBAN</h6>
                    <p>Not defined</p>
                    <h6>Account Number</h6>
                    <p>Not defined</p>
                    <h6>Routing Number</h6>
                    <p>Not defined</p>
                  </div>
                </div>
                <div className="account-password">
                  <h3>
                    Change Password{" "}
                    <Link href="/account/edit">
                      <span>Edit</span>
                    </Link>
                  </h3>
                  <div>
                    <p>
                      For editing your password, you need to remember the
                      previous one.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
