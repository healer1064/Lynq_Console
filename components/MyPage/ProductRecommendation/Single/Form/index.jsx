// libraries
import { useState, useContext } from 'react';
import router from 'next/router';
import { toast } from 'react-toastify';

// styles
import styles from './styles.module.sass';
import 'react-datepicker/dist/react-datepicker.css';

// context
import ProfileContext from '@/context/profile';

// requests
import {
  putAffiliateMarketingReq,
  deleteAffiliateMarketingReq,
} from '@/utils/requests/affiliate-marketing';

import Loading from '@/components/common/Loading';

const index = ({ data }) => {
  // context
  const { token, profile } = useContext(ProfileContext);

  // states
  const [title, setTitle] = useState(data.name);
  // const [price, setPrice] = useState('');
  const [description, setDescription] = useState(data.review);
  const [thumbnail] = useState(data.image_path);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // params
  const { id } = router.query;

  const handleEdit = (e) => {
    e.preventDefault();
    if (title == '' || thumbnail == '' || description == '') {
      toast.info('Please fill all fields first');
    } else {
      setLoading(true);
      putAffiliateMarketingReq(token, id, {
        name: title,
        review: description,
        price: 0,
        image_path: thumbnail,
        creation_date: new Date(),
      })
        .then((res) => {
          if (res.status == 200) {
            setLoading(false);
            toast.success('Saved successfully');
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

  const handleDelete = () => {
    setDeleteLoading(true);
    deleteAffiliateMarketingReq(token, id)
      .then((response) => {
        if (response.status === 200) {
          setDeleteLoading(false);
          router.push('/affiliate-marketing');
        }
      })
      .catch((err) => {
        console.log(err);
        setDeleteLoading(false);
        toast.error('An error has occurred.');
      });
  };

  return (
    <form className={styles.form}>
      <label>
        <strong>Name</strong>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        <strong>Thumbnail</strong>
        <img className={styles.main_image} src={thumbnail} alt={title} />
      </label>
      <label>
        <strong>Why I recommend it</strong>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </label>
      <div className={styles.btns}>
        <button className={styles.save} onClick={handleEdit}>
          {loading ? 'Loading' : 'Save changes'}
        </button>
        <button
          className={styles.delete}
          onClick={(e) => {
            e.preventDefault();
            handleDelete();
          }}
        >
          {deleteLoading ? 'Loading' : 'Delete'}
        </button>
      </div>
    </form>
  );
};

export default index;
