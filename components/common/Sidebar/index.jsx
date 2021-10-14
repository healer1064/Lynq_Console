// libraries
import { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// styles
import styles from './styles.module.sass';

// context
import ProfileContext from '@/context/profile';

// icons
import { BsCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs';
// import { FaChartLine, FaCartArrowDown } from 'react-icons/fa';
import { MdPhoneIphone } from 'react-icons/md';
// import { IoIosChatbubbles } from 'react-icons/io';

const Leftbar = () => {
  // state
  const [calls, setCalls] = useState(false);
  const [plugins, setPlugins] = useState(false);
  // const [messages, setMessages] = useState(false);
  // const [payments, setPayments] = useState(false);
  // const [settings, setSettings] = useState(false);

  // context
  const { slugData } = useContext(ProfileContext);

  // router
  const router = useRouter();

  return (
    <div className={styles.side_nav}>
      <nav>
        <Link href='/'>
          <a className={router.pathname === '/' ? styles.active : ''}>
            {/* <img src='/img/nav-home.svg' alt='' /> */}
            <span>Home</span>
          </a>
        </Link>
        <Link href='/public-profile'>
          <a
            className={
              router.pathname === '/public-profile' ? styles.active : ''
            }
          >
            {/* <img src='/img/nav-profile.svg' alt='' /> */}
            <span>Public Profile</span>
          </a>
        </Link>
        <a onClick={() => setPlugins((prevState) => !prevState)}>
          {/* <MdPhoneIphone /> */}
          <span>Plug-ins</span>
          {plugins ? (
            <BsFillCaretUpFill className={styles.open_close_icon} />
          ) : (
            <BsCaretDownFill className={styles.open_close_icon} />
          )}
        </a>
        {plugins && (
          <>
            <Link href='/calls/requests'>
              <a
                className={
                  router.pathname === '/calls/requests' ? styles.active : ''
                }
              >
                <span>1-1 video call</span>
              </a>
            </Link>

            <Link href='/masterclass'>
              <a
                className={
                  router.pathname === '/masterclass' ? styles.active : ''
                }
              >
                <span>Live webinar</span>
              </a>
            </Link>

            <Link href='/messages/conversations'>
              <a
                className={
                  router.pathname === '/messages/conversations'
                    ? styles.active
                    : ''
                }
              >
                <span>Video message</span>
              </a>
            </Link>
            <Link href='/pay-per-download'>
              <a
                className={
                  router.pathname === '/pay-per-download' ? styles.active : ''
                }
              >
                <span>On-demand content</span>
              </a>
            </Link>
          </>
        )}
        <Link href='/dashboard'>
          <a className={router.pathname === '/dashboard' ? styles.active : ''}>
            {/* <FaChartLine
              color='white'
              style={{ marginRight: "8px" }}
              size={17}
            /> */}
            <span>Reports</span>
          </a>
        </Link>
        <Link href='/payment/balance'>
          <a
            className={
              router.pathname === '/payment/balance' ? styles.active : ''
            }
          >
            {/* <img src='/img/nav-payments.svg' alt='' /> */}
            <span>Finance</span>
          </a>
          {/* <p
            className={
              router.pathname === "/payment/balance" ? styles.active : ""
            }
          >
            Balance
          </p> */}
        </Link>
      </nav>

      <Link href='/account'>
        <div className={styles.profile}>
          <span>Account</span>
        </div>
      </Link>
    </div>
  );
};

export default Leftbar;
