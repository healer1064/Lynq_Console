// libraries
import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Tooltip } from 'antd';

// styles
import styles from './styles.module.sass';

// icons
import { BsExclamationCircleFill } from 'react-icons/bs';

// context
import ProfileContext from '@/context/profile';

// requests
import { listingPriceReq } from '@/utils/requests/calls/template';
import {
  postMessageTemplate,
  putMessageTemplate,
} from '@/utils/requests/messages';

// components
import Loading from '@/components/common/Loading';

const index = ({ data, setState, responseRefresh, setActive }) => {
  // context
  const { token, profile } = useContext(ProfileContext);

  // states
  const [days, setDays] = useState(
    data[0] ? (data[0].maxResponseDelay ? data[0].maxResponseDelay : '') : '',
  );
  const [price, setPrice] = useState(
    data[0] ? (data[0].price ? data[0].price : '') : '',
  );
  const [listingPrice, setListingPrice] = useState('');
  const [description, setDescription] = useState(
    data[0] ? (data[0].description ? data[0].description : '') : '',
  );
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [priceError, setPriceError] = useState(false);

  // get listing prce
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
      setListingPrice('');
    }
  }, [price]);

  // handle click
  const handleSave = () => {
    if (days == '' || price == '' || description == '') {
      toast.info('Please fill all the fields.');
    } else {
      if (!profile.can_create_free_activity) {
        if (price < 1) {
          setPriceError(true);
          return;
        }
        setPriceError(false);
        setButtonLoading(true);
        const reqData = {
          name: 'string',
          description,
          enabled: true,
          maxResponseDelay: days,
          price,
        };
        if (data.length > 0) {
          putMessageTemplate(token, data[0].id, reqData)
            .then((res) => {
              setButtonLoading(false);
              if (res.status) {
                toast.error('Failed to save the message template.');
              } else {
                responseRefresh();
                setActive(true);
                setState(1);
              }
            })
            .catch(() => {
              toast.error('Failed to save the message template.');
              setButtonLoading(false);
            });
        } else {
          postMessageTemplate(token, reqData)
            .then((res) => {
              setButtonLoading(false);
              if (res.status) {
                toast.error('Failed to save the message template.');
              } else {
                responseRefresh();
                setActive(true);
                setState(1);
              }
            })
            .catch(() => {
              toast.error('Failed to save the message template.');
              setButtonLoading(false);
            });
        }
      } else {
        setPriceError(false);
        setButtonLoading(true);
        const reqData = {
          name: 'string',
          description,
          enabled: true,
          maxResponseDelay: days,
          price,
        };
        if (data.length > 0) {
          putMessageTemplate(token, data[0].id, reqData)
            .then((res) => {
              setButtonLoading(false);
              if (res.status) {
                toast.error('Failed to save the message template.');
              } else {
                responseRefresh();
                setActive(true);
                setState(1);
              }
            })
            .catch(() => {
              toast.error('Failed to save the message template.');
              setButtonLoading(false);
            });
        } else {
          postMessageTemplate(token, reqData)
            .then((res) => {
              setButtonLoading(false);
              if (res.status) {
                toast.error('Failed to save the message template.');
              } else {
                responseRefresh();
                setActive(true);
                setState(1);
              }
            })
            .catch(() => {
              toast.error('Failed to save the message template.');
              setButtonLoading(false);
            });
        }
      }
    }
  };

  return (
    <div className={styles.content}>
      <label>
        Maximum delivery
        <span>
          <input
            value={days}
            onChange={(e) => setDays(e.target.value)}
            type='number'
          />
          <span className={styles.days_label}>days</span>
        </span>
      </label>
      <label>
        Price
        <span>
          <img src='/img/dollar.svg' alt='dollar' />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type='number'
          />
        </span>
      </label>
      {priceError && (
        <p className={styles.price_error}>The price must be atleast $1.</p>
      )}
      <label className={styles.listing}>
        <h6>
          Listing Price{' '}
          <Tooltip
            className={styles.tooltip}
            title="The price a customer pays to purchase the service and that
            includes Lynq's fees."
          >
            <BsExclamationCircleFill />
          </Tooltip>
        </h6>
        {price && (
          <span>
            <img src='/img/dollar.svg' alt='dollar' />
            <input disabled value={listingPrice} />
            {loading && (
              <img
                className={styles.loading}
                src='/img/Rolling-dark.svg'
                alt='rolling'
              />
            )}
          </span>
        )}
      </label>
      <div className={styles.desc_box}>
        <label htmlFor='desc'>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id='desc'
          maxLength='700'
        ></textarea>
        <span>{description.length}/700</span>
      </div>
      <button onClick={handleSave}>
        {buttonLoading ? <Loading /> : 'Save'}
      </button>
    </div>
  );
};

export default index;
