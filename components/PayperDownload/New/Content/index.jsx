// libraries
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// icons
import { BsChevronLeft } from "react-icons/bs";

// requests
import { postMasterclass } from "@/utils/requests/masterclass";

// components
import Form from "../Form";

const index = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [loading, setLoading] = useState(false);

  // router
  const router = useRouter();

  // handle submit
  const handleSubmit = (_reqData) => {
    setLoading(true);
    postMasterclass(token, _reqData)
      .then((res) => {
        setLoading(false);
        if (res.error) {
          toast.error("Failed to create a masterclass");
        } else {
          router.push("/masterclass");
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error("Failed to create a masterclass.");
      });
  };

  return (
    <div className={styles.content}>
      <a className={styles.back} onClick={() => router.back()}>
        <BsChevronLeft /> Back
      </a>
      <h2>New Pay Per Download</h2>
      <Form handleSubmit={handleSubmit} buttonLoading={loading} />
    </div>
  );
};

export default index;
