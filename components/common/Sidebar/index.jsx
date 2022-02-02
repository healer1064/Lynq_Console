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
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className={`svg-inline--fa fa-user fa-w-14 ${styles.smallIcon}`} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
            <span>My page</span>
          </a>
        </Link>
        <Link href='/'>
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
        )}
        <Link href='/dashboard'>
          <a className={router.pathname === '/dashboard' ? styles.active : ''}>
            {/* <FaChartLine
              color='white'
              style={{ marginRight: "8px" }}
              size={17}
            /> */}
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chart-bar" className={`svg-inline--fa fa-chart-bar fa-w-16 ${styles.smallIcon}`} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M332.8 320h38.4c6.4 0 12.8-6.4 12.8-12.8V172.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v134.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V76.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v230.4c0 6.4 6.4 12.8 12.8 12.8zm-288 0h38.4c6.4 0 12.8-6.4 12.8-12.8v-70.4c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v70.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V108.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v198.4c0 6.4 6.4 12.8 12.8 12.8zM496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path></svg>
            <span>Analytics</span>
          </a>
        </Link>
        <Link href='/payment/balance'>
          <a
            className={
              router.pathname === '/payment/balance' ? styles.active : ''
            }
          >
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="money-check-alt" className={`svg-inline--fa fa-money-check-alt fa-w-20 ${styles.smallIcon}`} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M608 32H32C14.33 32 0 46.33 0 64v384c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32zM176 327.88V344c0 4.42-3.58 8-8 8h-16c-4.42 0-8-3.58-8-8v-16.29c-11.29-.58-22.27-4.52-31.37-11.35-3.9-2.93-4.1-8.77-.57-12.14l11.75-11.21c2.77-2.64 6.89-2.76 10.13-.73 3.87 2.42 8.26 3.72 12.82 3.72h28.11c6.5 0 11.8-5.92 11.8-13.19 0-5.95-3.61-11.19-8.77-12.73l-45-13.5c-18.59-5.58-31.58-23.42-31.58-43.39 0-24.52 19.05-44.44 42.67-45.07V152c0-4.42 3.58-8 8-8h16c4.42 0 8 3.58 8 8v16.29c11.29.58 22.27 4.51 31.37 11.35 3.9 2.93 4.1 8.77.57 12.14l-11.75 11.21c-2.77 2.64-6.89 2.76-10.13.73-3.87-2.43-8.26-3.72-12.82-3.72h-28.11c-6.5 0-11.8 5.92-11.8 13.19 0 5.95 3.61 11.19 8.77 12.73l45 13.5c18.59 5.58 31.58 23.42 31.58 43.39 0 24.53-19.05 44.44-42.67 45.07zM416 312c0 4.42-3.58 8-8 8H296c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h112c4.42 0 8 3.58 8 8v16zm160 0c0 4.42-3.58 8-8 8h-80c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16zm0-96c0 4.42-3.58 8-8 8H296c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h272c4.42 0 8 3.58 8 8v16z"></path></svg>
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
