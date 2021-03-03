import styles from "../../styles/PublicScreen.module.sass";

const PublicScreen4Rightbar = () => {
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
      <div className={styles.payment_details}>
        <h6>Personal Information</h6>
        <div className={styles.card_number_container}>
          <label>Card Number</label>
          <div>
            <input />
            <img src="/img/public-screen-visa.svg" alt="visa" />
          </div>
        </div>
        <div className={styles.input_container}>
          <div>
            <label>Exp Date</label>
            <input />
          </div>
          <div>
            <label>Exp Date</label>
            <input />
          </div>
        </div>
        <div className={styles.checkbox_container}>
          <input type="checkbox" />
          <label>I have read, and I accept the Terms and Conditions</label>
        </div>
        <button>PAY & CONFIRM YOUR PARTICIPATION</button>
        <div className={styles.stripe}>
          Powered by <span>stripe</span>
        </div>
      </div>
    </div>
  );
};

export default PublicScreen4Rightbar;
