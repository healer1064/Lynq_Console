// libraries
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';

// styles
import styles from './styles.module.sass';

// context
import ProfileContext from '@/context/profile';

// requests
import { postSupportReq } from '@/utils/requests/support';

// components
import Modal from '../Modal';
import Loading from '@/components/common/Loading';

const index = () => {
  // states
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  // useContext
  const { token } = useContext(ProfileContext);

  const handleSubmit = () => {
    if (message !== '') {
      setLoading(true);
      const reqData = {
        message,
      };
      postSupportReq(token, reqData)
        .then((res) => {
          setLoading(false);
          if (res.status == 200) {
            setModal(true);
            setMessage('');
          } else {
            toast.error('Failed to send message to Lynq support!');
          }
        })
        .catch(() => {
          toast.error('Failed to send message to Lynq support!');
        });
    } else {
      toast.info('Please type a message!');
    }
  };

  return (
    <>
      <div className={styles.support}>
        {/* <h3>Support</h3> */}
        <p>
          If you need technical support, please send us an email at{' '}
          <a href='mailto:support@lynq.app' target='_blank'>
            support@lynq.app
          </a>
          .<br />
          Don’t forget to provide your public profile url .
          {/* At Lynq, we are commited to providing you with a great and reliable
          experience. */}
        </p>
        {/* <div>
          <h3>Describe your request</h3>
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></textarea>
        </div>
        <button style={{ position: "relative" }} onClick={handleSubmit}>
          {loading && <Loading />}Send Request
        </button> */}
      </div>
      {/* {modal && <Modal setModal={setModal} />} */}
    </>
  );
};

export default index;
