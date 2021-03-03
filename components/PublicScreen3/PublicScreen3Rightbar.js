import styles from "../../styles/PublicScreen.module.sass";

const PublicScreen3Rightbar = () => {
  return (
    <div className={styles.public_screen3_right}>
      <div className={styles.order_summary}>
        <h3>Order Summary</h3>
        <p>Meditation: 60 min</p>
        <p>Tuesday 30 March, 2021 10:00 AM</p>
        <div className={styles.border} />
        <div className={styles.info}>
          <div>
            <p>Subtotal Price</p>
            <h6>$60</h6>
          </div>
          <div>
            <p>Service Fees (2.9%)</p>
            <h6>$1.74</h6>
          </div>
        </div>
        <div className={styles.border} />
        <div className={styles.price}>
          <h6>Total Price</h6>
          <h6>$61.74</h6>
        </div>
      </div>
      <div className={styles.personal_information}>
        <h6>Personal Information</h6>
        <div>
          <label>First Name</label>
          <input />
        </div>
        <div>
          <label>Last Name</label>
          <input />
        </div>
        <div>
          <label>Email</label>
          <input />
        </div>
        <button>Next</button>
      </div>
    </div>
  );
};

export default PublicScreen3Rightbar;
