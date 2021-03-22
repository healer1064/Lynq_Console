import { useRouter } from "next/router";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import styles from "../../styles/PublicScreen.module.sass";

const CheckoutForm = ({ slug, activity, onHandle }) => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [detailView, setDetailView] = useState(false);
  const [order, setOrder] = useState();

  const [errors, setErrors] = useState({
    fNameError: false,
    lNameError: false,
    eError: false,
  });

  const stripePromise = loadStripe(
    "pk_test_51HYDfwI23NtVPUgSlE4VhmtDxpnQ8XlCj7BT8LfX0LEmQ8dKckqYpt1FHY6B0ZtJYn7UpvDdCqEEFcgjmtVl3DNi00JAEOsodB"
  );

  const handleInputs = () => {
    if (validate()) {
      // setDetailView(true);
      requsetBooking()
        .then((res) => {
          console.log("request booking", res);
        })
        .catch((err) => {
          console.log("request bookin error", err);
        });
    }
  };

  const requsetBooking = async () => {
    let _reqData = {
      activity_id: activity.id,
      start_date: "2020-10-02",
      first_name: firstName,
      last_name: lastName,
      email: email,
      stripe_pk:
        "pk_test_51HYDfwI23NtVPUgSlE4VhmtDxpnQ8XlCj7BT8LfX0LEmQ8dKckqYpt1FHY6B0ZtJYn7UpvDdCqEEFcgjmtVl3DNi00JAEOsodB",
    };

    const response = await fetch(
      `http://reb00t.uc.r.appspot.com/profile/${slug}/request_booking`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_reqData),
      }
    );

    return await response.status;
  };

  const validate = () => {
    if (firstName !== "" && lastName !== "" && email !== "") {
      setErrors({
        ...errors,
        fNameError: false,
        lNameError: false,
        eError: false,
      });

      return true;
    }

    setErrors({
      ...errors,
      fNameError: firstName === "" ? true : false,
      lNameError: lastName === "" ? true : false,
      eError: email === "" ? true : false,
    });

    return false;
  };

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
      {!detailView ? (
        <div className={styles.personal_information}>
          <h6>Personal Information</h6>
          <div>
            <label>First Name</label>
            <input
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (errors.fNameError) {
                  setErrors({ ...errors, fNameError: false });
                }
              }}
            />
            {errors.fNameError && <span>* Required</span>}
          </div>
          <div>
            <label>Last Name</label>
            <input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                if (errors.lNameError) {
                  setErrors({ ...errors, lNameError: false });
                }
              }}
            />
            {errors.lNameError && <span>* Required</span>}
          </div>
          <div>
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.eError) setErrors({ ...errors, eError: false });
              }}
            />
            {errors.eError && <span>* Required</span>}
          </div>
          <button onClick={handleInputs}>Next</button>
        </div>
      ) : (
        <div className={styles.payment_details}>
          <h6>Payment Details</h6>
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
              <label>CVV</label>
              <input />
            </div>
          </div>
          <div className={styles.checkbox_container}>
            <input type="checkbox" />
            <label>I have read, and I accept the Terms and Conditions</label>
          </div>
          <button
            onClick={() => {
              onHandle({ firstName, lastName, email });
              router.push("/public-screen5");
            }}
          >
            PAY & CONFIRM YOUR PARTICIPATION
          </button>
          <div className={styles.stripe}>
            Powered by <span>stripe</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
