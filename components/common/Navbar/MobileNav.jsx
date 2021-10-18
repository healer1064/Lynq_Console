// libraries
import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Rotate from 'react-reveal/Rotate';
import Fade from 'react-reveal/Fade';

// styles
import styles from './styles.module.sass';

// profile
import ProfileContext from '@/context/profile';

// icons
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const MobileNav = ({
  setOpen,
  calls,
  setCalls,
  messages,
  setMessages,
  payment,
  setPayment,
  settings,
  setSettings,
  logout,
  plugins,
  setPlugins,
}) => {
  // router
  const router = useRouter();

  // context
  const { slugData } = useContext(ProfileContext);

  return (
    <div className={styles.mobile_nav}>
      <div className={styles.mobile_nav_close}>
        <Rotate>
          <img
            onClick={() => setOpen(false)}
            src='/img/public-screen-close.svg'
            alt='nav-close'
          />
        </Rotate>
      </div>
      <Fade duration={1000}>
        <div className={styles.mobile_nav_main_link}>
          <Link href='/'>
            <a
              onClick={() => setOpen(false)}
              className={router.pathname === '/' ? styles.active : ''}
            >
              <span>Home</span>
            </a>
          </Link>
          <Link href='/public-profile'>
            <a
              onClick={() => setOpen(false)}
              className={
                router.pathname === '/public-profile' ? styles.active : ''
              }
            >
              <span>Public Profile</span>
            </a>
          </Link>
          <a onClick={() => setPlugins((prevState) => !prevState)}>
            <span style={{ paddingRight: '15px' }}>Plug-ins</span>
            {plugins ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
          </a>
          {plugins && (
            <div className={styles.sub_links}>
              <Link href='/calls/requests'>
                <span
                  onClick={() => setOpen(false)}
                  className={
                    router.pathname === '/calls/requests' ? styles.active : ''
                  }
                >
                  1-1 video call
                </span>
              </Link>
              <Link href='/masterclass'>
                <a
                  onClick={() => setOpen(false)}
                  className={
                    router.pathname === '/masterclass' ? styles.active : ''
                  }
                >
                  <span>Live webinar</span>
                </a>
              </Link>
              <Link href='/messages/conversations'>
                <span
                  onClick={() => setOpen(false)}
                  className={
                    router.pathname === '/messages/conversations'
                      ? styles.active
                      : ''
                  }
                >
                  Video message
                </span>
              </Link>
              <Link href='/pay-per-download'>
                <a
                  onClick={() => setOpen(false)}
                  className={
                    router.pathname === '/pay-per-download' ? styles.active : ''
                  }
                >
                  <span>On-demand content</span>
                </a>
              </Link>
              <Link href='/affiliate-marketing'>
                <a
                  onClick={() => setOpen(false)}
                  className={
                    router.pathname === '/affiliate-marketing'
                      ? styles.active
                      : ''
                  }
                >
                  <span>My recommendations</span>
                </a>
              </Link>
            </div>
          )}
          {/* <a onClick={() => setMessages(!messages)}>
            <span style={{ paddingRight: '15px' }}>Video Messages</span>
            {messages ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
          </a>
          {messages && (
            <div className={styles.sub_links}>
              <Link href='/messages/template'>
                <span
                  onClick={() => setOpen(false)}
                  className={
                    router.pathname === '/messages/template'
                      ? styles.active
                      : ''
                  }
                >
                  Template
                </span>
              </Link> */}
          {/* </div>
          )} */}
          {/* {slugData && slugData?.slug && slugData.slug === 'lb' && ( */}
          {/*  )} */}

          {/* <Link href='/support'>
            <a
              onClick={() => setOpen(false)}
              className={router.pathname === '/support' ? styles.active : ''}
            >
              <span>Support</span>
            </a>
          </Link> */}
          {/* <a onClick={() => setPayment(!payment)}>
            <span style={{ paddingRight: "15px" }}>Payment</span>
            {payment ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
          </a> */}
          {/* {payment && (
            <div className={styles.sub_links}> */}
          <Link href='/dashboard'>
            <a
              onClick={() => setOpen(false)}
              className={router.pathname === '/dashboard' ? styles.active : ''}
            >
              <span>Reports</span>
            </a>
          </Link>
          <Link href='/payment/balance'>
            <a
              onClick={() => setOpen(false)}
              className={
                router.pathname === '/payment/balance' ? styles.active : ''
              }
            >
              <span>Finance</span>
            </a>
            {/* <span
                  onClick={() => setOpen(false)}
                  className={
                    router.pathname === "/payment/balance" ? styles.active : ""
                  }
                >
                  Balance
                </span> */}
          </Link>
          {/* <Link href='/payment/details'>
                <span
                  onClick={() => setOpen(false)}
                  className={
                    router.pathname === "/payment/details" ? styles.active : ""
                  }
                >
                  Details
                </span>
              </Link>
            </div>
          )} */}

          {/* <a onClick={() => setSettings(!settings)}>
            <span style={{ paddingRight: '15px' }}>Settings</span>
            {settings ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
          </a>
          {settings && (
            <div className={styles.sub_links}>
              <Link href='/settings/availabilities'>
                <span
                  onClick={() => setOpen(false)}
                  className={
                    router.pathname === '/settings/availabilities'
                      ? styles.active
                      : ''
                  }
                >
                  Availabilities
                </span>
              </Link>
              <Link href='/settings/calendar'>
                <span
                  onClick={() => setOpen(false)}
                  className={
                    router.pathname === '/settings/calendar'
                      ? styles.active
                      : ''
                  }
                >
                  Cal Sync
                </span>
              </Link>
            </div>
          )} */}
        </div>
        <div className={styles.mobile_nav_other_link}>
          <Link href='/account'>
            <a
              onClick={() => setOpen(false)}
              className={router.pathname === '/account' ? styles.active : ''}
            >
              <span>Account</span>
            </a>
          </Link>
          <a onClick={logout}>
            <span>Log Out</span>
          </a>
        </div>
      </Fade>
    </div>
  );
};

export default MobileNav;
