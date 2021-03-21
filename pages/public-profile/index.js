// libraries
import { useState, useRef, useContext } from "react";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// styles
import styles from "../../styles/EditProfile.module.sass";

// components
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import EditProfileDDCheck from "../../components/EditProfile/EditProfileDDCheck";

// context
import ProfileContext from "../../context/profile";
import Loading from "../../components/common/Loading";

// fake categories
const categoriesData = [
  "Astrologer",
  "Car Specialist",
  "Fashion Coach",
  "Fitness Teacher",
  "Home Repair Specialist",
  "Language Teacher",
  "Life Coach",
  "Makeup Artist",
  "Math/Physics Teacher",
  "Meditation/Yoga Coach",
  "Music Teacher",
  "Other",
];

const EditProfile = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [slug, setSlug] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [categories, setCategories] = useState([]);
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [website, setWebsite] = useState("");
  const [generalPres, setGeneralPres] = useState("");
  const [whatToExpect, setWhatToExpect] = useState("");
  const [specialities, setSpecialities] = useState([]);
  const [certifications, setCertifications] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const imgRef = useRef();

  // upload image file
  const handleImgUpload = (e) => {
    setImageFile(e.target.files[0]);

    const reader = new FileReader();
    reader.onloadend = function () {
      setImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);

    uploadProfilePic();
  };

  const updateProfile = (e) => {
    e.preventDefault();
    setLoading(true);
    const _reqData = {
      slug,
      location: `${city} - ${state}`,
      category: categories.join(", "),
      about: generalPres,
      facebook,
      instagram,
      youtube,
      personal_website: website,
      name: `${firstName} ${lastName}`,
      expect_details: whatToExpect,
      speciality: [],
    };

    async function update() {
      // const response = await fetch("/api/public-profile", {
      //   headers: new Headers({
      //     data: JSON.stringify({ token, _reqData }),
      //   }),
      // });

      const response = await fetch(
        `http://reb00t.uc.r.appspot.com/account/public-profile?t=${token}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(_reqData),
        }
      );

      return await response.json();
    }

    update()
      .then((res) => {
        setLoading(false);
        console.log("public profile updates", res);
        toast.success("Profile updated successfully");
      })
      .catch((err) => {
        setLoading(false);
        console.log("public profile update error", err);
        toast.error("An error has occurred");
      });
  };

  const uploadProfilePic = () => {
    setLoading(true);

    async function upload() {
      // const response = await fetch("/api/common/upload-image", {
      //   headers: new Headers({
      //     data: JSON.stringify({ token, image: image }),
      //   }),
      // });

      var formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch(
        `http://reb00t.uc.r.appspot.com/account/public-profile/upload_picture?t=${token}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: formData,
        }
      );

      return await response.json();
    }

    upload()
      .then((res) => {
        setLoading(false);
        console.log("profile pic", res);
      })
      .catch((err) => {
        setLoading(false);
        console.log("error profile pic", err);
        toast.error("An error has occurred");
      });
  };

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
      <ToastContainer />
      <Navbar active="profile" />
      <div className="page-wrp">
        <Leftbar active="profile" />
        <div className="content-wrp">
          <div className={styles.edit_profile}>
            <h3>Public Profile</h3>
            <form onSubmit={(e) => updateProfile(e)}>
              <div className={styles.edit_profile_img_container}>
                {image !== null ? (
                  <img src={image} className={styles.edit_profile_img} />
                ) : (
                  <div className={styles.place_holder}>S</div>
                )}
                <div className={styles.edit_profile_btn_container}>
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    ref={imgRef}
                    style={{ display: "none" }}
                    onChange={handleImgUpload}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      imgRef.current.click();
                    }}
                  >
                    Upload Picture
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      alert("no set yet");
                    }}
                  >
                    Delete
                  </button>
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
                <label>
                  Personalize your Lynq Public url
                  <span>
                    {" "}
                    (
                    {`www.lynq.app/${
                      slug === "" ? "[your-slug-goes-here]" : slug
                    }`}
                    )
                  </span>
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g chuck-norris"
                />
              </div>
              <div>
                <label>City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
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
              <div style={{ position: "relative" }}>
                <label>
                  Main Categories <span>(Choose upto 3)</span>
                </label>
                <EditProfileDDCheck
                  state={categories}
                  setState={setCategories}
                  categories={categoriesData}
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
              <div>
                <label>Personal Website</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
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
                  <span>(Press enter after each certification)</span>
                </label>
                <textarea
                  value={certifications}
                  onChange={(e) => setCertifications(e.target.value)}
                ></textarea>
              </div>
              <div className={styles.text_uppercase}>
                <button type="submit" style={{ position: "relative" }}>
                  {loading && <Loading />}Save Profile
                </button>
                {/* <button>Cancel</button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
