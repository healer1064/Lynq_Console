// libraries
import { useState, useEffect, useContext } from 'react';
import { Switch } from 'antd';
import styles from './styles.module.sass';

const index = () => {
  // states
  const [active, setActive] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (profile?.id) {
  //     getAffiliateMarketingReq(profile.id)
  //       .then((res) => setList(res))
  //       .catch(() => toast.error('An error has occurred'));
  //   }
  // }, [profile?.id, refetch]);

  // on switch change
  function onChange(checked) {
    setActive(checked);
  }

  return (
    <>
      <div className={styles.switch_wrap}>
        <Switch
          checked={active}
          onChange={onChange}
          className={active ? styles.switch_on : styles.switch_off}
          loading={loading}
        />
      </div>
      <div className={styles.section}>
        <p>Title of the block *</p>
        <input 
          className={styles.title_input}
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
      </div>
    </>
  );
};

export default index;
