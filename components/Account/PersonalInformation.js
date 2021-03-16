// comonents
import AccountEditInputContainer from "./AccountEditInputContainer";

const PersonalInformation = ({
  profile,
  setPersonalInfoShow,
  personalInfoShow,
  updateProfile,
  firstName,
  lastName,
  email,
  address,
  city,
  zip,
  phone,
  setFirstName,
  setLastName,
  setEmail,
  setAddress,
  setCity,
  setZip,
  setPhone,
  personalInfoError,
}) => {
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
          <div className="account-edit-profile-img-container">
            <h6>Add an image</h6>
            <input type="file" />
            <button>Submit Image</button>
          </div>
          <AccountEditInputContainer
            label="First Name"
            type="text"
            state={firstName}
            setState={setFirstName}
          />
          <AccountEditInputContainer
            label="Last Name"
            type="text"
            state={lastName}
            setState={setLastName}
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
          <button onClick={updateProfile}>Save My Personal Information</button>
        </>
      ) : (
        <>
          <h6>Profile Picture</h6>
          <h6>First Name</h6>
          <p>{profile.firstname}</p>
          <h6>Last Name</h6>
          <p>{profile.lastname}</p>
          <h6>Email Address</h6>
          <p>{profile.email}</p>
          <h6>Address</h6>
          <h6>City</h6>
          <h6>Zip code</h6>
          <h6>Phone Number</h6>
        </>
      )}
    </div>
  );
};

export default PersonalInformation;
