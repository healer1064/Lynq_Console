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

  console.log('apps', preLoading);
  useEffect(() => {
    console.log('apps', router.query.token);
    if (router.query.token) {
      localStorage.setItem("linqToken", router.query.token);
    }
    setTimeout(() => {
      console.log('apps', 'setTimeout');
      if (
        router.pathname != "/signup-after" &&
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

      console.log('apps', router);
      console.log('apps', localStorage.getItem("linqToken"));
      if (!localStorage.getItem("linqToken")) {
        if (
          router.pathname != "/signup-after" &&
          router.pathname != "/plans" &&
          router.pathname != "/signup" &&
          router.pathname != "/login" &&
          router.pathname != "/forgot-password" &&
          router.pathname != "/terms-and-conditions" &&
          !router.pathname.includes("/reset-password/")
        ) {
          console.log('apps', 'go plans');
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
      console.log('apps', 'return');
      setSidebar(true);
    };
  }, []);

  useEffect(() => {
    console.log('apps', 'TagManager');
    TagManager.initialize({ gtmId: "GTM-K2DPJPZ" });
  }, []);
  alert("apps infinite");
  console.log('apps', preLoading);
  return (
    <ProfileProvider>
      {preLoading ? (
        <div>
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
