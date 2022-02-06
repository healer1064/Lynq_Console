// libraries
import { useState, useContext, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useDropzone } from "react-dropzone";

// styles
import styles from './styles.module.sass';
import 'react-datepicker/dist/react-datepicker.css';

import { RiUploadCloudFill } from "react-icons/ri";

// context
import ProfileContext from '@/context/profile';

// utils
import { handleFileInput } from '@/utils/helpers';

// requests
import {
  getProductRequest,
  postAffiliateMarketingReq,
} from '@/utils/requests/affiliate-marketing';

// components
import Modal from '@/components/common/Modal';

// icons
import { FaTrash } from 'react-icons/fa';
import { HiDocument } from 'react-icons/hi';
import Loading from '@/components/common/Loading';

const index = ({ setTab, setRefetch, setStatus }) => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  
  // handle drop
  const onDrop = useCallback((acceptedFiles) => {
    // setFile([handleFileInput(acceptedFiles[0])]);
    setFile(handleFileInput(acceptedFiles[0]));
  }, []);
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

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
    setFile(null);
    setDeleteModal(false);
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setStatus(0);
  }

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
            upload(res.id);
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

  const upload = async (_id) => {
    const formData = new FormData();
    formData.append('file', file?.fileObject);
    // axios
    //   .post(
    //     `https://aks.lynq.app/legacy/exclusive-content/adm/upload/${_id}?t=${token}`, formData, {
    //       headers: { 'Content-Type': 'multipart/form-data' },
    //       onUploadProgress: (progressEvent) => {
    //         setProgress(
    //           parseInt(
    //             Math.round((progressEvent.loaded * 100) / progressEvent.total),
    //           ),
    //         );
    //       },
    //     },
    //   )
    //   .then((res) => {
    //     refreshResponse()
    //     if (typeof window !== 'undefined') document.querySelector('.ant-tabs-nav-list .ant-tabs-tab').click();
    //     setTitle('')
    //     setPrice('');
    //     setListingPrice('');
    //     setFile(null);
    //     setButtonLoading(false);
    //   })
    //   .catch((err) => {
    //     setButtonLoading(false);
    //     if (err.response) {
    //       //do something
    //       console.log(err.response);
    //     } else if (err.request) {
    //       //do something else
    //       console.log(err.request);
    //     } else if (err.message) {
    //       //do something other than the other two
    //       console.log(err.message);
    //     }
    //   });
  };

  return (
    <form className={styles.form}>
      <>
        <label>
          <strong>Name</strong>
          <input
            type='Enter the Amazon Product URL'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        {/* <label>
          <strong>Thumbnail</strong>
          <img
            className={styles.main_image}
            src={data?.product.main_image.link}
          />
        </label> */}
        <label className={`${styles.uploadWrapper} ${file ? styles.thumbnail : ''}`}>
          <p><strong>File</strong></p>
          <div className={styles.dropzone}>
          <div className={styles.uploadContainer}>
            {file &&
              (file?.fileObject?.type.includes('image') ? (
                <img src={file?.url} alt='thumbnail' height='150px' />
              ) : file?.fileObject?.type.includes('video') ? (
                <video
                  width='320'
                  height='150'
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
              ))}
          {file &&
            <p className={styles.filename}>{file?.fileObject?.name}
              <FaTrash
                className={styles.trash}
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
              />
            </p>}
          </div>
          {!file && (
            <div className={styles.input_wrap}>
              <div {...getRootProps()}>
                <input
                  type='file'
                  id='dropzone-input'
                  {...getInputProps()}
                  accept='image/*, video/mp4'
                  // onChange={(e) => setFile(handleFileInput(e.target.files[0]))}
                />
              </div>
              <>
                <RiUploadCloudFill />
                <h6>Drop or select your file</h6>
                <p>
                  Video (mp4, avi), Picture (jpeg, png)
                  <br /> Max 400 MB
                </p>
              </>
            </div>
          )}
          </div>
        </label>
        <label>
          <strong>Why I recommend it</strong>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <label>
          <strong>URL</strong>
          <input
            type='Enter the other Product URL'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
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
      </>
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
    </form>
  );
};

export default index;
