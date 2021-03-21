import { useState } from "react";

// libraries
import Head from "next/head";
import useSWR from "swr";

// styles
import styles from "../../styles/PublicScreen.module.sass";

// components
import Navbar from "../../components/PublicScreen/PublicScreenNavbar";
import PublicScreenLeftbar from "../../components/PublicScreen/PublicScreenLeftbar";
import PublicScreenRightbar from "../../components/PublicScreen/PublicScreenRightbar";
import PublicScreen3Rightbar from "../../components/PublicScreen3/PublicScreen3Rightbar";

// utils
import fetcher from "../../utils/fetcher";

const Profile = ({ slug }) => {
  const [activity, setActicity] = useState(null);
  const [bookOrder, setBookOrder] = useState(false);
  const [slots, setSlots] = useState(null);
  const [slotsLoading, setSlotsLoading] = useState(false);

  const { data, error } = useSWR(["/api/profile/profile", slug], fetcher);

  // const { data: bookReq, error: bookErr } = useSWR(
  //   bookOrder
  //     ? [
  //         "/api/profile/request",
  //         JSON.stringify({
  //           slug: slug,
  //           params: {
  //             activity_id: "string",
  //             start_date: "string",
  //             first_name: "string",
  //             last_name: "string",
  //             email: "string",
  //           },
  //         }),
  //       ]
  //     : null,
  //   fetcher
  // );

  const handleActivity = (_activity) => {
    setActicity(_activity);
    setSlotsLoading(true);

    // check avaliblity
    async function check_availabliity() {
      const response = await fetch("/api/profile/profile-availability", {
        headers: new Headers({
          data: JSON.stringify({ id: _activity.id, slug: slug }),
        }),
      });

      return await response.json();
    }

    check_availabliity()
      .then((res) => {
        console.log("avaialble", res);
        setSlots(res);
        setSlotsLoading(false);
      })
      .catch((err) => {
        console.log("availablity error", err);
        setSlotsLoading(false);
      });
  };

  const handleStartTime = (_time) => {
    console.log("start time", _time);
  };

  const handleBook = (flag) => {
    setBookOrder(flag);
  };

  const confirmOrder = (_userData) => {
    console.log("user", _userData);
  };

  if (!data) {
    return <h1>Loading...</h1>;
  }

  console.log(data);

  return (
    <>
      <Head>
        <title>Public Screen</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <div className={styles.public_screen}>
        <PublicScreenLeftbar profile={data.profile} />
        {!bookOrder ? (
          <PublicScreenRightbar
            activity={activity}
            data={data.activities}
            slots={slots}
            onHandle={handleActivity}
            onBook={handleBook}
            loading={slotsLoading}
            handleTime={handleStartTime}
          />
        ) : (
          <PublicScreen3Rightbar onHandle={confirmOrder} />
        )}
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const slug = context.params.slug;
  return { props: { slug } };
};

export default Profile;
