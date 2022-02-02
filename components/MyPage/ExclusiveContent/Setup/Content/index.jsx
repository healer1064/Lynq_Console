// libraries
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Switch } from "antd";

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
import DropArea from "../DropArea";

const index = ({ refreshResponse }) => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(false);
  const [title, setTitle] = useState("");
  
  // router
  const router = useRouter();

  const handleChange = (checked) => {
    setState(checked);
  };
  
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
      <div className={styles.sections}>
        <div className={styles.title_div}>
          <Switch
            checked={state}
            onChange={handleChange}
            style={{
              borderRadius: "50px",
              padding: "0",
              margin: "0",
              backgroundColor: "rgba(0, 0, 0, 0.25)",
            }}
          />
          <div className={styles.col_div}>
            <label>Title of the block *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.description_div}>
          <p className={styles.plan_title}>Subscription plan</p>
          <Form refreshResponse={refreshResponse} handleSubmit={handleSubmit} />
        </div>
        {/* <DropArea buttonLoading={loading} type={type} /> */}
      </div>
    </div>
  );
};

export default index;
