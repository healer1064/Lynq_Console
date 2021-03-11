// libraries
import Head from "next/head";
import { useState } from "react";

// components
import Navbar from "../components/Navbar";
import Leftbar from "../components/Leftbar";

const EditCreditCard = () => {
  return (
    <>
      <Head>
        <title>Edit Credit Card</title>
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
                    <p>Name on Card</p>
                    <input type="text" />
                  </div>
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

export default EditCreditCard;
