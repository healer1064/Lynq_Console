// libraries
import React from 'react';
import Grid from "@material-ui/core/Grid";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

// styles
import styles from './styles.module.sass';

// context
import ProfileContext from "@/context/profile";

// components
import { Tabs } from 'antd';
import ImageSelect from "../ImageSelect";
import SlugComp from "../Slug";
import Keywords from "../Keywords";

// requests
import { getLinkReq } from "@/utils/requests/public-profile";
import {
  postProfileReq,
  getSlugCheckReq,
} from "@/utils/requests/public-profile";

const index = ({ payments, toggleResponse, business, profile }) => {
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
    <Grid container spacing={1} className={styles.mypage_profile_wrap}>
      <Grid item xs={12} sm={12} md={8}>        
        <Link href={`/my-page`}>
          <div className={styles.back_btn_div}>
            <img src="/svg/arrow-back.svg" alt="arrow-back"/>
            <p>Profile</p>
          </div>
        </Link>
        <div className={styles.profile_div}>
          <ImageSelect image={image} setImage={setImage} />
          <SlugComp
            slug={slug}
            setSlug={setSlug}
            slugRule={slugRule}
            setSlugRule={setSlugRule}
          />
          <div className={styles.col_div}>
            <label>Name*</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={styles.col_div}>
            <label>Bio</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <Keywords keywords={keywords} setKeywords={setKeywords} />
          <div className={styles.btn_group}>
            <button className={styles.btn1}
              onClick={(e) => onSubmit(e)}
            >
              {loading && <Loading />}Sign up
            </button>
            <button className={styles.btn2}
              onClick={(e) => onSubmit(e)}
            >
              {loading && <Loading />}Cancel
            </button>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={4} className={styles.preview_grid}>
        <p className={styles.title}>Preview</p>
        <div className={styles.preview_div}>
          <div className={styles.phone_div}>

          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default index;
