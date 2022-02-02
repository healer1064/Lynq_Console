// styles
import styles from './styles.module.sass';

// icons
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

const Head = ({ order, setOrder }) => {
  return (
    <div className={styles.head}>
      <p>Title</p>
      <p>Type</p>
      <p
        className={`${styles.cursor} ${
          order == 'date_desc' || order == 'date_asc' ? '' : styles.dull
        }`}
        onClick={() =>
          setOrder((prevState) =>
            prevState == 'date_asc' ? 'date_desc' : 'date_asc',
          )
        }
      >
        Date of creation{' '}
        {order == 'date_desc' ? <CaretUpOutlined /> : <CaretDownOutlined />}
      </p>
      <p>Status</p>
      <p
        className={`${styles.cursor} ${
          order == 'price_desc' || order == 'price_asc' ? '' : styles.dull
        }`}
        onClick={() =>
          setOrder((prevState) =>
            prevState == 'price_asc' ? 'price_desc' : 'price_asc',
          )
        }
      >
        Price
        {order == 'price_desc' ? <CaretUpOutlined /> : <CaretDownOutlined />}
      </p>
      {/* <p
        className={`${styles.cursor} ${
          order == 'attendees_desc' || order == 'attendees_asc'
            ? ''
            : styles.dull
        }`}
        onClick={() =>
          setOrder((prevState) =>
            prevState == 'attendees_asc' ? 'attendees_desc' : 'attendees_asc',
          )
        }
      >
        Number of sales
        {order == 'attendees_desc' ? (
          <CaretUpOutlined />
        ) : (
          <CaretDownOutlined />
        )}
      </p> */}
    </div>
  );
};

export default Head;
