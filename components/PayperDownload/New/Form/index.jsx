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

// icons
import { FaTrash } from 'react-icons/fa';
import { HiDocument } from 'react-icons/hi';

// components
// import Select from 'react-select';
import Loading from '@/components/common/Loading';

const index = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [listingPrice, setListingPrice] = useState('');
  // const [description, setDescription] = useState('');
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

  // select styles
  // const customStyles = {
  //   control: (provided, state) => ({
  //     ...provided,
  //     background: '#fff',
  //     borderColor: state.isFocused ? '#9FA8B5' : '#9FA8B5',
  //     minHeight: '40px',
  //     height: '40px',
  //     boxShadow: state.isFocused ? null : null,
  //   }),

  //   valueContainer: (provided, state) => ({
  //     ...provided,
  //     height: '40px',
  //     padding: '0 6px',
  //     paddingLeft: '24px',
  //   }),

  //   input: (provided, state) => ({
  //     ...provided,
  //     margin: '0px',
  //   }),
  //   indicatorSeparator: (state) => ({
  //     display: 'none',
  //   }),
  //   indicatorsContainer: (provided, state) => ({
  //     ...provided,
  //     height: '40px',
  //   }),
  // };

  // const handleChange = (newValue, actionMeta) => {
  //   console.group('Value Changed');
  //   console.log(newValue);
  //   console.log(`action: ${actionMeta.action}`);
  //   console.groupEnd();
  // };

  // const handleInputChange = (inputValue, actionMeta) => {
  //   console.group('Input Changed');
  //   console.log(inputValue);
  //   console.log(`action: ${actionMeta.action}`);
  //   console.groupEnd();
  // };

  console.log(thumbnail);

  return (
    <form className={styles.form}>
      {/* <label>
        <strong>Type</strong>
        <Select
          styles={customStyles}
          className={styles.length_select}
          onChange={handleChange}
          onInputChange={handleInputChange}
          placeholder='Type or select...'
          options={[{ value: 'document', label: 'Document' }]}
        />
      </label> */}
      <label>
        <strong>
          Title <span>(max 42 characters)</span>
        </strong>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      {/* <label className={styles.description}>
        <strong>Description</strong>
        <textarea
          maxLength='600'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <span className={styles.desc_count}>{description.length}/600</span>
      </label> */}
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
      {/* <label className={styles.small}>
        <strong>Date of creation</strong>
        <div className={styles.price}>
          <input
            type='date'
            min='0'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </label> */}
      {/* <label className={styles.small}>
        <strong>Number of pages</strong>
        <div className={styles.price}>
          <input
            type='number'
            min='0'
            value={pages}
            onChange={(e) => setPages(e.target.value)}
          />
        </div>
      </label> */}

      {/* <label className={`${styles.small} ${file ? styles.file : ''}`}>
        <strong>
          File <span>(pdf only)</span>
        </strong>
        <div className={styles.price}>
          <input
            type='file'
            accept='application/pdf'
            onChange={(e) => setFile(handleFileInput(e.target.files[0]))}
          />
          {file && <span>{file?.fileObject.name}</span>}
          {file && (
            <FaTrash
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
            />
          )}
        </div>
      </label> */}
      <div className={styles.btns}>
        <button className={styles.save}>
          {buttonLoading ? <Loading /> : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default index;
