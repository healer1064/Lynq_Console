import { useRouter } from "next/router";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// components
import CheckoutForm from "../PublicScreen/CheckoutForm";

import styles from "../../styles/PublicScreen.module.sass";

const PublicScreen3Rightbar = ({ slug, activity }) => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [detailView, setDetailView] = useState(false);

  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      requsetBooking()
        .then((res) => {
          console.log("request booking", res);
          setLoading(false);
          setOrder(res);
          setDetailView(true);
        })
        .catch((err) => {
          setLoading(false);
          console.log("request bookin error", err);
        });
    }
  };

  const requsetBooking = async () => {
    // 5555555555554444 card number
    let date = activity.start_date;

    let _reqData = {
      activity_id: activity.id,
      start_date: date,
      first_name: firstName,
      last_name: lastName,
      email: email,
      stripe_pk: "",
    };

    const response = await fetch(
      `https://reb00t.uc.r.appspot.com/profile/${slug}/request_booking`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_reqData),
      }
    );

    return await response.json();
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
          <button onClick={handleInputs}>
            {!loading ? "Next" : "loading..."}
          </button>
        </div>
      ) : (
        <Elements stripe={stripePromise}>
          <CheckoutForm order={order} />
        </Elements>
      )}
    </div>
  );
};

export default PublicScreen3Rightbar;
