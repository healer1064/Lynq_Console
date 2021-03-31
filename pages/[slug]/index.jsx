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
import moment from "moment";

const Profile = ({ slug }) => {
  const [activity, setActicity] = useState(null);
  const [bookOrder, setBookOrder] = useState(false);
  const [slots, setSlots] = useState(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState();

  useEffect(() => {
    setStartDate(moment().format("YYYY-MM-DD"));
  }, []);

  console.log("start", startDate);

  useEffect(() => {
    getProfile();
  }, []);
  useEffect(() => {
    if (activity) {
      fetchTimes();
    }
  }, [activity, startDate]);

  const getProfile = async () => {
    let config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
      },
    };

    const response = await fetch(
      `https://api.lynq.app/profile/${slug}`,
      config
    );
    const data = await response.json();

    setData(data);
  };

  const handleActivity = (_activity) => {
    setActicity(_activity);
    // fetchTimes();
  };

  const fetchTimes = () => {
    setSlotsLoading(true);
    const endDate = moment(startDate).add(3, "days").format("YYYY-MM-DD");
    // check avaliblity
    async function check_availabliity() {
      const response = await fetch(
        `https://api.lynq.app/profile/${slug}/availability?start=${startDate}&end=${endDate}&activity_id=${activity.id}`,
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

  const handleNextArrow = () => {
    setStartDate(moment(startDate).add(3, "days").format("YYYY-MM-DD"));
  };
  const handlePrevArrow = () => {
    setStartDate(moment(startDate).add(3, "days").format("YYYY-MM-DD"));
  };

  return (
    <>
      <Head>
        <title>Lynq</title>
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
              data={data.activities.filter((i) => i.isActive == true)}
              slots={slots}
              onHandle={handleActivity}
              loading={slotsLoading}
              handleTime={handleStartTime}
              handleNextArrow={handleNextArrow}
              handlePrevArrow={handlePrevArrow}
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