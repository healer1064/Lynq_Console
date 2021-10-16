// libraries
import { useContext } from 'react';

// context
import ProfileContext from '@/context/profile';

// styles
import styles from './styles.module.scss';

const Item = ({
  name,
  number,
  image,
  percent,
  trend,
  type,
  order,
  row,
  contentSales,
}) => {
  // context
  const { slugData } = useContext(ProfileContext);

  const checkStatus = () => {
    if (type == '1-1') {
      if (slugData.active_private_session) {
        return true;
      } else {
        return false;
      }
    }
    if (type == 'masterclass') {
      if (slugData.active_masterclass) {
        return true;
      } else {
        return false;
      }
    }
    if (type == 'message') {
      if (slugData.active_message) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <div
      className={styles.item}
      style={{ order: checkStatus() ? order : row == 'upper' ? 10 : 20 }}
    >
      <div>
        <h5>{type ? (checkStatus() ? number : 'Not activated') : number}</h5>
        <h6>{name}</h6>
        {percent &&
          (type ? (
            checkStatus() ? (
              <p>
                <span className={trend == 'up' ? styles.green : styles.red}>
                  {percent}%
                </span>{' '}
                Since yesterday
              </p>
            ) : (
              <p></p>
            )
          ) : (
            <p>
              <span className={trend == 'up' ? styles.green : styles.red}>
                {percent}%
              </span>{' '}
              Since yesterday
            </p>
          ))}
        {contentSales && (
          <p className={styles.content_sales}>
            Content sales: <span>${contentSales}</span>
          </p>
        )}
      </div>
      <img src={image} alt={name} />
    </div>
  );
};

export default Item;
