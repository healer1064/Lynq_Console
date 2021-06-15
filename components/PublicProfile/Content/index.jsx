// libraries
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// requests
import {
  postProfileReq,
  getSlugCheckReq,
} from "@/utils/requests/public-profile";

// components
import ImageSelect from "../ImageSelect";
import SlugComp from "../Slug";
import Keywords from "../Keywords";
import Loading from "@/components/common/Loading";

const index = ({ profile }) => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [slug, setSlug] = useState("");
  const [keywords, setKeywords] = useState(
    "mother of dragon, queen of seven kingdoms"
  );
  const [newSlug, setNewSlug] = useState("");
  const [image, setImage] = useState(null);
  const [slugRule, setSlugRule] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setSlug(profile.slug || "");
      setNewSlug(profile.slug || "");
      setFirstName(profile.name?.split(" ")[0] ?? "");
      setLastName(profile.name?.split(" ")[1] ?? "");
      setImage(profile.public_image || null);
    }
  }, [profile]);

  // handle sumbit
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      slug === "" ||
      !slug ||
      slugRule ||
      firstName === "" ||
      lastName === ""
    ) {
      toast.info("Please fill all required fields!");
    } else {
      setLoading(true);
      if (slug === newSlug) {
        updateProfile();
      } else {
        checkSlug(slug);
      }
    }
  };

  const updateProfile = () => {
    const reqData = {
      slug,
      name: `${firstName} ${lastName}`,
      public_image: image,
      delay_booking_hours: profile.delay_booking_hours
        ? profile.delay_booking_hours
        : 0,
      timezone: profile.timezone ? profile.timezone : "",
    };
    postProfileReq(token, reqData)
      .then(() => {
        setLoading(false);
        toast.success("Profile updated successfully.");
      })
      .catch(() => {
        setLoading(false);
        toast.error("Failed to update profile.");
      });
  };

  const checkSlug = (_slug) => {
    getSlugCheckReq(_slug)
      .then((res) => {
        setLoading(false);
        if (res.is_available) {
          updateProfile();
        } else {
          toast.error("Slug not available!");
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          return;
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error("Failed to check slug availability.");
      });
  };

  return (
    <div className={styles.edit_profile}>
      <h3>Public Profile</h3>
      <ImageSelect image={image} setImage={setImage} />
      <SlugComp
        slug={slug}
        setSlug={setSlug}
        slugRule={slugRule}
        setSlugRule={setSlugRule}
      />
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
      <Keywords keywords={keywords} setKeywords={setKeywords} />
      <div className={styles.text_uppercase}>
        <button onClick={(e) => onSubmit(e)} style={{ position: "relative" }}>
          {loading && <Loading />}Save Profile
        </button>
      </div>
    </div>
  );
};

export default index;