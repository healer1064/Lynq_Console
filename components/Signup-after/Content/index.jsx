// libraries
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import Dropzone from 'react-dropzone'

// utils
import { sortBy } from "lodash";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// requests
import { getLinkReq } from "@/utils/requests/public-profile";
import {
  postProfileReq,
  getSlugCheckReq,
} from "@/utils/requests/public-profile";

// components
import { Tabs } from "antd";
import ImageSelect from "../ImageSelect";
import SlugComp from "../Slug";
import Keywords from "../Keywords";
import Charity from "../Charity";
import ExternalLinks from "../ExternalLinks";
import Loading from "@/components/common/Loading";

const index = ({ profile }) => {
  // context
  const { token, setSlugData } = useContext(ProfileContext);

  // states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [slug, setSlug] = useState("");
  const [desc, setDesc] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [externalLinks, setExternalLinks] = useState([]);
  const [newSlug, setNewSlug] = useState("");
  const [image, setImage] = useState(null);
  const [charity, setCharity] = useState(false);
  const [charityName, setCharityName] = useState("");
  const [slugRule, setSlugRule] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);

  // tabs pane
  const { TabPane } = Tabs;

  useEffect(() => {
    if (profile) {
      setSlug(profile.slug || "");
      setNewSlug(profile.slug || "");
      setFirstName(profile.name?.split(" ")[0] ?? "");
      setLastName(profile.name?.split(" ")[1] ?? "");
      setImage(profile.public_image || null);
      setDesc(profile.bio ? profile.bio : "");
      setKeywords(profile.tags);
      setCharity(profile.charity ? profile.charity : "");
      setCharityName(profile.charity_name ? profile.charity_name : "");
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
      lastName === "" ||
      (keywords.length === 1 && keywords[0] === "")
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
      delay_booking_hours: profile?.delay_booking_hours
        ? profile?.delay_booking_hours
        : 0,
      timezone: profile.timezone ? profile.timezone : "",
      bio: desc,
      tags: keywords,
      active_message: profile?.active_message,
      active_private_session: profile?.active_private_session,
      active_masterclass: true,
      charity,
      charity_name: charityName,
      oneonone_bio: profile.oneonone_bio,
    };
    postProfileReq(token, reqData)
      .then((res) => {
        setLoading(false);
        if (res.status) {
          toast.error("Failed to update the profile.");
        } else {
          setSlugData(res);
          toast.success("Profile updated successfully.");
        }
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

  useEffect(() => {
    if (token) {
      getLinkReq(token)
        .then((res) => {
          const finalResult = sortBy(res, (item) => item.position);

          setExternalLinks(finalResult);
        })
        .catch((e) => {
          toast.error("An error has occurred.");

          console.log("[Error while getLinkReq]: ", e);
        });
    }
  }, [token, refetch]);

  const refetchData = () => {
    setRefetch((prevState) => !prevState);
  };

  return (
    <>
      <a
        onClick={() =>
          router.push('/')
        }
      >
        <img src='/img/lynq-logo.png' className={styles.profile_header_logo} alt='' />
      </a>
      <div className={styles.signup_edit_profile}>
        <h2>Set up your public profile</h2>
        <SlugComp
          slug={slug}
          setSlug={setSlug}
          slugRule={slugRule}
          setSlugRule={setSlugRule}
        />
        <div>
          <label>Name*</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        {/* <ImageSelect image={image} setImage={setImage} /> */}
        <div className={styles.dropzone_div}>
          <label>Picture or logo*</label>
          <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
              <section className={styles.dropzone_section}>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className={styles.dropzone_img_div}>
                    <img src="/img/upload.svg"/>
                    <p> Drag & drop your files here or <a>browse</a> </p>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div>
          <label>Bio</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <Keywords keywords={keywords} setKeywords={setKeywords} />
        <div className={styles.text_uppercase}>
          <button
            onClick={(e) => onSubmit(e)}
          >
            {loading && <Loading />}Sign up
          </button>
        </div>
        <div className={styles.return_to_login}>
          <span>Already have an account?</span>
          <a>Log in</a>
        </div>
      </div>
    </>
  );
};

export default index;
