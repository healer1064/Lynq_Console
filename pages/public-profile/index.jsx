// libraries
import { useState, useRef, useContext, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// styles
import styles from "../../styles/EditProfile.module.sass";

// context
import ProfileContext from "../../context/profile";

// data
import { categoriesData, states } from "../../utils/data/publicprofile";

// icons
import { FaImage } from "react-icons/fa";
import { AiOutlineCopy } from "react-icons/ai";

// components
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import EditProfileDDCheck from "../../components/EditProfile/EditProfileDDCheck";
import Loading from "../../components/common/Loading";
import PageLoading from "../../components/common/PageLoading";

const EditProfile = () => {
  // router
  const router = useRouter();
  // context
  const { token, profile } = useContext(ProfileContext);

  // states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [slug, setSlug] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState();
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
  const [specImage, setSpecImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [slugCopy, setSlugCopy] = useState(false);
  const [slugNotAvail, setSlugNotAvail] = useState(false);
  const [slugRule, setSlugRule] = useState(false);
  const [allowMsg, setAllowMsg] = useState(false);

  const imgRef = useRef();

  const copyStatus = () => {
    setSlugCopy(true);
    setTimeout(() => {
      setSlugCopy(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      setSlugCopy(false);
    };
  }, []);

  useEffect(() => {
    setSlugNotAvail(false);
    if (/[^a-zA-Z0-9\.]/.test(slug)) {
      setSlugRule(true);
    } else {
      setSlugRule(false);
    }
  }, [slug]);

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token, success]);

  // get public profile
  const fetchProfile = async () => {
    setProfileLoading(true);
    const config = {
      method: "GET",
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `https://api.lynq.app/account/public-profile?t=${token}`,
      config
    );

    const _data = await response.json();
    setProfileLoading(false);

    if (response.status == 200) {
      setSlug(_data.slug || "");
      setNewSlug(_data.slug || "");
      setCity(_data.location?.split("-")[0] ?? "");
      setState(_data.location?.split(" - ")[1] ?? "");
      setCategories(JSON.parse(_data.category) || []);
      setGeneralPres(_data.about || "");
      setFacebook(_data.facebook || "");
      setInstagram(_data.instagram || "");
      setYoutube(_data.youtube || "");
      setWebsite(_data.personal_website || "");
      setFirstName(_data.name?.split(" ")[0] ?? "");
      setLastName(_data.name?.split(" ")[1] ?? "");
      setWhatToExpect(_data.expect_details || "");
      setImage(_data.public_image || null);

      const arr = [];

      if (_data.speciality) {
        _data.speciality.forEach((i) => {
          arr.push(i.name);
        });
        setSpecialities(arr.join("\n") || "");
      }
    }
  };

  // upload image file
  const handleImgUpload = (e) => {
    setImageFile(e.target.files[0]);
    uploadProfilePic(e.target.files[0]);

    const reader = new FileReader();
    reader.onloadend = function () {
      setImage(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const updateProfile = () => {
    const spec = specialities.split("\n");

    const specArr = [];

    spec.forEach((i, index) => {
      specArr.push({ id: index, name: i });
    });

    setLoading(true);
    const _reqData = {
      id: profile.id,
      slug,
      location: `${city} - ${state}`,
      category: JSON.stringify(categories),
      about: generalPres,
      facebook,
      instagram,
      youtube,
      personal_website: website,
      name: `${firstName} ${lastName}`,
      expect_details: whatToExpect,
      speciality: specArr,
      public_image: image || specImage,
    };

    async function update() {
      const response = await fetch(
        `https://api.lynq.app/account/public-profile?t=${token}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(_reqData),
        }
      );

      return await response;
    }

    update().then((res) => {
      setLoading(false);
      if (res.status == 200) {
        console.log("public profile updates", res);
        toast.success("Profile updated successfully");
        setSuccess(!success);
      } else {
        console.log("public profile update error", res);
        toast.error("An error has occurred");
        setSuccess(!success);
      }
    });
  };

  const uploadProfilePic = (_imageFile) => {
    setLoading(true);

    async function upload() {
      var formData = new FormData();
      formData.append("image", _imageFile);

      const response = await fetch(
        `https://api.lynq.app/account/public-profile/upload_picture?t=${token}`,
        {
          method: "POST",
          body: formData,
        }
      );

      return await response.json();
    }

    upload()
      .then((res) => {
        setLoading(false);
        console.log("profile pic", res);
        setSpecImage(res.public_image);
        toast.success("Profile picture updated!");
      })
      .catch((res) => {
        console.log("error profile pic", res);
        toast.error("An error has occurred");
      });
  };

  const checkSlugAvailability = (e) => {
    e.preventDefault();

    if (
      (slug === "" ||
        !slug ||
        slugRule ||
        firstName === "" ||
        lastName === "" ||
        city === "" ||
        state === "-- Select State --" ||
        categories.length === 0 ||
        generalPres === "",
      whatToExpect === "")
    ) {
      toast.error("Please fill all required fields");
    } else {
      setLoading(true);

      if (slug === newSlug) {
        updateProfile();
      } else {
        async function check() {
          const response = await fetch(
            `https://api.lynq.app/account/public-profile/is-available/${slug}`,
            {
              method: "GET",
            }
          );

          return await response.json();
        }

        check()
          .then((res) => {
            setLoading(false);
            setSlugNotAvail(res.is_available ? false : true);
            if (res.is_available) {
              console.log("available", res);
              updateProfile();
            } else {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              console.log("not available", res);
              return;
            }
          })
          .catch((err) => {
            console.log("error profile pic", err);
            toast.error("An error has occurred");
          });
      }
    }
  };

  const toggleAllowMsg = () => setAllowMsg(!allowMsg);

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
          {profileLoading ? (
            <PageLoading />
          ) : (
            <div className={styles.edit_profile}>
              <h3>Public Profile</h3>
              <form onSubmit={(e) => checkSlugAvailability(e)}>
                <div className={styles.edit_profile_img_container}>
                  {image !== null ? (
                    <img src={image} className={styles.edit_profile_img} />
                  ) : (
                    <div className={styles.place_holder}>
                      <FaImage size={26} />
                    </div>
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
                    {/* <button
                      onClick={(e) => {
                        e.preventDefault();
                        alert("no set yet");
                      }}
                    >
                      Delete
                    </button> */}
                  </div>
                </div>
                <div>
                  <label>Personalize your Public Lynq url *</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g chuck-norris"
                  />
                </div>
                {slugRule && (
                  <p
                    style={{
                      marginTop: "-5px",
                      marginBottom: "12px",
                      marginLeft: "0px",
                      fontSize: "12px",
                      color: "red",
                    }}
                  >
                    Please use only Alphanumeric characters and dot!
                  </p>
                )}
                <div>
                  <label style={{ color: "#7E88F4" }}>
                    Here is how your public Lynq url will look like
                  </label>{" "}
                  {slugCopy && (
                    <span
                      style={{
                        marginBottom: "12px",
                        marginLeft: "20px",
                        fontSize: "11px",
                        color: "#aaa",
                      }}
                    >
                      Text copied!
                    </span>
                  )}
                  <div className={styles.slug_container}>
                    <p>
                      {`us.lynq.app/${
                        slug === "" && !slug ? "your-slug" : slug
                      }`}
                    </p>
                    <AiOutlineCopy
                      color="#7E88F4"
                      size={23}
                      onClick={() => {
                        navigator.clipboard.writeText(`us.lynq.app/${slug}`);
                        copyStatus();
                      }}
                    />
                  </div>
                  {slugNotAvail && (
                    <p
                      style={{
                        marginTop: "-5px",
                        marginBottom: "12px",
                        marginLeft: "0px",
                        fontSize: "12px",
                        color: "red",
                      }}
                    >
                      Slug not available! Try something else
                    </p>
                  )}
                </div>
                <div>
                  <label>First Name*</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label>Last Name*</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div>
                  <label>City*</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <label>State*</label>
                  <select
                    className={styles.states_select}
                    // type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option>-- Select State --</option>
                    {states.map((state, index) => {
                      return (
                        <option key={index} value={state}>
                          {state}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div style={{ position: "relative" }}>
                  <label>
                    Main Categories* <span>(Choose upto 3)</span>
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
                {/* <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={
                      !allowMsg
                        ? "/img/setup-check-unavailable.svg"
                        : "/img/setup-check-available.svg"
                    }
                    alt=""
                    style={{ cursor: "pointer" }}
                    onClick={toggleAllowMsg}
                  />

                  <span style={{ fontSize: "12px", marginLeft: ".5rem" }}>
                    Allow clients to send you messages
                  </span>
                </div> */}
                <h3>About</h3>
                <div>
                  <label>General presentation*</label>
                  <textarea
                    value={generalPres}
                    onChange={(e) => setGeneralPres(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <label>What to expect*</label>
                  <textarea
                    value={whatToExpect}
                    onChange={(e) => setWhatToExpect(e.target.value)}
                  ></textarea>
                </div>
                {/* <div>
                  <label>
                    Specialities{" "}
                    <span>(Press enter after each speciality)</span>
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
                </div> */}
                <div className={styles.text_uppercase}>
                  <button type="submit" style={{ position: "relative" }}>
                    {loading && <Loading />}Save Profile
                  </button>
                  {/* <button>Cancel</button> */}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditProfile;
