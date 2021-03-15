// libraries
import { useState } from "react";
import Head from "next/head";
import useSWR from "swr";

// styles
import styles from "../styles/EditProfile.module.sass";

// components
import Navbar from "../components/Navbar";
import Leftbar from "../components/Leftbar";
import EditProfileDropdown from "../components/EditProfile/EditProfileDropdown";

const cities = ["New York", "Washington DC"];
const cat = ["Category 1", "Category 2"];

const EditProfile = () => {
  // states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [categories, setCategories] = useState([]);
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [generalPres, setGeneralPres] = useState("");
  const [whatToExpect, setWhatToExpect] = useState("");
  const [specialities, setSpecialities] = useState("");
  const [certifications, setCertifications] = useState("");

  return (
    <>
      <Head>
        <title>Public Profile</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <div className="page-wrp">
        <Leftbar active="profile" />
        <div className="content-wrp">
          <div className={styles.edit_profile}>
            <h3>Public Profile</h3>
            <form>
              <div className={styles.edit_profile_img_container}>
                <div className={styles.edit_profile_img} />
                <div className={styles.edit_profile_btn_container}>
                  <button>Upload Picture</button>
                  <button>Delete</button>
                </div>
              </div>
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <label>City</label>
                <EditProfileDropdown
                  data={cities}
                  state={city}
                  setState={setCity}
                />
              </div>
              <div>
                <label>State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div>
                <label>
                  Main Categories <span>(Choose upto 3)</span>
                </label>
                <EditProfileDropdown
                  data={cat}
                  state={categories}
                  setState={setCategories}
                />
              </div>
              <h3>Social Information</h3>
              <div>
                <label>Facebook</label>
                <input
                  type="text"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                />
              </div>
              <div>
                <label>Instagram</label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </div>
              <div>
                <label>Youtube</label>
                <input
                  type="text"
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                />
              </div>
              <h3>About</h3>
              <div>
                <label>General presentation</label>
                <textarea
                  value={generalPres}
                  onChange={(e) => setGeneralPres(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label>What to expect</label>
                <textarea
                  value={whatToExpect}
                  onChange={(e) => setWhatToExpect(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label>
                  Specialities <span>(Press enter after each speciality)</span>
                </label>
                <textarea
                  value={specialities}
                  onChange={(e) => setSpecialities(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label>
                  Certifications{" "}
                  <span>(Press enter after each speciality)</span>
                </label>
                <textarea
                  value={certifications}
                  onChange={(e) => setCertifications(e.target.value)}
                ></textarea>
              </div>
              <div className={styles.text_uppercase}>
                <button>Save Profile</button>
                <button>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
