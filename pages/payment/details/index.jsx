// libraries
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

// context
import ProfileContext from "@/context/profile";

// requests
import { getDetailsReq } from "@/utils/requests/payment/details";

// components
import PageLoading from "@/components/common/PageLoading";
import Content from "@/components/Payment/Details/Content";

export default function PaymentDetails() {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (token) {
      getDetailsReq(token)
        .then((res) => {
          setDetails(res);
        })
        .catch(() => toast.error("Failed to fetch payment details!"));
    }
  }, [token]);

  return (
    <>
      <Head>
        <title>Payment Details | Lynq</title>
      </Head>
      <div className="content-wrp ">
        {!details ? <PageLoading /> : <Content details={details} />}
      </div>
    </>
  );
}
