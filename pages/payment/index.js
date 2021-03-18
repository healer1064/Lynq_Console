// libraries
import Head from "next/head";
import { useState, useContext } from "react";
import useSWR from "swr";

// components
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import RequestPayment from "../../components/Payment/RequestPayment";
import PaymentHistory from "../../components/Payment/PaymentHistory";

// utils
import fetcher from "../../utils/fetcher";
import PageLoading from "../../components/common/PageLoading";
import EmptyData from "../../components/common/EmptyData";

// context
import ProfileContext from "../../context/profile";

export default function Payment() {
  const { token } = useContext(ProfileContext);

  // states
  const [payment, setPayment] = useState(false);

  const { data, error } = useSWR(["/api/payments", token], fetcher);

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
                setPayment={setPayment}
              />
              <PaymentHistory data={data.transfer_history} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
