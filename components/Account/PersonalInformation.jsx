// libraries
import { useEffect } from "react";

// comonents
import AccountEditInputContainer from "./AccountEditInputContainer";
import Loading from "../common/Loading";

const PersonalInformation = ({
  profile,
  setPersonalInfoShow,
  personalInfoShow,
  updateProfile,
  name,
  email,
  address,
  city,
  zip,
  phone,
  setName,
  setEmail,
  setAddress,
  setCity,
  setZip,
  setPhone,
  personalInfoError,
  loading,
}) => {
  useEffect(() => {
    setName(profile.fullname);
    setAddress(profile.address);
    setEmail(profile.email);
    setCity(profile.city);
    setZip(profile.zipCode);
    setPhone(profile.phoneNumber);
  }, []);

  return (
    <div className="account-personal">
      <h3>
        Personal Information
        {personalInfoShow ? (
          <span onClick={() => setPersonalInfoShow(false)}>Cancel</span>
        ) : (
          <span onClick={() => setPersonalInfoShow(true)}>Edit</span>
        )}
      </h3>
      {personalInfoShow ? (
        <>
          <AccountEditInputContainer
            label="Name"
            type="text"
            state={name}
            setState={setName}
          />
          <AccountEditInputContainer
            label="Email Address"
            type="email"
            state={email}
            setState={setEmail}
          />
          <AccountEditInputContainer
            label="Address"
            type="text"
            state={address}
            setState={setAddress}
          />
          <AccountEditInputContainer
            label="City"
            type="text"
            state={city}
            setState={setCity}
          />
          <AccountEditInputContainer
            label="Zip Code"
            type="number"
            state={zip}
            setState={setZip}
          />
          <AccountEditInputContainer
            label="Phone Number"
            type="phone"
            state={phone}
            setState={setPhone}
          />
          {personalInfoError && (
            <p
              style={{
                color: "red",
                margin: "-10px 0 20px",
                fontStyle: "italic",
              }}
            >
              * Please fill all fields
            </p>
          )}
          <button
            onClick={updateProfile}
            style={{
              position: "relative",
            }}
          >
            {loading && <Loading />}Save My Personal Information
          </button>
        </>
      ) : (
        <>
          <h6>Name</h6>
          <p>{profile.fullname || "null"}</p>
          <h6>Email Address</h6>
          <p>{profile.email || "null"}</p>
          <h6>Address</h6>
          <p>{profile.address || "null"}</p>
          <h6>City</h6>
          <p>{profile.city || "null"}</p>
          <h6>Zip code</h6>
          <p>{profile.zipCode || "null"}</p>
          <h6>Phone Number</h6>
          <p>{profile.phoneNumber || "null"}</p>
        </>
      )}
    </div>
  );
};

export default PersonalInformation;
