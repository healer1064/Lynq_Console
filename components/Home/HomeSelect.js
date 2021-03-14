// styles
import styles from "../../styles/Select.module.sass";

const HomeSelect = () => {
  return (
    <label className={styles.label}>
      <input
        type="checkbox"
        //   checked={terms}
        //   onChange={(e) => {
        //     setTerms(e.target.checked);
        //     if (errors.termsError) {
        //       setErrors({ ...errors, termsError: false });
        //     }
        //   }}
      />
      <div className="checkmark"></div>
      <span>I have read, and I accept the Terms and Conditions</span>
    </label>
  );
};

export default HomeSelect;
