// libraries
import { useContext } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";

// context
import ProfileContext from '@/context/profile';

// styles
import styles from './styles.module.scss';

const Progress = ({
  percentage,
  label,
}) => {
  // context
  const { slugData } = useContext(ProfileContext);

  return (
    <div className={styles.progress}>
      <img src="/img/icon_percentage.jpg" alt={name} />
      <div className={styles.progressbar}>
        <ProgressBar completed={percentage} bgColor={"#FCAE73"} height={"10px"} isLabelVisible={false}/>
        <label>{label}</label>
      </div>
      <p>{percentage}%</p>
    </div>
  );
};

export default Progress;
