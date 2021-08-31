// libraries
import React from "react";
import { useRouter } from "next/router";

// styles
import styles from "./styles.module.sass";

// icons
import { BsChevronLeft } from "react-icons/bs";

// components
import Form from "../Form";
import DropArea from "../DropArea";

const index = () => {
  // router
  const router = useRouter();

  return (
    <div className={styles.content}>
      <a className={styles.back} onClick={() => router.back()}>
        <BsChevronLeft /> Back
      </a>
      <h2>You can sell the content of your choice</h2>
      <p>Video, pictures and documents are allowed.</p>
      <div className={styles.sections}>
        <Form />
        <DropArea />
      </div>
    </div>
  );
};

export default index;
