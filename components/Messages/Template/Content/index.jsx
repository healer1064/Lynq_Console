// libraries
import { useState, useContext } from 'react';
import { Switch } from 'antd';

// context
import ProfileContext from '@/context/profile';

// styles
import styles from './styles.module.sass';

// requests
import { postProfileReq } from '@/utils/requests/public-profile';

// components
import ToSave from '../ToSave';
import ToEdit from '../ToEdit';
import { toast } from 'react-toastify';

const index = ({ data, responseRefresh }) => {
  // context
  const { token, slugData, setSlugData } = useContext(ProfileContext);

  // states
  const [active, setActive] = useState(slugData.active_message);
  const [view, setView] = useState(data.length > 0 ? 1 : 0);
  const [loading, setLoading] = useState(false);

  // on switch change
  function onChange(checked) {
    if (data.length > 0) {
      setLoading(true);
      postProfileReq(token, { ...slugData, active_message: checked })
        .then((res) => {
          setLoading(false);
          responseRefresh();
          if (!res.status) {
            setActive(checked);
            setSlugData(res);
          }
        })
        .catch(() => {
          setLoading(false);
          toast.error('Failed to change status');
        });
    } else {
      toast.info('Please save the template first.');
    }
  }

  return (
    <div className={styles.content}>
      {/* <div className={styles.switch_wrap}>
        <Switch
          checked={active}
          onChange={onChange}
          className={active ? styles.switch_on : styles.switch_off}
          loading={loading}
        />
        <span>{active ? 'Activated' : 'Deactivated'}</span>
      </div> */}
      <h3>Delivery Time</h3>
      <p>This indicates the maximum time you have to respond to the request</p>
      {view == 0 ? (
        <ToSave
          setState={setView}
          data={data}
          responseRefresh={responseRefresh}
          setActive={setActive}
        />
      ) : (
        <ToEdit setState={setView} data={data} />
      )}
    </div>
  );
};

export default index;
