import { useRouter } from "next/router";
import { useState } from "react";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import styles from "../../styles/PublicScreen.module.sass";

const CheckoutForm = ({ order }) => {
  const stripe = useStripe();
  const elements = useElements();

  const options = {
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "#495057",
        fontSize: "1.15em",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 100,
        ":-webkit-autofill": {
          color: "grey",
        },
        "::placeholder": {
          color: "grey",
        },
        "::focus": {
          background: "aliceblue",
        },
      },
      invalid: {
        iconColor: "#FFC7EE",
        color: "#b14f4f",
      },
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardNumberElement);

    console.log(order.stripeSecretId);

    const result = await stripe.confirmCardPayment(order.stripeSecretId, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: order.name,
          email: order.email,
        },
        metadata: {
          order_id: order.id,
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        // router.push('/checkout/success/' + order.id)
        router.push("/public-screen5");
      }
    }
  };

  return (
    <form className={styles.payment_details} onSubmit={handleSubmit}>
      <h6>Payment Details</h6>
      <div className={styles.card_number_container}>
        <label>Card Number</label>
        <CardNumberElement />
      </div>
      <div className={styles.input_container}>
        <div>
          <label>Exp Date</label>
          <CardExpiryElement />
        </div>
        <div>
          <label>CVV</label>
          <CardCvcElement />
        </div>
      </div>
      <div className={styles.checkbox_container}>
        <input type="checkbox" />
        <label>I have read, and I accept the Terms and Conditions</label>
      </div>
      <button type="submit">PAY & CONFIRM YOUR PARTICIPATION</button>
      <div className={styles.stripe}>
        Powered by <span>stripe</span>
      </div>
    </form>
  );
};

export default CheckoutForm;
