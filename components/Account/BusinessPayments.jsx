// libraries
import { useEffect } from "react";

// components
import AccountEditInputContainer from "./AccountEditInputContainer";
import Loading from "../common/Loading";

const BusinessPayments = ({
  business,
  accountBusShow,
  setAccountBusShow,
  updateBusiness,
  businessName,
  setBusinessName,
  bank,
  setBank,
  iban,
  setIban,
  account,
  setAccount,
  paymentsError,
  loading,
  routing,
  setRouting,
}) => {
  useEffect(() => {
    setBusinessName(business.businessName);
    setBank(business.bankName);
    setIban(business.iban);
    setAccount(business.accountNumber);
  }, []);
  return (
    <div className="account-business">
      <h3>
        Business and Payments
        {accountBusShow ? (
          <span onClick={() => setAccountBusShow(false)}>Cancel</span>
        ) : (
          <span onClick={() => setAccountBusShow(true)}>Edit</span>
        )}
      </h3>
      {accountBusShow ? (
        <>
          <AccountEditInputContainer
            label="Business Name"
            type="text"
            state={businessName}
            setState={setBusinessName}
          />
          <AccountEditInputContainer
            label="Bank Name"
            type="text"
            state={bank}
            setState={setBank}
          />
          <AccountEditInputContainer
            label="IBAN"
            type="text"
            state={iban}
            setState={setIban}
          />
          <AccountEditInputContainer
            label="Account Number"
            type="text"
            state={account}
            setState={setAccount}
          />
          <AccountEditInputContainer
            label="Routing Number"
            type="text"
            state={routing}
            setState={setRouting}
          />
          {paymentsError && (
            <p style={{ color: "red", margin: "-10px 0 20px" }}>
              * Please fill all fields
            </p>
          )}
          <button
            onClick={updateBusiness}
            style={{
              position: "relative",
            }}
          >
            {loading && <Loading />}
            Save My Personal Information
          </button>
        </>
      ) : (
        <div>
          <h6>Business Name</h6>
          <p>{business.businessName || "null"}</p>
          <h6>Bank Name</h6>
          <p>{business.bankName || "null"}</p>
          <h6>IBAN</h6>
          <p>{business.iban || "null"}</p>
          <h6>Account Number</h6>
          <p>{business.accountNumber || "null"}</p>
          <h6>Routing Number</h6>
          <p>{business.routingNumber || "null"}</p>
        </div>
      )}
    </div>
  );
};

export default BusinessPayments;
