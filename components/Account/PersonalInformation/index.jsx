// libraries
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// requests
import { postProfileReq } from "@/utils/requests/account";

// components
import Input from "../Input";
import Loading from "@/components/common/Loading";

const PersonalInformation = ({ profile, toggleSuccess }) => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [personalInfoShow, setPersonalInfoShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.fullname);
      setAddress(profile.address);
      setEmail(profile.email);
      setCity(profile.city);
      setZip(profile.zipCode);
      setPhone(profile.phoneNumber);
    }
  }, [profile]);

  const updateProfile = () => {
    if (
      name !== "" &&
      email !== "" &&
      address !== "" &&
      city !== "" &&
      zip !== "" &&
      phone !== ""
    ) {
      setLoading(true);
      const reqData = {
        fullname: name,
        email,
        address,
        city,
        zipCode: zip,
        phoneNumber: phone,
        profilePicture: "",
      };
      postProfileReq(token, reqData)
        .then((res) => {
          setLoading(false);
          if (res.status == 200) {
            toggleSuccess();
          } else {
            toast.error("Failed to update profile information!");
          }
        })
        .catch(() => {
          setLoading(false);
          toast.error("Failed to update profile information!");
        });
    } else {
      toast.info("Please fill all required fields!");
    }
  };

  return (
    <div className={styles.personal}>
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
          <Input label="Name" type="text" state={name} setState={setName} />
          <Input
            label="Email Address"
            type="email"
            state={email}
            setState={setEmail}
          />
          <Input
            label="Address"
            type="text"
            state={address}
            setState={setAddress}
          />
          <Input label="City" type="text" state={city} setState={setCity} />
          <Input label="Zip Code" type="number" state={zip} setState={setZip} />
          <Input
            label="Phone Number"
            type="phone"
            state={phone}
            setState={setPhone}
          />
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
