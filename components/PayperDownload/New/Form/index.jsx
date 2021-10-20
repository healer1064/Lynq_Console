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
import { postExclusiveContentReq } from '@/utils/requests/exclusive-content';

// icons
import { FaTrash } from 'react-icons/fa';
import { HiDocument } from 'react-icons/hi';

// components
import Loading from '@/components/common/Loading';

const index = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [listingPrice, setListingPrice] = useState('');
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

  const handleSubmit = () => {
    postExclusiveContentReq(token, {
      description: title,
      path: 'string',
      thumbnailPath: 'string',
      price,
      ownerId: 'string',
      creationDate: new Date(),
    })
      .then((res) => {
        console.log(res);
      })
      .catch(() => toast.error('An error has occurred.'));
  };

  console.log(thumbnail);

  return (
    <form className={styles.form}>
      <label>
        <strong>
          Title <span>(max 42 characters)</span>
        </strong>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength='42'
        />
      </label>
      <label className={`${thumbnail ? styles.thumbnail : ''}`}>
        <strong>Upload</strong>
        <div className={styles.price}>
          <input
            type='file'
            accept='application/msword, application/pdf, image/*, video/mp4'
            onChange={(e) => setThumbnail(handleFileInput(e.target.files[0]))}
          />
          {thumbnail &&
            (thumbnail.fileObject.type.includes('image') ? (
              <img src={thumbnail?.url} alt='thumbnail' />
            ) : thumbnail.fileObject.type.includes('video') ? (
              <video
                width='320'
                height='240'
                controls
                controlslist='nodownload noremoteplayback noplaybackrate foobar'
              >
                <source src={thumbnail?.url} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            ) : (
              <HiDocument
                size='4rem'
                color='#ffca0a'
                style={{ margin: '0 auto' }}
              />
            ))}
          {thumbnail && (
            <FaTrash
              className={styles.trash}
              onClick={(e) => {
                e.stopPropagation();
                setThumbnail(null);
              }}
            />
          )}
        </div>
        {thumbnail && (
          <p className={styles.filename}>{thumbnail.fileObject.name}</p>
        )}
      </label>
      <label>
        <strong>Price</strong>
        <div className={styles.price}>
          <img
            className={styles.price_img}
            src='/img/dollar.svg'
            alt='dollar'
          />
          <input
            type='number'
            min='0'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ paddingLeft: '25px' }}
          />
        </div>
      </label>
      <label>
        <strong>Listing Price</strong>
        <div className={`${styles.price} ${styles.listing}`}>
          <img
            className={styles.price_img}
            src='/img/dollar.svg'
            alt='dollar'
          />
          {loading ? (
            <img
              className={styles.listing_loading}
              src='/img/Rolling-dark.svg'
              alt='rolling'
            />
          ) : (
            <input
              type='number'
              min='0'
              disabled
              value={loading ? '' : listingPrice}
              style={{ paddingLeft: '25px' }}
            />
          )}
        </div>
      </label>
      <div className={styles.btns}>
        <button className={styles.save}>
          {buttonLoading ? <Loading /> : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default index;
