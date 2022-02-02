// libraries
import { useState, useEffect } from "react";

// styles
import styles from "./styles.module.sass";

// icons
import { AiOutlineCopy } from "react-icons/ai";

const index = ({ slug, setSlug, slugRule, setSlugRule }) => {
  // states
  const [slugCopy, setSlugCopy] = useState(false);

  // check slug format
  useEffect(() => {
    if (/[^a-zA-Z0-9\.]/.test(slug)) {
      setSlugRule(true);
    } else {
      setSlugRule(false);
    }
  }, [slug]);

  // copy slug to clipboard
  const copyStatus = () => {
    setSlugCopy(true);
    setTimeout(() => {
      setSlugCopy(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      setSlugCopy(false);
    };
  }, []);

  return (
    <>
      <div>
        <label>Pick up your domain name</label>
        <input
          type='text'
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder='lynq.app/'
        />
      </div>
      {slugRule && (
        <p className={styles.slug_rule}>
          Please use only Alphanumeric characters and dot!
        </p>
      )}
      {/* <div>
        <label style={{ color: "#7E88F4" }}>
          Here is how your public Lynq url will look like
        </label>{" "}
        {slugCopy && (
          <span
            style={{
              marginBottom: "12px",
              marginLeft: "20px",
              fontSize: "11px",
              color: "#aaa",
            }}
          >
            Text copied!
          </span>
        )}
        <div className={styles.slug_container}>
          <p>{`lynq.app/${slug === "" && !slug ? "your-slug" : slug}`}</p>
          <AiOutlineCopy
            color='#7E88F4'
            size={23}
            onClick={() => {
              navigator.clipboard.writeText(`lynq.app/${slug}`);
              copyStatus();
            }}
          />
        </div>
      </div> */}
    </>
  );
};

export default index;
