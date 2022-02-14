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
        <Link href='/my-page'>
          <a
            className={
              router.pathname === '/my-page' ? styles.active : ''
            }
          >
            <img src='/svg/insert_emoticon_white.svg' alt="analytics"/>
            <span>My page</span>
          </a>
        </Link>
        
        <Link href='/dashboard'>
          <a className={router.pathname === '/dashboard' ? styles.active : ''}>
            {/* <FaChartLine
              color='white'
              style={{ marginRight: "8px" }}
              size={17}
            /> */}
            <img src='/svg/analytics_white.svg' alt="analytics"/>
            <span>Analytics</span>
          </a>
        </Link>
        <Link href='/payment/balance'>
          <a
            className={
              router.pathname === '/payment/balance' ? styles.active : ''
            }
          >
            <img src='/svg/attach_money_white.svg' alt="income"/>
            <span>Earning</span>
          </a>
          {/* <p
            className={
              router.pathname === "/payment/balance" ? styles.active : ""
            }
          >
            Balance
          </p> */}
        </Link>
        <Link href='/client'>
          <a
            className={
              router.pathname === '/client' ? styles.active : ''
            }
          >
            <img src='/svg/person_white.svg' alt="client"/>
            <span>Client</span>
          </a>
        </Link>
        <Link href='/auto-optimization'>
          <a
            className={
              router.pathname === '/auto-optimization' ? styles.active : ''
            }
          >
            <img src='/svg/broken_image_white.svg' alt="auto_pilot"/>
            <span>Auto pilot</span>
          </a>
        </Link>
        <Link href='/account'>
          <a
            className={
              router.pathname === '/account' ? styles.active : ''
            }
          >
            <img src='/svg/settings_white.svg' alt="setting"/>
            <span>Setting</span>
          </a>
        </Link>
        {/* <Link href='/'>
          <a className={router.pathname === '/' ? styles.active : ''}>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="home" className={`svg-inline--fa fa-home fa-w-18 ${styles.smallIcon}`} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"></path></svg>
            <span>Home</span>
          </a>
        </Link>
        <Link href='/public-profile'>
          <a
            className={
              router.pathname === '/public-profile' ? styles.active : ''
            }
          >
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className={`svg-inline--fa fa-user fa-w-14 ${styles.smallIcon}`} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
            <span>Public Profile</span>
          </a>
        </Link>
        <a onClick={() => setPlugins((prevState) => !prevState)}>
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-square" className={`svg-inline--fa fa-plus-square fa-w-14 ${styles.smallIcon}`} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-32 252c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92H92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path></svg>
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
                <span className={styles.subMenu}>Live private session</span>
              </a>
            </Link>

            <Link href='/masterclass'>
              <a
                className={
                  router.pathname === '/masterclass' ? styles.active : ''
                }
              >
                <span className={styles.subMenu}>Live webinar</span>
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
                <span className={styles.subMenu}>Personalized request</span>
              </a>
            </Link>
            <Link href='/pay-per-download'>
              <a
                className={
                  router.pathname === '/pay-per-download' ? styles.active : ''
                }
              >
                <span className={styles.subMenu}>Exclusive content</span>
              </a>
            </Link>
            <Link href='/affiliate-marketing'>
              <a
                className={
                  router.pathname === '/affiliate-marketing'
                    ? styles.active
                    : ''
                }
              >
                <span className={styles.subMenu}>Affiliation product</span>
              </a>
            </Link>
          </>
        )} */}
      </nav>

      {/* <Link href='/account'>
        <div className={styles.profile}>
          <span>Setting</span>
        </div>
      </Link> */}
    </div>
  );
};

export default Leftbar;
