// components
import Loading from "../common/Loading";

const RequestPayment = ({ payment, data, loading, getBusinessData }) => {
  return (
    <div className="request-payment">
      <p className="payment-temporary-balance">
        Temporary Balance: ${data.temporary_balance}
      </p>
      <p className="payment-final-balance">
        Final Balance: ${data.final_balance}
      </p>
      <span className="payment-final-note">
        The final balance corresponds to the sessions that were performed at the
        date of the payment request
      </span>
      <button
        style={{ position: "relative" }}
        onClick={() => getBusinessData()}
      >
        {loading && <Loading />}REQUEST PAYMENT
      </button>
      {payment === "done" && (
        <span
          style={{ color: "#7E88F4", fontWeight: "600" }}
          className="payment-final-account-note"
        >
          Your request was taken into account. You will receive it within 5 days
          max.
        </span>
      )}
      {payment === "missing" && (
        <span className="payment-final-account-note">
          You need to fill your account and routing number in Account/ Business
          and Payments before we can proceed to payment.
        </span>
      )}
    </div>
  );
};

export default RequestPayment;
