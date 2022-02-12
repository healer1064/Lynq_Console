// libraries
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Switch } from "antd";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// requests
import { postMasterclass } from "@/utils/requests/masterclass";

// components
import router from 'next/router';

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
        <div className={styles.switch_wrap}>
          <Switch
            checked={state}
            onChange={handleChange}
            className={state ? styles.switch_on : styles.switch_off}
          />
          <span>{state ? 'Activated' : 'Deactivated'}</span>
        </div>
        <div className={styles.description_div}>
          <div className={styles.card}>
            <div className={styles.title}>
              Week -01/31/2022
            </div>
            <div className={styles.row}>
              <div className={styles.col_1}>Price change:</div>
              <div className={styles.col_2}>+4.7%</div>
            </div>
            <div className={styles.row}>
              <div className={styles.col_1}>Block position:</div>
              <div className={styles.col_2}>Changed</div>
            </div>
            <div className={styles.row}>
              <div className={styles.col_1}>Button CTA:</div>
              <div className={styles.col_2}>No change</div>
            </div>
            <div className={styles.row}>
              <div className={styles.col_1}>Template color:</div>
              <div className={styles.col_2}>Template 3</div>
            </div>
            <div className={styles.row}>
              <div className={styles.col_1}>Click rate:</div>
              <div className={styles.col_2}>
                <label>7.1%</label>
                <label>+31.7% vs previous week</label>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col_1}>Price change:</div>
              <div className={styles.col_2}>
                <label>$ 1043.91</label>
                <label>+19.3% vs previous week</label>
              </div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.title}>
              Week -01/31/2022
            </div>
            <div className={styles.row}>
              <div className={styles.col_1}>Price change:</div>
              <div className={styles.col_2}>+4.7%</div>
            </div>
            <div className={styles.row}>
              <div className={styles.col_1}>Block position:</div>
              <div className={styles.col_2}>Changed</div>
            </div>
            <div className={styles.row}>
              <div className={styles.col_1}>Button CTA:</div>
              <div className={styles.col_2}>No change</div>
            </div>
            <div className={styles.row}>
              <div className={styles.col_1}>Template color:</div>
              <div className={styles.col_2}>Template 3</div>
            </div>
            <div className={styles.row}>
              <div className={styles.col_1}>Click rate:</div>
              <div className={styles.col_2}>
                <label>7.1%</label>
                <label>+31.7% vs previous week</label>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col_1}>Price change:</div>
              <div className={styles.col_2}>
                <label>$ 1043.91</label>
                <label>+19.3% vs previous week</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
