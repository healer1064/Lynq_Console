// libraries
import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// icons
import { BsCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { FaChartLine, FaCartArrowDown } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { IoIosChatbubbles } from "react-icons/io";

const Leftbar = () => {
  // state
  const [calls, setCalls] = useState(false);
  const [messages, setMessages] = useState(false);
  // const [payments, setPayments] = useState(false);
  const [settings, setSettings] = useState(false);

  // context
  const { slugData } = useContext(ProfileContext);

  // router
  const router = useRouter();

  return (
    <div className={styles.side_nav}>
      <nav>
        <Link href='/'>
          <a className={router.pathname === "/" ? styles.active : ""}>
            <img src='/img/nav-home.svg' alt='' />
            <span>Home</span>
          </a>
        </Link>
        <a onClick={() => setCalls(!calls)}>
          <MdPhoneIphone />
          <span>1:1 Video Calls</span>
          {calls ? (
            <BsFillCaretUpFill className={styles.open_close_icon} />
          ) : (
            <BsCaretDownFill className={styles.open_close_icon} />
          )}
        </a>
        {calls && (
          <div className={styles.nav_sub_links}>
            <Link href='/calls/template'>
              <p
                className={
                  router.pathname === "/calls/template" ? styles.active : ""
                }
              >
                Template
              </p>
            </Link>
            <Link href='/calls/requests'>
              <p
                className={
                  router.pathname === "/calls/requests" ? styles.active : ""
                }
              >
                Requests
              </p>
            </Link>
          </div>
        )}
        <Link href='/masterclass'>
          <a
            className={router.pathname === "/masterclass" ? styles.active : ""}
          >
            <img src='/img/sidenav-masterclass.svg' alt='' />
            <span>Live Masterclasses</span>
          </a>
        </Link>
        <a onClick={() => setMessages(!messages)}>
          <IoIosChatbubbles />
          <span>Video Messages</span>
          {messages ? (
            <BsFillCaretUpFill className={styles.open_close_icon} />
          ) : (
            <BsCaretDownFill className={styles.open_close_icon} />
          )}
        </a>
        {messages && (
          <div className={styles.nav_sub_links}>
            <Link href='/messages/template'>
              <p
                className={
                  router.pathname === "/messages/template" ? styles.active : ""
                }
              >
                Template
              </p>
            </Link>
            <Link href='/messages/conversations'>
              <p
                className={
                  router.pathname === "/messages/conversations"
                    ? styles.active
                    : ""
                }
              >
                Conversations
              </p>
            </Link>
          </div>
        )}
        {slugData && slugData?.slug && slugData.slug === "lb" && (
          <Link href='/pay-per-download'>
            <a
              className={
                router.pathname === "/pay-per-download" ? styles.active : ""
              }
            >
              {/* <FaCartArrowDown /> */}
              <span>On-demand content</span>
            </a>
          </Link>
        )}
        <Link href='/public-profile'>
          <a
            className={
              router.pathname === "/public-profile" ? styles.active : ""
            }
          >
            <img src='/img/nav-profile.svg' alt='' />
            <span>Public Profile</span>
          </a>
        </Link>
      </nav>
      <nav>
        <a onClick={() => setSettings(!settings)}>
          <img src='/img/nav-settings.svg' alt='' />
          <span>Settings</span>
          {settings ? (
            <BsFillCaretUpFill className={styles.open_close_icon} />
          ) : (
            <BsCaretDownFill className={styles.open_close_icon} />
          )}
        </a>
        {settings && (
          <div className={styles.nav_sub_links}>
            <Link href='/settings/availabilities'>
              <p
                className={
                  router.pathname === "/settings/availabilities"
                    ? styles.active
                    : ""
                }
              >
                Availabilities
              </p>
            </Link>
            <Link href='/settings/calendar'>
              <p
                className={
                  router.pathname === "/settings/calendar" ? styles.active : ""
                }
              >
                Cal Sync
              </p>
            </Link>
          </div>
        )}
        <Link href='/dashboard'>
          <a className={router.pathname === "/dashboard" ? styles.active : ""}>
            {/* <FaChartLine
              color='white'
              style={{ marginRight: "8px" }}
              size={17}
            /> */}
            <span>Reports</span>
          </a>
        </Link>
        {/* <a onClick={() => setPayments(!payments)}>
          <img src='/img/nav-payments.svg' alt='' />
          <span>Payment</span>
          {payments ? (
            <BsFillCaretUpFill className={styles.open_close_icon} />
          ) : (
            <BsCaretDownFill className={styles.open_close_icon} />
          )}
        </a>
        {payments && (
          <div className={styles.nav_sub_links}> */}
        <Link href='/payment/balance'>
          <a
            className={
              router.pathname === "/payment/balance" ? styles.active : ""
            }
          >
            <img src='/img/nav-payments.svg' alt='' />
            <span>Payment</span>
          </a>
          {/* <p
            className={
              router.pathname === "/payment/balance" ? styles.active : ""
            }
          >
            Balance
          </p> */}
        </Link>
        {/* <Link href='/payment/details'>
              <p
                className={
                  router.pathname === "/payment/details" ? styles.active : ""
                }
              >
                Details
              </p>
            </Link>
          </div>
        )} */}
      </nav>
      <nav>
        <Link href='/support'>
          <a className={router.pathname === "/support" ? styles.active : ""}>
            <img src='/img/nav-contact.svg' alt='' />
            <span>Support</span>
          </a>
        </Link>
      </nav>
      <Link href='/account'>
        <div className={styles.profile}>
          {/* <div className={styles.profile_pic}>
            <img
              src={slugData?.public_image ?? "/img/profile-pic.png"}
              alt=''
            />
          </div> */}
          <span>Account</span>
        </div>
      </Link>
    </div>
  );
};

export default Leftbar;
