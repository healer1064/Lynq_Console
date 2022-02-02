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
import SocialLinks from "../SocialLinks";

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
  const [socialLinks, setSocialLinks] = useState([{type:0, url:""}]);
  const [externalLinks, setExternalLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);

  // tabs pane
  const { TabPane } = Tabs;

  useEffect(() => {
    if (profile) {
      setSocialLinks(profile.tags);
    }
  }, [profile]);

  // handle sumbit
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      (socialLinks.length === 1 && socialLinks[0].url === "")
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
    <Grid container spacing={1} className={styles.social_link_wrap}>
      <Grid item xs={12} sm={12} md={8}>        
        <Link href={`/my-page`}>
          <div className={styles.back_btn_div}>
            <img src="/svg/arrow-back.svg" alt="arrow-back"/>
            <p>Social links</p>
          </div>
        </Link>
        <div className={styles.profile_div}>
          <SocialLinks socialLinks={socialLinks} setSocialLinks={setSocialLinks} />
          <div className={styles.btn_group}>
            <button className={styles.btn1}
              onClick={(e) => onSubmit(e)}
            >
              {loading && <Loading />}Save
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
