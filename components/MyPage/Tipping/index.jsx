// libraries
import React from 'react';
import Grid from "@material-ui/core/Grid";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { Switch } from "@material-ui/core";
// styles
import styles from './styles.module.sass';

// context
import ProfileContext from "@/context/profile";

// components
import { Tabs } from 'antd';
import Tippings from "../Tippings";

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
  const [description, setDescription] = useState("");
  const [tippings, setTippings] = useState([]);
  const [externalLinks, setExternalLinks] = useState([]);
  const [newSlug, setNewSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [state, setState] = useState(false);

  const handleChange = event => {
    setState(event.target.checked);
  };
  // tabs pane
  const { TabPane } = Tabs;

  useEffect(() => {
    if (profile) {
      setFirstName(profile.name?.split(" ")[0] ?? "");
      setLastName(profile.name?.split(" ")[1] ?? "");
      setTippings(profile.tags);
    }
  }, [profile]);

  // handle sumbit
  const onSubmit = (e) => {
    e.preventDefault();
    if (
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
    <Grid container spacing={1} className={styles.tipping_page_wrap}>
      <Grid item xs={12} sm={12} md={8}>        
        <Link href={`/my-page`}>
          <div className={styles.back_btn_div}>
            <img src="/svg/arrow-back.svg" alt="arrow-back"/>
            <p>Tipping</p>
          </div>
        </Link>
        <div className={styles.profile_div}>
          <Switch
            checked={state}
            onChange={handleChange}
            value={state}
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
          <div className={styles.col_div}>
            <label>Title of the block *</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={styles.col_div}>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <Tippings tippings={tippings} setTippings={setTippings} />
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
