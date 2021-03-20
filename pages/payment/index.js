// libraries
import Head from "next/head";
import { useState, useContext } from "react";
import useSWR from "swr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import RequestPayment from "../../components/Payment/RequestPayment";
import PaymentHistory from "../../components/Payment/PaymentHistory";

// utils
import fetcher from "../../utils/fetcher";
import PageLoading from "../../components/common/PageLoading";

// context
import ProfileContext from "../../context/profile";

export default function Payment() {
  const { token } = useContext(ProfileContext);

  // states
  const [payment, setPayment] = useState();
  const [loading, setLoading] = useState(false);

  const { data, error } = useSWR(["/api/payments", token], fetcher);

  const getBusinessData = async () => {
    setLoading(true);
    const response = await fetch("/api/account/business", {
      headers: new Headers({ "Content-Type": "application/json", token }),
    });

    const data = await response.json();

    if (data) {
      if (data.accountNumber && data.routingNumber) {
        requestPayment();
      } else {
        setPayment("missing");
        setLoading(false);
      }
    } else {
      setLoading(false);
      toast.error("An error has occurred");
    }
  };

  const requestPayment = () => {
    async function request() {
      const response = await fetch("/api/payments/request-payment", {
        headers: new Headers({ token }),
      });

      return await response.json();
    }

    request()
      .then((res) => {
        setLoading(false);
        console.log("Request payment done", res);
        setPayment("done");
      })
      .catch((err) => {
        setLoading(false);
        console.log("error Request payment", err);
        toast.error("An error has occurred");
      });
  };

  return (
    <>
      <Head>
        <title>Payment</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ToastContainer />
      <Navbar active="payments" />
      <div className="page-wrp">
        <Leftbar active="payments" />
        <div className="content-wrp ">
          {!data ? (
            <PageLoading />
          ) : (
            <div className="payment">
              <h3>Payment</h3>
              <RequestPayment
                data={data}
                payment={payment}
                loading={loading}
                getBusinessData={getBusinessData}
              />
              <PaymentHistory data={data.transfer_history} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
