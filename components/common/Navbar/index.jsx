// libraries
import Link from "next/link";
import { useState } from "react";

// styles
import styles from "./styles.module.sass";

// components
import MobileNav from "./MobileNav";

const Navbar = ({ flag }) => {
  // states
  const [open, setOpen] = useState(false);
  const [calls, setCalls] = useState(false);
  const [messages, setMessages] = useState(false);
  const [payment, setPayment] = useState(false);
  const [settings, setSettings] = useState(false);

  // handle logout
  const logout = () => {
    localStorage.removeItem("linqToken");
    window.location.href = "/login";
  };

  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.header_logo}>
            <img src="/img/lynq-logo.png" alt="" />
          </a>
        </Link>
        {flag == "404" ? null : (
          <div onClick={logout} className={styles.logout}>
            <img src="/img/logout.svg" alt="logout" />
            <p>Logout</p>
          </div>
        )}
        {flag == "404" ? null : (
          <div className={styles.burger_menu} onClick={() => setOpen(true)}>
            <img src="/img/burger-menu.svg" alt="" />
          </div>
        )}
      </header>
      {open && (
        <MobileNav
          setOpen={setOpen}
          calls={calls}
          setCalls={setCalls}
          messages={messages}
          setMessages={setMessages}
          payment={payment}
          setPayment={setPayment}
          settings={settings}
          setSettings={setSettings}
          logout={logout}
        />
      )}
    </>
  );
};

export default Navbar;
