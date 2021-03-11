// libraries
import Head from "next/head";

// components
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import RequestPayment from "../../components/Payment/RequestPayment";
import PaymentHistory from "../../components/Payment/PaymentHistory";

export default function Payment() {
  const paymentHistory = [
    {
      date: "02/10/2021",
      transfer_number: "X92jj56",
      amount: "$492.25",
      status: "paid",
    },
    {
      date: "02/10/2021",
      transfer_number: "X92jj56",
      amount: "$492.25",
      status: "paid",
    },
    {
      date: "02/10/2021",
      transfer_number: "X92jj56",
      amount: "$492.25",
      status: "paid",
    },
    {
      date: "02/10/2021",
      transfer_number: "X92jj56",
      amount: "$492.25",
      status: "paid",
    },
  ];

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
      <Navbar />
      <div className="page-wrp">
        <Leftbar active="payments" />
        <div className="content-wrp">
          <div className="payment">
            <h3>Payment</h3>
            <RequestPayment />
            <PaymentHistory data={paymentHistory} />
          </div>
        </div>
      </div>
    </>
  );
}
