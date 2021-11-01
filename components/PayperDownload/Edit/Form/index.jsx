// libraries
import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

// styles
import styles from './styles.module.sass';
import 'react-datepicker/dist/react-datepicker.css';

// context
import ProfileContext from '@/context/profile';

// utils
import { handleFileInput } from '@/utils/helpers';

// requests
import { listingPriceReq } from '@/utils/requests/calls/template';
import { putExclusiveContentReq } from '@/utils/requests/exclusive-content';

// icons
import { FaTrash } from 'react-icons/fa';
import { HiDocument } from 'react-icons/hi';

// components
import Loading from '@/components/common/Loading';
import router from 'next/router';

const index = ({ data }) => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [title, setTitle] = useState(data.description);
  const [price, setPrice] = useState(data.price);
  const [listingPrice, setListingPrice] = useState('');
  const [file, setFile] = useState(data.path);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [priceLoading, setPriceLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  // handle price change
  useEffect(() => {
    if (price !== '') {
      setPriceLoading(true);
      listingPriceReq(token, price)
        .then((res) => {
          setPriceLoading(false);
          setListingPrice(res.simulated_price);
        })
        .catch(() => {
          setPriceLoading(false);
          toast.error('Failed to fetch listing price!');
        });
    } else {
      setListingPrice(0);
    }
  }, [price]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title == '' || price == '' || !file) {
      toast.info('Please fill all fields!');
      return;
    }
    setButtonLoading(true);
    putExclusiveContentReq(token, data.id, {
      description: title,
      path: data.path,
      thumbnailPath: data.thumbnailPath,
      price,
      creationDate: new Date(),
    })
      .then((res) => {
        if (file.fileObject) {
          upload(res.id);
        } else {
          router.back();
        }
      })
      .catch(() => {
        setButtonLoading(false);
        toast.error('An error has occurred.');
      });
  };

  const upload = async (_id) => {
    const formData = new FormData();
    formData.append('file', file?.fileObject);

    axios
      .post(
        `https://aks.lynq.app/legacy/exclusive-content/upload/${_id}?t=${token}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            setProgress(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total),
              ),
            );
          },
        },
      )
      .then((res) => {
        router.push('/pay-per-download');
        setButtonLoading(false);
      })
      .catch((err) => {
        setButtonLoading(false);
        if (err.response) {
          //do something
          console.log(err.response);
        } else if (err.request) {
          //do something else
          console.log(err.request);
        } else if (err.message) {
          //do something other than the other two
          console.log(err.message);
        }
      });
  };

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
      <label className={`${file ? styles.thumbnail : ''}`}>
        <strong>Upload</strong>
        <div className={styles.price}>
          <input
            type='file'
            accept='application/msword, application/pdf, image/*, video/mp4'
            onChange={(e) => setFile(handleFileInput(e.target.files[0]))}
          />
          <img src={data.thumbnailPath} alt={data.description} />
          {/* {file &&
            (file?.fileObject.type.includes('image') ? (
              <img src={file?.url} alt='thumbnail' />
            ) : file?.fileObject.type.includes('video') ? (
              <video
                width='320'
                height='240'
                controls
                controlslist='nodownload noremoteplayback noplaybackrate foobar'
              >
                <source src={file?.url} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            ) : (
              <HiDocument
                size='4rem'
                color='#ffca0a'
                style={{ margin: '0 auto' }}
              />
            ))} */}
          {/* {file && (
            <FaTrash
              className={styles.trash}
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
            />
          )} */}
        </div>
        {/* {file && <p className={styles.filename}>{file.fileObject.name}</p>} */}
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
          {priceLoading ? (
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
              value={priceLoading ? '' : listingPrice}
              style={{ paddingLeft: '25px' }}
            />
          )}
        </div>
      </label>
      <div className={styles.btns}>
        <button className={styles.save} onClick={handleSubmit}>
          {buttonLoading ? <Loading /> : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default index;
