import { useRouter } from "next/router";
import { useState } from "react";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// styles
import styles from "../../styles/PublicScreen.module.sass";
import PublicScreenLoading from "./PublicScreenLoading";

const CheckoutForm = ({ order, slug }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  // states
  const [loading, setLoading] = useState(false);
  const [terms, setTerms] = useState(false);

  // const options = {
  //   style: {
  //     base: {
  //       iconColor: "#c4f0ff",
  //       color: "#495057",
  //       fontSize: "1.15em",
  //       fontFamily: "'Montserrat', sans-serif",
  //       fontWeight: 100,
  //       ":-webkit-autofill": {
  //         color: "grey",
  //       },
  //       "::placeholder": {
  //         color: "grey",
  //       },
  //       "::focus": {
  //         background: "aliceblue",
  //       },
  //     },
  //     invalid: {
  //       iconColor: "#FFC7EE",
  //       color: "#b14f4f",
  //     },
  //   },
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!terms) {
      toast.error("Please read and accept the Terms & Conditions");
      return;
    } else {
      if (!stripe || !elements) return;

      const cardElement = elements.getElement(CardNumberElement);

      console.log(order.stripe_payment_secret_id);
      let name = order.first_name + " " + order.last_name;
      setLoading(true);

      const result = await stripe.confirmCardPayment(
        order.stripe_payment_secret_id,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: name,
              email: order.email,
            },
            metadata: {
              order_id: order.id,
            },
          },
        }
      );

      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log(result.error.message);
        toast.error(result.error.message);
        setLoading(false);
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === "succeeded") {
          // router.push('/checkout/success/' + order.id)
          console.log(order.id);
          setLoading(false);
          router.push(`/${slug}/${order.id}`);
        }
      }
    }
  };

  return (
    <form className={styles.payment_details} onSubmit={handleSubmit}>
      <ToastContainer />
      <h6>Payment Details</h6>
      <div className={styles.card_number_container}>
        <label>Card Number</label>
        <div className={styles.card_element}>
          <div>
            <CardNumberElement />
          </div>
          <img src="/img/public-screen-visa.svg" alt="visa" />
        </div>
      </div>
      <div className={styles.input_container}>
        <div>
          <label>Exp Date</label>
          <div className={styles.card_element}>
            <CardExpiryElement />
          </div>
        </div>
        <div>
          <label>CVV</label>
          <div className={styles.card_element}>
            <CardCvcElement />
          </div>
        </div>
      </div>
      <div className={styles.checkbox_container}>
        <input
          type="checkbox"
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
        />
        <label>I have read, and I accept the Terms and Conditions</label>
      </div>
      <button
        className={styles.checkbox_btn}
        style={{ position: "relative" }}
        type="submit"
      >
        {loading && <PublicScreenLoading />}PAY & CONFIRM YOUR PARTICIPATION
      </button>
      <div className={styles.stripe}>
        Powered by <span>stripe</span>
      </div>
    </form>
  );
};

export default CheckoutForm;
