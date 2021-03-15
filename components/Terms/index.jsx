// libs
import Fade from "react-reveal/Fade";

// styles
import styles from "../../styles/Terms&Conditions.module.sass";

// components
import Navbar from "../../components/Navbar";

// icons
import { AiOutlineClose } from "react-icons/ai";

const index = ({ toggle }) => {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <Fade bottom>
        <div className={styles.toc}>
          <div className={styles.icon_wrapper}>
            <AiOutlineClose onClick={toggle} />
          </div>
          <h1>Effective as of March, 2021</h1>
          <h3>LYNQ TERMS OF SERVICE</h3>
          <p>
             These Terms of Service (“Terms”) govern your use of the Lynq
            service (the “Service” or “Lynq”) provided by Lynq Corp(the
            “Company”) and constitute a contract between you and the Company.
            These terms govern your access to and use of Lynq, and any content
            (video, sound, text, graphics, or other materials sent, received,
            stored or otherwise appearing in the Service,
          </p>
          <span>xxxxxxxx</span>
          <span>xxx</span>
          <span>xxxxxx</span>
        </div>
      </Fade>
    </div>
  );
};

export default index;
