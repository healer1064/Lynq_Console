// libraries
import { useState, useContext, useCallback } from 'react';
import { Switch } from 'antd';
import { useDropzone } from "react-dropzone";

// context
import ProfileContext from '@/context/profile';

// styles
import styles from './styles.module.sass';
import { RiUploadCloudFill } from "react-icons/ri";

// requests
import { postProfileReq } from '@/utils/requests/public-profile';
import { listingPriceReq } from '@/utils/requests/calls/template';
import { postExclusiveContentReq } from '@/utils/requests/exclusive-content';

// utils
import { handleFileInput } from '@/utils/helpers';

// components
import ToSave from '../ToSave';
import ToEdit from '../ToEdit';
import { toast } from 'react-toastify';

// icons
import { HiDocument } from 'react-icons/hi';
import { FaTrash } from 'react-icons/fa';

const index = ({ data, responseRefresh }) => {
  // context
  const { token, slugData, setSlugData } = useContext(ProfileContext);

  // states
  const [active, setActive] = useState(slugData.active_message);
  const [view, setView] = useState(data.length > 0 ? 1 : 0);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [videoRules, setVideoRules] = useState("");
  const [price, setPrice] = useState("");

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [priceLoading, setPriceLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  // on switch change
  function onChange(checked) {
    if (data.length > 0) {
      setLoading(true);
      postProfileReq(token, { ...slugData, active_message: checked })
        .then((res) => {
          setLoading(false);
          responseRefresh();
          if (!res.status) {
            setActive(checked);
            setSlugData(res);
          }
        })
        .catch(() => {
          setLoading(false);
          toast.error('Failed to change status');
        });
    } else {
      toast.info('Please save the template first.');
    }
  }

  // handle drop
  const onDrop = useCallback((acceptedFiles) => {
    // setFile([handleFileInput(acceptedFiles[0])]);
    setFile(handleFileInput(acceptedFiles[0]));
  }, []);

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
  }

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
  }

  return (
    <form className={styles.content}>
      <div className={styles.switch_wrap}>
        <Switch
          checked={active}
          onChange={onChange}
          className={active ? styles.switch_on : styles.switch_off}
          loading={loading}
        />
        <span>{active ? 'Activated' : 'Deactivated'}</span>
      </div>
      {/*{view == 0 ? (
        <ToSave
          setState={setView}
          data={data}
          responseRefresh={responseRefresh}
          setActive={setActive}
        />
      ) : (
        <ToEdit setState={setView} data={data} />
      )}*/}
      <div className={styles.section}>
        <p>Title of the block *</p>
        <input 
          className={styles.title_input}
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
      </div>
      <div className={styles.section}>
        <p>Short description(homepage) *</p>
        <textarea
          className={styles.sd_textarea}
          maxLength='90'
          value={ shortDescription }
          onChange={ (e) => setShortDescription(e.target.value) }
        />
        <div className={styles.the_count}>
          <span className={styles.current}>{shortDescription.length < 90 ? shortDescription.length : "Please write less than 90 characters"}</span>
          <span className={styles.maximum}> / 90</span>
        </div>
      </div>
      <div className={styles.section}>
        <p>Description *</p>
        <textarea
          className={styles.d_textarea}
          maxLength='1200'
          value={ description }
          onChange={ (e) => setDescription(e.target.value) }
        />
        <div className={styles.the_count}>
          <span className={styles.current}>{description.length < 1200 ? description.length : "Please write less than 1200 characters"}</span>
          <span className={styles.maximum}> / 1200</span>
        </div>
      </div>
      <div className={styles.section}>
        <p>Video Rules *</p>
        <textarea
          className={styles.vr_textarea}
          maxLength='900'
          value={ videoRules }
          onChange={ (e) => setVideoRules(e.target.value) }
          placeholder="Use this block to let your fans know the information they absolutely need to send you."
        />
        <div className={styles.the_count}>
          <span className={styles.current}>{videoRules.length < 900 ? videoRules.length : "Please write less than 900 characters"}</span>
          <span className={styles.maximum}> / 900</span>
        </div>
      </div>
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
        {file && <p className={styles.filename}>{file?.fileObject?.name}
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
                onChange={(e) => setFile(handleFileInput(e.target.files[0]))}
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
      <div className={styles.section}>
        <p>Price *</p>
        <input
          className={styles.price_input}
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
        />
        <label>Listing price: ${price*1.3}</label>
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
