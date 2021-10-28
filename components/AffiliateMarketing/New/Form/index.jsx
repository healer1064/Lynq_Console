// libraries
import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

// styles
import styles from './styles.module.sass';
import 'react-datepicker/dist/react-datepicker.css';

// context
import ProfileContext from '@/context/profile';

// requests
import {
  getProductRequest,
  postAffiliateMarketingReq,
} from '@/utils/requests/affiliate-marketing';

import Loading from '@/components/common/Loading';

const index = ({ setTab, setRefetch }) => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleClick = async (e) => {
    if (url !== '') {
      e.preventDefault();
      try {
        setButtonLoading(true);
        getProductRequest(url?.match('/([A-Z0-9]{10})')[1])
          .then((res) => {
            setData(res);
            setTitle(res?.product.title);
            setThumbnail(res?.product.main_image.link);
            setButtonLoading(false);
          })
          .catch((err) => toast.error(err.message));
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.info('Please type url first');
    }
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    if (title == '' || thumbnail == '' || description == '') {
      toast.info('Please fill all fields first');
    } else {
      setLoading(true);
      postAffiliateMarketingReq(token, {
        // id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        // ownerId: 'string',
        name: title,
        // description: 'string',
        review: description,
        // enabled: 'string',
        price: 0,
        image_path: thumbnail,
        // cta: 'string',
        // creation_date: '2021-10-19T08:41:29.400Z',
      })
        .then((res) => {
          if (res.status == 200) {
            setLoading(false);
            setUrl('');
            setData(null);
            setTitle('');
            setPrice('');
            setDescription('');
            setThumbnail(null);
            setRefetch((prevState) => !prevState);
            setTab('1');
          } else {
            setLoading(false);
            toast.error('An error has occurred');
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error('An error has occurred');
        });
    }
  };

  return (
    <form className={styles.form}>
      <div className={styles.horizontal}>
        <label>
          <strong>Enter the Amazon Product URL</strong>
          <input
            type='Enter the Amazon Product URL'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <button className={styles.save} onClick={(e) => handleClick(e)}>
          {buttonLoading ? 'Loading' : 'Check'}
        </button>
      </div>

      {data && (
        <>
          <label>
            <strong>Name</strong>
            <input
              type='Enter the Amazon Product URL'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <strong>Thumbnail</strong>
            <img
              className={styles.main_image}
              src={data?.product.main_image.link}
            />
          </label>
          <label>
            <strong>Why I recommend it</strong>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>
          <div className={styles.btns}>
            <button className={styles.save} onClick={handleSaveSubmit}>
              {loading ? 'Loading' : 'Save'}
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default index;
