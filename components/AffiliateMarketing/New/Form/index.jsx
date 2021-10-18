// libraries
import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

// styles
import styles from './styles.module.sass';
import 'react-datepicker/dist/react-datepicker.css';

// context
import ProfileContext from '@/context/profile';

// utils
import { handleFileInput } from '@/utils/helpers';

// requests
import { listingPriceReq } from '@/utils/requests/calls/template';
import { getProductRequest } from '@/utils/requests/affiliate-marketing';

// icons
import { FaTrash } from 'react-icons/fa';
import { HiDocument } from 'react-icons/hi';

import Loading from '@/components/common/Loading';

const index = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [url, setUrl] = useState(
    'https://www.amazon.com/dp/B07NJHYXMD/ref=sspa_dk_detail_2?psc=1&pd_rd_i=B07NJHYXMD&pd_rd_w=3b5Dz&pf_rd_p=9fd3ea7c-b77c-42ac-b43b-c872d3f37c38&pd_rd_wg=WzR5V&pf_rd_r=0MZ5RWW3DNEQKC46CBX0&pd_rd_r=7d889085-8fc4-4811-a8f8-73529cc62e76&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzSjdZSjNZOUVIWkYwJmVuY3J5cHRlZElkPUEwMjc4ODI5UlNPMldLVVJGN0c2JmVuY3J5cHRlZEFkSWQ9QTAwNjUyNDcxTE5OWllZMTdDS1k1JndpZGdldE5hbWU9c3BfZGV0YWlsJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==',
  );
  const [data, setData] = useState(null);
  const [price, setPrice] = useState('');
  const [listingPrice, setListingPrice] = useState('');
  const [description, setDescription] = useState('');
  // const [pages, setPages] = useState('');
  // const [date, setDate] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  // const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  // handle price change
  useEffect(() => {
    if (price !== '') {
      setLoading(true);
      listingPriceReq(token, price)
        .then((res) => {
          setLoading(false);
          setListingPrice(res.simulated_price);
        })
        .catch(() => {
          setLoading(false);
          toast.error('Failed to fetch listing price!');
        });
    } else {
      setListingPrice(0);
    }
  }, [price]);

  const handleClick = async (e) => {
    e.preventDefault();
    setButtonLoading(true);
    getProductRequest(url.match('/([A-Z0-9]{10})')[1]).then((res) => {
      setData(res);
      setButtonLoading(false);
    });
  };

  console.log(data);

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
              value={data?.product.title}
              disabled
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
        </>
      )}

      <div className={styles.btns}>
        <button className={styles.save}>
          {buttonLoading ? <Loading /> : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default index;
