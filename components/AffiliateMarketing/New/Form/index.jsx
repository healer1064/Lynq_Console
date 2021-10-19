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
  const [url, setUrl] = useState(
    'https://www.amazon.com/dp/B07NJHYXMD/ref=sspa_dk_detail_2?psc=1&pd_rd_i=B07NJHYXMD&pd_rd_w=3b5Dz&pf_rd_p=9fd3ea7c-b77c-42ac-b43b-c872d3f37c38&pd_rd_wg=WzR5V&pf_rd_r=0MZ5RWW3DNEQKC46CBX0&pd_rd_r=7d889085-8fc4-4811-a8f8-73529cc62e76&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzSjdZSjNZOUVIWkYwJmVuY3J5cHRlZElkPUEwMjc4ODI5UlNPMldLVVJGN0c2JmVuY3J5cHRlZEFkSWQ9QTAwNjUyNDcxTE5OWllZMTdDS1k1JndpZGdldE5hbWU9c3BfZGV0YWlsJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==',
  );
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
          <strong>Enter the product URL</strong>
          <input
            type='Enter the product URL'
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
              type='Enter the product URL'
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
