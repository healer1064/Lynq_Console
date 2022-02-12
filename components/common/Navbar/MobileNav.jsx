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
          <Link href='/my-page'>
            <a
              onClick={() => setOpen(false)}
              className={
                router.pathname === '/my-page' ? styles.active : ''
              }
            >
              <span>My page</span>
            </a>
          </Link>
          <Link href='/dashboard'>
            <a
              onClick={() => setOpen(false)}
              className={router.pathname === '/dashboard' ? styles.active : ''}
            >
              <span>Analytics</span>
            </a>
          </Link>
          <Link href='/payment/balance'>
            <a
              onClick={() => setOpen(false)}
              className={
                router.pathname === '/payment/balance' ? styles.active : ''
              }
            >
              <span>Earning</span>
            </a>
          </Link>
          <Link href='/client'>
            <a
              onClick={() => setOpen(false)}
              className={router.pathname === '/client' ? styles.active : ''}
            >
              <span>Client</span>
            </a>
          </Link>
          <Link href='/auto-optimization'>
            <a
              onClick={() => setOpen(false)}
              className={router.pathname === '/auto-optimization' ? styles.active : ''}
            >
              <span>Auto pilot</span>
            </a>
          </Link>
          <Link href='/account'>
            <a
              onClick={() => setOpen(false)}
              className={router.pathname === '/account' ? styles.active : ''}
            >
              <span>Setting</span>
            </a>
          </Link>
        </div>
        <div className={styles.mobile_nav_other_link}>
          
          <a onClick={logout}>
            <span>Log Out</span>
          </a>
        </div>
      </Fade>
    </div>
  );
};

export default MobileNav;
