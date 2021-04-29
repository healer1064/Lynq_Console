// libraries
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      if (
        router.pathname != "/plans" &&
        router.pathname != "/signup" &&
        router.pathname != "/login" &&
        router.pathname != "/forgot-password" &&
        router.pathname != "/terms-and-conditions" &&
        !router.pathname.includes("/reset-password/")
      )
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
        <>
          <ToastContainer />
          <Component {...pageProps} />
        </>
      )}
    </ProfileProvider>
  );
}

export default MyApp;
