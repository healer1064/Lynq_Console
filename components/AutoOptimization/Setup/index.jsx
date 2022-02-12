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
          <h2>Bespoke optimization</h2>
          <p className={styles.description}>Lynq provides an AI driven solution that enables to automatically roll-out optimization scenarios  without  the need for manual interaction.
              By selecting  auto-pilot, our solution analyzes vast amounts of users behavior on your storefront and compares with similar and identical storefronts across the globe, in real-time, to choose the most optimized combinations that will generate the highest revenue, everytime!
              <br/><br/>
              Our solution reviews, revises and automates changes on your following components:
              <br/><br/>
              ▫ Price
              <br/>
              ▫ Blocks position
              <br/>
              ▫ Button CTA
              <br/>
              ▫ Template color 
              <br/><br/>
              You can control below some of the key parameters we apply. Be advised that your choice might have an impact on the optimization.
          </p>
          <div className={styles.card}>
            <div className={styles.title_div}>
              <p className={styles.title}>Price</p>
              <label className={styles.subtitle}>Let Lynq applies change to your current prices</label>
            </div>
            <div className={styles.price_setting}>
              <label>Max lower price</label>
              <div className={styles.proInput}>
                <input name="pro" type="text" />
                <label>%</label>
              </div>
            </div>
            <div className={styles.price_setting}>
              <label>Max higher price</label>
              <div className={styles.proInput}>
                <input name="pro" type="text" />
                <label>%</label>
              </div>
            </div>
            <div className={styles.checkbox_div}>
              <div>
                <p className={styles.title}>Blocks position</p>
                <label className={styles.subtitle}>Let Lynq reorganizes the blocks' position</label>
              </div>
              <input type="checkbox"/>
            </div>
            <div className={styles.checkbox_div}>
              <div>
                <p className={styles.title}>Button CTA</p>
                <label className={styles.subtitle}>Let Lynq modifies the button’s CTA</label>
              </div>
              <input type="checkbox"/>
            </div>
            <div className={styles.checkbox_div}>
              <div>
                <p className={styles.title}>Template color</p>
                <label className={styles.subtitle}>Let Lynq changes the storefront’s color </label>
              </div>
              <input type="checkbox"/>
            </div>
          </div>

        </div>
        <div className={styles.btns}>
          <button className={styles.save} onClick={handleSubmit}>
            {'Save'}
          </button>
          <button
            className={styles.cancel}
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default index;
