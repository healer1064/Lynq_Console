// libraries
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Fade from "react-reveal/Fade";

// context
import ProfileContext from "../../context/profile";

// components
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import PageLoading from "../../components/common/PageLoading";
import PaymentsDetails from "../../components/Payment/PaymentsDetails";

const details = [
  {
    type: "Test Type",
    client_email: "Test@email.com",
    price: 50,
    starting_date: "Mar 21, 2021",
    status: "Completed",
  },
  {
    type: "Test Type",
    client_email: "Test@email.com",
    price: 50,
    starting_date: "Mar 21, 2021",
    status: "Coming",
  },
  {
    type: "Test Type",
    client_email: "Test@email.com",
    price: 50,
    starting_date: "Mar 21, 2021",
    status: "Awaiting Payment",
  },
  {
    type: "Test Type",
    client_email: "Test@email.com",
    price: 50,
    starting_date: "Mar 21, 2021",
    status: "Completed",
  },
  {
    type: "Test Type",
    client_email: "Test@email.com",
    price: 50,
    starting_date: "Mar 21, 2021",
    status: "Coming",
  },
  {
    type: "Test Type",
    client_email: "Test@email.com",
    price: 50,
    starting_date: "Mar 21, 2021",
    status: "Awaiting Payment",
  },
];

export default function PaymentDetails() {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [data, setData] = useState(null);

  const getDetails = async () => {
    let config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
      },
    };

    const response = await fetch(
      `https://api.lynq.app/account/clients?t=${token}&period=TODAY`,
      config
    );
    const data = await response.json();

    setData(data);
  };

  useEffect(() => {
    getDetails();
  }, [token]);

  return (
    <>
      <Head>
        <title>Details | Lynq</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar active="payment-details" />
      <div className="page-wrp">
        <Leftbar active="payment-details" />
        <div className="content-wrp ">
          {!data ? (
            <PageLoading />
          ) : (
            <Fade>
              <div className="payment">
                <PaymentsDetails data={data} />
              </div>
            </Fade>
          )}
          <br />
        </div>
      </div>
    </>
  );
}
