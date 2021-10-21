// libraries
import Fade from 'react-reveal/Fade';
import moment from 'moment';

// styles
import styles from './styles.module.sass';

// components
import Loading from '@/components/common/Loading';

const Modal = ({
  setModal,
  onDelete,
  loading,
  title,
  subtitle,
  buttonText,
  date,
  type,
}) => {
  return (
    <Fade duration={600}>
      <div
        className={styles.public_screen_modal}
        onClick={() => setModal(false)}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <img
            onClick={() => setModal(false)}
            src='/img/public-screen-close.svg'
            alt='close'
          />
          <h6>{title}</h6>
          <p>{subtitle}</p>
          <p>
            {type == 'ppd'
              ? ``
              : `Scheduled at: ${moment(date).format('dddd, MMMM DD, YYYY')}
            `}
          </p>
          <button style={{ position: 'relative' }} onClick={onDelete}>
            {loading && <Loading color='#EF7888' />}
            {buttonText}
          </button>
        </div>
      </div>
    </Fade>
  );
};

export default Modal;
