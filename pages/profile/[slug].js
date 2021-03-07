// libraries
import Head from "next/head";
import useSWR from "swr";

// styles
import styles from "../../styles/PublicScreen.module.sass";

// components
import Navbar from "../../components/Navbar";
import PublicScreenLeftbar from "../../components/PublicScreen/PublicScreenLeftbar";
import PublicScreenRightbar from "../../components/PublicScreen/PublicScreenRightbar";

// utils
import fetcher from "../../utils/fetcher";

const Profile = ({ slug }) => {
  const { data, error } = useSWR(["/api/profile", slug], fetcher);

  if (!data) {
    return <h1>Loading...</h1>;
  }

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
        <PublicScreenRightbar data={data.activities} />
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const slug = context.params.slug;
  return { props: { slug } };
};

export default Profile;
