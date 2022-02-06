// libraries
import { useState, useContext, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Tooltip } from "antd";
import { useDropzone } from "react-dropzone";
import { Progress } from "antd";

// styles
import styles from './styles.module.sass';
import 'react-datepicker/dist/react-datepicker.css';

import { RiUploadCloudFill, RiDeleteBin6Fill } from "react-icons/ri";

// context
import ProfileContext from '@/context/profile';

// utils
import { handleFileInput } from '@/utils/helpers';

// requests
import { listingPriceReq } from '@/utils/requests/calls/template';
import { postExclusiveContentReq } from '@/utils/requests/exclusive-content';

// icons
import { FaTrash } from 'react-icons/fa';
import { BsExclamationCircleFill } from "react-icons/bs";
import { BiDollar } from "react-icons/bi";
import { HiDocument } from 'react-icons/hi';

// components
import Loading from '@/components/common/Loading';
import router from 'next/router';
// import AttachmentModal from "@/components/Messages/Conversations/Chat/AttachmentModal";

const index = ({ refreshResponse }) => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [listingPrice, setListingPrice] = useState('');
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [priceLoading, setPriceLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState(false);

  // handle drop
  const onDrop = useCallback((acceptedFiles) => {
    // setFile([handleFileInput(acceptedFiles[0])]);
    setFile(handleFileInput(acceptedFiles[0]));
  }, []);

  // handle drop
  // const onDrop = useCallback(
  //   (acceptedFiles) => {
  //     if (type == "Video") {
  //       setFile([handleFileInput(acceptedFiles[0])]);
  //     } else {
  //       setFile((prevState) => [
  //         ...prevState,
  //         handleFileInput(acceptedFiles[0]),
  //       ]);
  //     }
  //   },
  //   [type],
  // );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  // handle price change
  useEffect(() => {
    if (price !== '' || error) {
      setPriceLoading(true);
      listingPriceReq(token, price)
        .then((res) => {
          setPriceLoading(false);
          setListingPrice(res.total);
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
    } else if (error) {
      toast.error('The minimum price is $1');
      return;
    }
    setButtonLoading(true);
    postExclusiveContentReq(token, {
      description: title,
      path: 'string',
      thumbnailPath: 'string',
      price,
      creationDate: new Date(),
    })
      .then((res) => {
        console.log(res);
        upload(res.id);
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
        `https://aks.lynq.app/legacy/exclusive-content/adm/upload/${_id}?t=${token}`, formData, {
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
        refreshResponse()
        if (typeof window !== 'undefined') document.querySelector('.ant-tabs-nav-list .ant-tabs-tab').click();
        setTitle('')
        setPrice('');
        setListingPrice('');
        setFile(null);
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

  const handleOnBlur = (e) => {
    if (e.target.value < 1) setError(true)
    else setError(false);
  }

  return (
    <form className={styles.form}>
      <label className={styles.description_div}>
        <strong>
          Description
        </strong>
        <textarea
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <div className={styles.price}>
        <div className={styles.price_input}>
          <p>Price for 1 month</p>
          <span>
            <BiDollar />
            <input
              type='number'
              id="price"
              min='0'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onBlur={handleOnBlur}
            />
          </span>
        </div>
        {error && <span className={styles.error}>The minimum price is $1</span>}
        <label className={styles.listing}>
          <p>
            <Tooltip
              className={styles.tooltip}
              title="The price a customer pays to purchase the content and that
                      includes Lynq's fees."
            >
              <BsExclamationCircleFill />
            </Tooltip>
            Listing Price
          </p>
          {price != "" && (
            <span>
              <BiDollar />
              <input id="listing-price" value={listingPrice} disabled />
              {priceLoading && (
                <img src="/img/Rolling-dark.svg" alt="rolling" />
              )}{" "}
            </span>
          )}
        </label>
      </div>

      <div className={styles.price}>
        <div className={styles.price_input}>
          <p>Price for 3 month</p>
          <span>
            <BiDollar />
            <input
              type='number'
              id="price"
              min='0'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onBlur={handleOnBlur}
            />
          </span>
        </div>
        {error && <span className={styles.error}>The minimum price is $1</span>}
        <label className={styles.listing}>
          <p>
            <Tooltip
              className={styles.tooltip}
              title="The price a customer pays to purchase the content and that
                      includes Lynq's fees."
            >
              <BsExclamationCircleFill />
            </Tooltip>
            Listing Price
          </p>
          {price != "" && (
            <span>
              <BiDollar />
              <input id="listing-price" value={listingPrice} disabled />
              {priceLoading && (
                <img src="/img/Rolling-dark.svg" alt="rolling" />
              )}{" "}
            </span>
          )}
        </label>
      </div>

      <div className={styles.price}>
        <div className={styles.price_input}>
          <p>Price for 6 month</p>
          <span>
            <BiDollar />
            <input
              type='number'
              id="price"
              min='0'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onBlur={handleOnBlur}
            />
          </span>
        </div>
        {error && <span className={styles.error}>The minimum price is $1</span>}
        <label className={styles.listing}>
          <p>
            <Tooltip
              className={styles.tooltip}
              title="The price a customer pays to purchase the content and that
                      includes Lynq's fees."
            >
              <BsExclamationCircleFill />
            </Tooltip>
            Listing Price
          </p>
          {price != "" && (
            <span>
              <BiDollar />
              <input id="listing-price" value={listingPrice} disabled />
              {priceLoading && (
                <img src="/img/Rolling-dark.svg" alt="rolling" />
              )}{" "}
            </span>
          )}
        </label>
      </div>

      <div className={styles.btns}>
        <button className={styles.save} onClick={handleSubmit}>
          {buttonLoading ? <Loading /> : 'Save'}
        </button>
        <button
          className={styles.cancel}
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
        >
          Cancel
        </button>
      </div>
      {progress && (
        <div className={styles.progress_bar}>
          <Progress percent={progress} strokeColor='#7E88F4' />
        </div>
      )}
    </form>
  );
};

export default index;
