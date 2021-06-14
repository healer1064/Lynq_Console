// libraries
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

// context
import ProfileContext from "@/context/profile";

// requests
import { getPaymentsReq } from "@/utils/requests/payment/balance";

// components
import PageLoading from "@/components/common/PageLoading";
import Content from "@/components/Payment/Balance/Content";

export default function Payment() {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [payments, setPayments] = useState(null);
  const [response, setResponse] = useState(false);

  useEffect(() => {
    if (token) {
      getPaymentsReq(token)
        .then((res) => {
          setPayments(res);
        })
        .catch(() => toast.error("Failed to fetch payment balance!"));
    }
  }, [token, response]);

  // refresh payment
  const toggleResponse = () => {
    setResponse(!response);
  };

  return (
    <>
      <Head>
        <title>Payment Balance | Lynq</title>
      </Head>
      <div className="content-wrp ">
        {!payments ? (
          <PageLoading />
        ) : (
          <Content payments={payments} toggleResponse={toggleResponse} />
        )}
      </div>
    </>
  );
}
