// libraries
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import TagManager from "react-gtm-module";
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import createCache from '@emotion/cache';
import theme from '../utils/theme';
// styles
import "../styles/main.sass";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";

// context provider
import { ProfileProvider } from "../context/profile";

// components
import PageLoading from "@/components/common/PageLoading";
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";

export const cache = createCache({ key: 'css', prepend: true });

function MyApp({ Component, pageProps }) {
  // states
  const [preLoading, setPreLoading] = useState(true);
  const [sidebar, setSidebar] = useState(true);

  // router
  const router = useRouter();

  useEffect(() => {
    if (router.query.token) {
      localStorage.setItem("linqToken", router.query.token);
    }
    setTimeout(() => {
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
    }, 500);

    return () => {
      setSidebar(true);
    };
  }, [router.query?.token]);

  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-K2DPJPZ" });
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
      ) : sidebar ? (
        <div className='main-wrp'>
          <ToastContainer />
          <Navbar />
          <div className='page-wrp'>
            <Sidebar />
            <Component {...pageProps} />
          </div>
        </div>
      ) : (
        <>
          <ToastContainer />
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </>
      )}
    </ProfileProvider>
  );
}

export default MyApp;
