const RequestPayment = ({ payment, setPayment }) => {
  return (
    <div className="request-payment">
      <p className="payment-temporary-balance">Temporary Balance: $289</p>
      <p className="payment-final-balance">Final Balance: $237</p>
      <span className="payment-final-note">
        The final balance corresponds to the sessions that were performed at the
        date of the payment request
      </span>
      <button onClick={() => setPayment(true)}>REQUEST PAYMENT</button>
      {payment && (
        <span
          style={{ color: "#7E88F4", fontWeight: "600" }}
          className="payment-final-account-note"
        >
          Your request was taken into account. You will receive it within 5 days
          max.
        </span>
        // <span className="payment-final-account-note">
        //   You need to provide your bank information in your account
        // </span>
      )}
    </div>
  );
};

export default RequestPayment;
