// libraries
import { useContext } from 'react';

// context
import ProfileContext from '@/context/profile';

// styles
import styles from './styles.module.scss';

const Card = ({
  name,
  number,
  image,
}) => {
  // context
  const { slugData } = useContext(ProfileContext);

  return (
    <div
      className={styles.card}
      // style={{ order: checkStatus() ? order : row == 'upper' ? 10 : 20 }}
    >
      {image && <img src={image} alt={name} />}
      <div className={styles.card_info}>
        <h5>{number}</h5>
        <h6>{name}</h6>
      </div>
    </div>
  );
};

export default Card;
