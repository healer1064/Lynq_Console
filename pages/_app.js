// libraries
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// styles
import "../styles/main.sass";

// context provider
import { ProfileProvider } from "../context/profile";

// components
import PageLoading from "../components/common/PageLoading";

function MyApp({ Component, pageProps }) {
  // states
  const [preLoading, setPreLoading] = useState(true);

  // router
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("linqToken")) {
      router.push("/plans");
      setPreLoading(false);
    } else {
      setPreLoading(false);
    }
  }, []);

  return (
    <ProfileProvider>
      {preLoading ? (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            position: "fixed",
            left: "0",
            top: "0",
            right: "0",
            bottom: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PageLoading />
        </div>
      ) : (
        <Component {...pageProps} />
      )}
    </ProfileProvider>
  );
}

export default MyApp;
