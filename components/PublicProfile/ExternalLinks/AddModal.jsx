// libraries
import React, { useState } from 'react';
import { toast } from 'react-toastify';

// styles
import styles from './styles.module.scss';

// components
import Loading from '@/components/common/Loading';

const AddModal = ({ setShowModal, setExternalLinks }) => {
  // states
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // handle click
  const handleSave = (e) => {
    e.preventDefault();

    if (text === '' && url === '') {
      toast.error('Please fill the fields first!');
    } else {
      setLoading(true);
      setExternalLinks((prevState) => [...prevState, { text, url }]);
      setShowModal(false);
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
