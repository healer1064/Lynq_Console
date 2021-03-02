// libraries
import Head from "next/head";
import { useState } from "react";

// components
import Navbar from "../components/Navbar";
import Leftbar from "../components/Leftbar";

const billing = () => {
  // state
  const [more, setMore] = useState(false);
  const [card, setCard] = useState(false);
  return (
    <div
      onClick={() => {
        setMore(false);
        setCard(false);
      }}
    >
      <Head>
        <title>Billing</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <div className="page-wrp">
        <Leftbar />
        <div className="content-wrp">
          <div className="account">
            <div className="account-tab">
              <p>Account</p>
              <p className="active">Billing</p>
            </div>
            <div className="account-content">
              <div className="account-content-side-nav billing-content-side-nav">
                <div>
                  <img src="/img/account-send.svg" alt="current-plan" />
                  <p>Billing History</p>
                </div>
                <div className="last">
                  <img src="/img/account-send.svg" alt="current-plan" />
                  <p>Payment Methods</p>
                </div>
              </div>
              <select className="account-content-side-nav-mob">
                <option>Billing History</option>
                <option>Payment Methods</option>
              </select>
              <div className="billing-info">
                <div className="billing-info-header">
                  <h3>
                    Payment Methods <span>/ 1</span>
                  </h3>
                  <div>
                    <button>Add Credit Card</button>
                    <button>Connect to Paypal</button>
                  </div>
                  <div className="mobile">
                    <div>
                      <img
                        src="/img/billing-add.svg"
                        alt="add"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCard(true);
                        }}
                      />
                    </div>
                    {card && (
                      <div className="card-options">
                        <p>Credit Card</p>
                        <p>Paypal</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="billing-info-body">
                  <div className="billing-info-body-headings">
                    <p>Default</p>
                    <p>Type</p>
                    <p>Payment Method</p>
                    <p className="billing-heading">Description</p>
                    <p className="billing-heading">Address</p>
                    <p>Action</p>
                  </div>
                  <div className="billing-info-body-data">
                    <div>
                      <img src="/img/billing-done.png" alt="done" />
                    </div>
                    <div>
                      <img src="/img/billing-card.png" alt="card" />
                    </div>
                    <div>
                      <p>Credit Card</p>
                    </div>
                    <div className="billing-heading">
                      <p>**************3047 (Exp: 03/25)</p>
                    </div>
                    <div className="billing-heading">
                      <p>89 Murray street, New York 10007 US</p>
                    </div>
                    <div
                      className="center"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMore(true);
                      }}
                    >
                      <img src="/img/billing-more.png" alt="more" />
                      {more && (
                        <div className="billing-more-options">
                          <p>Edit</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default billing;
