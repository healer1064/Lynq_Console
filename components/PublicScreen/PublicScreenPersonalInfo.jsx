import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import moment from "moment";
import { useRouter } from "next/router";

// components
import CheckoutForm from "./CheckoutForm";
import PublicScreenLoading from "./PublicScreenLoading";

// styles
import styles from "../../styles/PublicScreen.module.sass";

const PublicScreenPersonalInfo = ({ slug, activity }) => {
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

  const router = useRouter();

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
          if (activity.price == 0) {
            router.push(`/${slug}/${res.id}`);
          } else {
            setOrder(res);
            setDetailView(true);
          }
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
      `https://api.lynq.app/profile/${slug}/request_booking`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_reqData),
      }
    );

    console.log(response.status);

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

  const serviceFee = parseFloat((activity.price * 0.029).toFixed(2));

  const fullDate = (dateString) => {
    const date = new Date(dateString);
    return `${moment(date).format("dddd MMMM dd, YYYY")}`;
  };

  return (
    <div className={styles.public_screen3_right}>
      <div className={styles.order_summary}>
        <h3>Order Summary</h3>
        <p>{activity.name}</p>
        <p>
          {fullDate(activity.start_date)}{" "}
          {moment(activity.start_date).format("hh:mm a")}
        </p>
        <div className={styles.border} />
        <div className={styles.info}>
          <div>
            <p>Subtotal Price</p>
            <h6>${activity.price}</h6>
          </div>
          <div>
            <p>Service Fees (2.9%)</p>
            <h6>${serviceFee}</h6>
          </div>
        </div>
        <div className={styles.border} />
        <div className={styles.price}>
          <h6>Total Price</h6>
          <h6>${activity.price + serviceFee}</h6>
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
          <button style={{ position: "relative" }} onClick={handleInputs}>
            {loading && <PublicScreenLoading />}
            {activity.price == 0 ? "Confirm" : "Next"}
          </button>
        </div>
      ) : (
        <Elements stripe={stripePromise}>
          <CheckoutForm order={order} slug={slug} />
        </Elements>
      )}
    </div>
  );
};

export default PublicScreenPersonalInfo;
