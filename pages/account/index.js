// libraries
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

// components
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import PersonalInformation from "../../components/Account/PersonalInformation";
import BusinessPayments from "../../components/Account/BusinessPayments";
import ChangePassword from "../../components/Account/ChangePassword";

const Account = () => {
  // states
  const [profile, setProfile] = useState(null);
  const [business, setBusiness] = useState(null);
  const [personalInfoShow, setPersonalInfoShow] = useState(false);
  const [accountBusShow, setAccountBusShow] = useState(false);
  const [passShow, setPassShow] = useState(false);

  // personal info state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");

  const [personalInfoError, setPersonalInfoError] = useState(false);

  // business state
  const [businessName, setBusinessName] = useState("");
  const [bank, setBank] = useState("");
  const [iban, setIban] = useState("");
  const [account, setAccount] = useState("");

  const [paymentsError, setPaymentsError] = useState(false);

  // change password
  const [prevPass, setPrevPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [passCheck, setPassCheck] = useState(false);

  const [passError, setPassError] = useState(false);

  const router = useRouter();

  useEffect(() => {
    getProfileData();
    getBusinessData();
  }, []);

  const getProfileData = async () => {
    const token = localStorage.getItem("linqToken");

    const response = await fetch("/api/account/profile", {
      headers: new Headers({ "Content-Type": "application/json", token }),
    });

    const data = await response.json();

    setProfile(data);
  };

  const getBusinessData = async () => {
    const token = localStorage.getItem("linqToken");

    const response = await fetch("/api/account/business", {
      headers: new Headers({ "Content-Type": "application/json", token }),
    });

    const data = await response.json();

    setBusiness(data);
  };

  const updateProfile = () => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      address !== "" &&
      city !== "" &&
      zip !== "" &&
      phone !== ""
    ) {
      // change raw data with useState variables
      setPersonalInfoError(false);
      const _reqData = {
        fullname: `${firstName} ${lastName}`,
        email,
        address,
        city,
        zipCode: zip,
        phoneNumber: phone,
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
    } else {
      setPersonalInfoError(true);
    }
  };

  const updateBusiness = () => {
    // change raw data with useState variables
    if (
      businessName !== "" &&
      bank !== "" &&
      iban !== "" &&
      accountNumber !== ""
    ) {
      setPaymentsError(false);
      const _reqData = {
        id: "string",
        accountID: "string",
        businessName: businessName,
        bankName: bank,
        iban,
        accountNumber: account,
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
    } else {
      setPaymentsError(true);
    }
  };

  const updatePassword = () => {
    if (prevPass !== "" && newPass !== "" && confirmPass !== "") {
      setPassError(false);
      setPassCheck(false);
      if (newPass === confirmPass) {
        setPassCheck(false);
        // change raw data with useState variables
        const _reqData = {
          oldPassword: prevPass,
          newPassword: newPass,
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
      } else {
        setPassCheck(true);
      }
    } else {
      setPassError(true);
      setPassCheck(false);
    }
  };

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
      <Navbar active="account" />
      <div className="page-wrp">
        <Leftbar />
        <div className="content-wrp">
          {!profile || !business ? (
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                style={{ width: "60px" }}
                src="/img/loading.gif"
                alt="loading"
              />
            </div>
          ) : (
            <div className="account">
              <div className="account-tab">
                <p onClick={() => router.push("/account")} className="active">
                  Account
                </p>
                {/* <p onClick={() => router.push("/account/billing")}>Billing</p> */}
              </div>
              <div className="account-content">
                <div className="account-content-side-nav">
                  <div>
                    <img src="/img/account-send.svg" alt="current-plan" />
                    <p>Current Plan</p>
                  </div>
                  {/* <div>
                  <img src="/img/account-send.svg" alt="current-plan" />
                  <p>Informations</p>
                </div> */}
                  <div>
                    <img src="/img/account-send.svg" alt="current-plan" />
                    <p>Personal Information</p>
                  </div>
                  <div>
                    <img src="/img/account-send.svg" alt="current-plan" />
                    <p>Business & Payments</p>
                  </div>
                  <div className="last">
                    <img src="/img/account-send.svg" alt="current-plan" />
                    <p>Change Password</p>
                  </div>
                </div>
                <select className="account-content-side-nav-mob">
                  <option>Current Plan</option>
                  {/* <option>Informations</option> */}
                  <option>Business Information</option>
                  <option>Business & Payments</option>
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
                  <PersonalInformation
                    profile={profile}
                    setPersonalInfoShow={setPersonalInfoShow}
                    personalInfoShow={personalInfoShow}
                    updateProfile={updateProfile}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    address={address}
                    city={city}
                    zip={zip}
                    phone={phone}
                    setFirstName={setFirstName}
                    setLastName={setLastName}
                    setEmail={setEmail}
                    setAddress={setAddress}
                    setCity={setCity}
                    setZip={setZip}
                    setPhone={setPhone}
                    personalInfoError={personalInfoError}
                  />
                  <BusinessPayments
                    business={business}
                    accountBusShow={accountBusShow}
                    setAccountBusShow={setAccountBusShow}
                    updateBusiness={updateBusiness}
                    businessName={businessName}
                    setBusinessName={setBusinessName}
                    bank={bank}
                    setBank={setBank}
                    iban={iban}
                    setIban={setIban}
                    account={account}
                    setAccount={setAccount}
                    paymentsError={paymentsError}
                  />
                  <ChangePassword
                    passShow={passShow}
                    setPassShow={setPassShow}
                    updatePassword={updatePassword}
                    prevPass={prevPass}
                    setPrevPass={setPrevPass}
                    newPass={newPass}
                    setNewPass={setNewPass}
                    confirmPass={confirmPass}
                    setConfirmPass={setConfirmPass}
                    passError={passError}
                    passCheck={passCheck}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Account;
