// libraries
import { useState, useContext } from "react";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// requests
import { postRequestPaymentReq } from "@/utils/requests/payment/balance";
import { getBusinessReq } from "@/utils/requests/account";

// components
import Loading from "@/components/common/Loading";

const RequestPayment = ({ data, toggleResponse }) => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [payment, setPayment] = useState();
  const [loading, setLoading] = useState(false);

  // send payment request
  const handlePaymentRequest = () => {
    setLoading(true);
    getBusinessReq(token)
      .then((res) => {
        if (res.accountNumber && res.routingNumber) {
          postRequestPaymentReq(token)
            .then((res) => {
              setLoading(false);
              if (res.status == 200) {
                setPayment("done");
                toggleResponse();
              } else {
                toast.error("Failed to send payment request!");
              }
            })
            .catch(() => {
              toast.error("Failed to send payment request!");
            });
        } else {
          setPayment("missing");
          setLoading(false);
        }
      })
      .catch(() => toast.error("Failed to get business information!"));
  };

  return (
    <div className={styles.request}>
      <p className={styles.temporary_balance}>
        Temporary Balance: ${data.temporary_balance}
      </p>
      <p className={styles.final_balance}>
        Final Balance: ${data.final_balance}
      </p>
      <span className={styles.final_note}>
        The final balance corresponds to the sessions that were performed at the
        date of the payment request
      </span>
      <button onClick={handlePaymentRequest}>
        {loading && <Loading />}REQUEST PAYMENT
      </button>
      {payment === "done" && (
        <p
          style={{ color: "#7E88F4", fontWeight: "600" }}
          className={styles.final_account_note}
        >
          Your request was taken into account. You will receive it within 5 days
          max.
        </p>
      )}
      {payment === "missing" && (
        <p className={styles.final_account_note}>
          You need to fill your account and routing number in Account/ Business
          and Payments before we can proceed to payment.
        </p>
      )}
    </div>
  );
};

export default RequestPayment;
