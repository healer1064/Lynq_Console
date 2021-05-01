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
import Navbar from "../components/Navbar";
import Leftbar from "../components/Leftbar";

function MyApp({ Component, pageProps }) {
  // states
  const [preLoading, setPreLoading] = useState(true);
  const [sidebar, setSidebar] = useState(true);

  // router
  const router = useRouter();

  useEffect(() => {
    if (
      router.pathname != "/plans" &&
      router.pathname != "/signup" &&
      router.pathname != "/login" &&
      router.pathname != "/forgot-password" &&
      router.pathname != "/terms-and-conditions" &&
      !router.pathname.includes("/reset-password/") &&
      router.pathname != "/404"
    ) {
      setSidebar(true);
    } else {
      setSidebar(false);
    }
    if (!localStorage.getItem("linqToken")) {
      if (
        router.pathname != "/plans" &&
        router.pathname != "/signup" &&
        router.pathname != "/login" &&
        router.pathname != "/forgot-password" &&
        router.pathname != "/terms-and-conditions" &&
        !router.pathname.includes("/reset-password/")
      ) {
        window.location.href = "/plans";
        setSidebar(true);
      } else {
        setSidebar(false);
      }
      setPreLoading(false);
    } else {
      setPreLoading(false);
    }

    return () => {
      setSidebar(true);
    };
  }, []);

  console.log(sidebar);

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
      ) : sidebar ? (
        <>
          <ToastContainer />
          <Navbar active="" />
          <div className="page-wrp">
            <Leftbar active="" />
            <Component {...pageProps} />
          </div>
        </>
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
