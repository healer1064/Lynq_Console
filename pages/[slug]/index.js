// libraries
import { useEffect, useState } from "react";
import Head from "next/head";

// styles
import styles from "../../styles/PublicScreen.module.sass";

// components
import PageLoading from "../../components/common/PageLoading";
import Navbar from "../../components/PublicScreen/PublicScreenNavbar";
import PublicScreenProfileInfo from "../../components/PublicScreen/PublicScreenProfileInfo";
import PublicScreenSessions from "../../components/PublicScreen/PublicScreenSessions";
import PublicScreenPersonalInfo from "../../components/PublicScreen/PublicScreenPersonalInfo";

const Profile = ({ slug }) => {
  const [activity, setActicity] = useState(null);
  const [bookOrder, setBookOrder] = useState(false);
  const [slots, setSlots] = useState(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    let config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
      },
    };

    const response = await fetch(
      `https://reb00t.uc.r.appspot.com/profile/${slug}`,
      config
    );
    const data = await response.json();

    console.log(data);
    setData(data);
  };

  const handleActivity = (_activity) => {
    setActicity(_activity);
    setSlotsLoading(true);

    const startDate = "10-10-2042";
    const endDate = "10-10-2042";

    // check avaliblity
    async function check_availabliity() {
      const response = await fetch(
        `https://reb00t.uc.r.appspot.com/profile/${slug}/availability?start=${startDate}&end=${endDate}&activity_id=${_activity.id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

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

  const handleStartTime = (_date) => {
    console.log("start date", _date);
    setActicity({ ...activity, start_date: _date });
    setBookOrder(true);
  };

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
      {!data ? (
        <div
          style={{
            width: "100vw",
            height: "calc(100vh - 100px)",
            background: "white",
          }}
        >
          <PageLoading />
        </div>
      ) : (
        <div className={styles.public_screen}>
          <PublicScreenProfileInfo profile={data.profile} />
          {!bookOrder ? (
            <PublicScreenSessions
              activity={activity}
              data={data.activities}
              slots={slots}
              onHandle={handleActivity}
              loading={slotsLoading}
              handleTime={handleStartTime}
            />
          ) : (
            <PublicScreenPersonalInfo slug={slug} activity={activity} />
          )}
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const slug = context.params.slug;
  return { props: { slug } };
};

export default Profile;
