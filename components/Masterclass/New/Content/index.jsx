// libraries
import React from "react";
import { useRouter } from "next/router";

// styles
import styles from "./styles.module.sass";

// icons
import { BsChevronLeft } from "react-icons/bs";

// components
import Form from "../Form";

const index = () => {
  // router
  const router = useRouter();

  return (
    <div className={styles.content}>
      <a className={styles.back} onClick={() => router.back()}>
        <BsChevronLeft /> Back
      </a>
      <h2>New Masterclass</h2>
      <Form />
    </div>
  );
};

export default index;
