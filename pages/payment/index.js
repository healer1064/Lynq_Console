// libraries
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import RequestPayment from "../../components/Payment/RequestPayment";
import PaymentHistory from "../../components/Payment/PaymentHistory";
import PageLoading from "../../components/common/PageLoading";

// context
import ProfileContext from "../../context/profile";

export default function Payment() {
  const { token } = useContext(ProfileContext);

  // states
  const [payment, setPayment] = useState();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(null);

  const getPayments = async () => {
    let config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
      },
    };
    const response = await fetch(
      `https://reb00t.uc.r.appspot.com/account/balance?t=${token}`,
      config
    );
    const data = await response.json();

    setData(data);
  };

  const getBusinessData = async () => {
    setLoading(true);
    // const response = await fetch("/api/account/business", {
    //   headers: new Headers({ "Content-Type": "application/json", token }),
    // });

    let config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
      },
    };

    const response = await fetch(
      `https://reb00t.uc.r.appspot.com/account/business?t=${token}`,
      config
    );

    const res = await response.json();

    if (res) {
      if (res.accountNumber && res.routingNumber) {
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
      const response = await fetch(
        `https://reb00t.uc.r.appspot.com/account/balance/request_payment?t=${token}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

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

  useEffect(() => {
    getPayments();
  }, [token]);

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
