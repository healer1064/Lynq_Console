// libraries
import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';

// styles
import styles from './styles.module.scss';

// context
import ProfileContext from '@/context/profile';

// requests
import { postLinkReq } from '@/utils/requests/public-profile';

// components
import Loading from '@/components/common/Loading';

const AddModal = ({ setShowModal }) => {
  // states
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // context
  const { token } = useContext(ProfileContext);

  // handle click
  const handleSave = (e) => {
    e.preventDefault();

    if (text === '' && url === '') {
      toast.error('Please fill the fields first!');
    } else {
      setLoading(true);
      postLinkReq(token, {
        position: 10,
        name: text,
        url,
        type: 'internal',
        is_enable: true,
        creation_date: new Date(),
      })
        .then((res) => {
          setShowModal(false);
          setText('');
          setUrl('');
        })
        .catch(() => toast.error('An error has occurred.'));
    }
  };

  return (
    <div className={styles.modal} onClick={() => setShowModal(false)}>
      <form className={styles.inner} onClick={(e) => e.stopPropagation()}>
        <div>
          <label>Button Text</label>
          <input
            type='text'
            placeholder='Enter the text to display on the button'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <label>URL</label>
          <input
            placeholder='Enter the URL'
            type='text'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button onClick={(e) => handleSave(e)} style={{ position: 'relative' }}>
          {loading && <Loading />}Save
        </button>
      </form>
    </div>
  );
};

export default AddModal;
