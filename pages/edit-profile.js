// libraries
import Head from "next/head";

// styles
import styles from "../styles/EditProfile.module.sass";

// components
import Navbar from "../components/Navbar";
import Leftbar from "../components/Leftbar";

const EditProfile = () => {
  return (
    <>
      <Head>
        <title>Edit Profile</title>
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
                <input />
              </div>
              <div>
                <label>Last Name</label>
                <input />
              </div>
              <div>
                <label>City</label>
                <select>
                  <option>New York</option>
                  <option>Washington DC</option>
                </select>
              </div>
              <div>
                <label>State</label>
                <input />
              </div>
              <div>
                <label>
                  Main Categories <span>(Choose upto 3)</span>
                </label>
                <select>
                  <option>Category 1</option>
                  <option>Category 2</option>
                </select>
              </div>
              <h3>Social Information</h3>
              <div>
                <label>Facebook</label>
                <input />
              </div>
              <div>
                <label>Instagram</label>
                <input />
              </div>
              <div>
                <label>Youtube</label>
                <input />
              </div>
              <h3>Social Information</h3>
              <div>
                <label>General presentation</label>
                <textarea></textarea>
              </div>
              <div>
                <label>What to expect</label>
                <textarea></textarea>
              </div>
              <div>
                <label>
                  Specialities <span>(Press enter after each speciality)</span>
                </label>
                <textarea></textarea>
              </div>
              <div>
                <label>
                  Certifications{" "}
                  <span>(Press enter after each speciality)</span>
                </label>
                <textarea></textarea>
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
