// libraries
import Head from "next/head";
import { useRouter } from "next/router";

// components
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import AccountEditInputContainer from "../../components/AccountEdit/AccountEditInputContainer";

const AccountEdit = () => {
  const router = useRouter();

  const updateProfile = () => {
    // change raw data with useState variables
    const _reqData = {
      fullname: "string",
      email: "qazi222@test.com",
      address: "string",
      city: "string",
      zipCode: "string",
      phoneNumber: "string",
      profilePicture: "string",
    };

    const token = localStorage.getItem("linqToken");

    async function update() {
      const response = await fetch("/api/account/profile-update", {
        headers: new Headers({
          data: JSON.stringify({ token, _reqData }),
        }),
      });

      return await response.json();
    }

    update()
      .then((res) => {
        console.log("profile updates", res);
      })
      .catch((err) => {
        console.log("profile update error", err);
      });
  };

  const updateBusiness = () => {
    // change raw data with useState variables
    const _reqData = {
      id: "string",
      accountID: "string",
      businessName: "LinqToAll",
      bankName: "string",
      iban: "string",
      accountNumber: "string",
      routingNumber: "string",
    };

    const token = localStorage.getItem("linqToken");

    async function update() {
      const response = await fetch("/api/account/business-update", {
        headers: new Headers({
          data: JSON.stringify({ token, _reqData }),
        }),
      });

      return await response.json();
    }

    update()
      .then((res) => {
        console.log("business updates", res);
      })
      .catch((err) => {
        console.log("business update error", err);
      });
  };

  const updatePassword = () => {
    // change raw data with useState variables
    const _reqData = {
      oldPassword: "string",
      newPassword: "string",
    };

    const token = localStorage.getItem("linqToken");

    async function update() {
      const response = await fetch("/api/account/password-update", {
        headers: new Headers({
          data: JSON.stringify({ token, _reqData }),
        }),
      });

      return await response.json();
    }

    update()
      .then((res) => {
        console.log("password updates", res);
      })
      .catch((err) => {
        console.log("password update error", err);
      });
  };

  return (
    <>
      <Head>
        <title>Account Edit</title>
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
                  <p>2,9%</p>
                  <h6>Example On $10 Ticket</h6>
                  <p>You will be paid $10 - $0.29 =$9.71</p>
                </div>
                <div className="account-personal">
                  <h3>
                    Personal Information <span>Cancel</span>
                  </h3>
                  <div className="account-edit-profile-img-container">
                    <h6>Add an image</h6>
                    <input type="file" />
                    <button>Submit Image</button>
                  </div>
                  <AccountEditInputContainer label="First Name" type="text" />
                  <AccountEditInputContainer label="Last Name" type="text" />
                  <AccountEditInputContainer
                    label="Email Address"
                    type="text"
                  />
                  <AccountEditInputContainer label="Address" type="text" />
                  <AccountEditInputContainer label="City" type="text" />
                  <AccountEditInputContainer label="Zip Code" type="text" />
                  <AccountEditInputContainer label="Phone Number" type="text" />
                  <button onClick={updateProfile}>
                    Save My Personal Information
                  </button>
                </div>
                <div className="account-business">
                  <h3>
                    Business and Payments <span>Cancel</span>
                  </h3>
                  <AccountEditInputContainer
                    label="Business Name"
                    type="text"
                  />
                  <AccountEditInputContainer label="Bank Name" type="text" />
                  <AccountEditInputContainer label="IBAN" type="text" />
                  <AccountEditInputContainer
                    label="Account Number"
                    type="text"
                  />
                  <button onClick={updateBusiness}>
                    Save My Personal Information
                  </button>
                </div>
                <div className="account-password">
                  <h3>
                    Change Password <span>Cancel</span>
                  </h3>
                  <AccountEditInputContainer
                    label="Previous Password"
                    type="password"
                  />
                  <AccountEditInputContainer
                    label="New Password"
                    type="password"
                  />
                  <AccountEditInputContainer
                    label="Repeat Password"
                    type="password"
                  />
                  <button onClick={updatePassword}>Update My Password</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountEdit;
