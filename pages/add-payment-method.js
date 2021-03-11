// libraries
import Head from "next/head";
import { useState } from "react";

// components
import Navbar from "../components/Navbar";
import Leftbar from "../components/Leftbar";

const AddPaymentMethod = () => {
  return (
    <>
      <Head>
        <title>Add Payment Method</title>
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
              <div className="edit-credit-card">
                <div className="edit-credit-card-header">
                  <h6>Edit Credit Card Details</h6>
                  <p>**************3047 (Exp: 03/25)</p>
                </div>
                <div className="edit-credit-card-body">
                  <div>
                    <p>Billing Address</p>
                    <input type="text" />
                    <input type="text" />
                  </div>
                  <div className="edit-credit-card-col">
                    <div>
                      <p>Country</p>
                      <select>
                        <option>England</option>
                        <option>United States</option>
                        <option>Wales</option>
                      </select>
                    </div>
                    <div>
                      <p>Postal Code</p>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="edit-credit-card-col">
                    <div>
                      <p>City</p>
                      <input type="text" />
                    </div>
                    <div>
                      <p>State</p>
                      <select>
                        <option>New York</option>
                        <option>New York</option>
                      </select>
                    </div>
                  </div>
                  <div className="radio-container">
                    <div>
                      <input type="radio" />
                      <label>Credit Card</label>
                      <img src="/img/add-payment-method-card.svg" alt="card" />
                    </div>
                    <div>
                      <input type="radio" />
                      {/* <label>Paypal</label> */}
                      <img
                        src="/img/add-payment-method-paypal.svg"
                        alt="card"
                      />
                    </div>
                  </div>
                  <div>
                    <p>Name on Card</p>
                    <input type="text" placeholder="Name on Card" />
                  </div>
                  <div className="credit-card-number">
                    <p>Credit Card Number</p>
                    <div>
                      <img
                        src="/img/add-payment-method-card-icon.svg"
                        alt="card"
                      />
                      <input type="text" placeholder="Card Number" />
                    </div>
                  </div>
                  <div className="edit-credit-card-col">
                    <div>
                      <p>Exp Date</p>
                      <input type="text" />
                    </div>
                    <div>
                      <p>CVV</p>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="checkbox-container">
                    <input type="checkbox" />
                    <label>Set as default</label>
                  </div>
                  <div>
                    <button>Save Changes</button>
                    <button className="cancel">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPaymentMethod;
