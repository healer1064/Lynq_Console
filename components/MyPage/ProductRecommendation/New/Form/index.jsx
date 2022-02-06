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

// components
import Modal from '@/components/common/Modal';

import Loading from '@/components/common/Loading';

const index = ({ setTab, setRefetch, setStatus }) => {
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
  const [deleteModal, setDeleteModal] = useState(false);

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
        id: '1c22c98f-fc59-4287-8ab3-88cadd708c0a',
        // ownerId: 'string',
        name: title,
        // description: 'string',
        review: description,
        // enabled: 'string',
        price: 0,
        image_path: thumbnail,
        url: url
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

  const handleModal = (e) => {
    e.preventDefault();
    setDeleteModal(true);
  }

  const handleDelete = () => {
    setLoading(false);
    setUrl('');
    setTitle('');
    setDescription('');
    setThumbnail(null);
    setDeleteModal(false);
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setStatus(0);
  }

  return (
    <form className={styles.form}>
      { !data ?
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
        :
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
            <button className={styles.cancel} onClick={(e) => handleCancel(e)}>
              cancel
            </button>
            <button className={styles.delete} onClick={(e) => handleModal(e)}>
              delete
            </button>
          </div>
          {deleteModal && (
            <Modal
              setModal={setDeleteModal}
              title='Delete content'
              buttonText='Yes, I confirm'
              onDelete={() => handleDelete()}
              type='ppd'
              subtitle='Do you confirm to delete the product?'
            />
          )}
        </>
      }
    </form>
  );
};

export default index;
