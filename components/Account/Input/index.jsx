// styles
import styles from "./styles.module.sass";

const AccountEditInputContainer = ({ label, type, state, setState }) => {
  return (
    <div className={styles.input}>
      <p>{label}</p>
      <input
        type={type}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default AccountEditInputContainer;
