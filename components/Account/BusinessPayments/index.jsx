// libraries
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// requests
import { postBusinessReq } from "@/utils/requests/account";

// components
import Input from "../Input";
import Loading from "@/components/common/Loading";

const index = ({ business, toggleSuccess }) => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [accountBusShow, setAccountBusShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [bank, setBank] = useState("");
  const [iban, setIban] = useState("");
  const [account, setAccount] = useState("");
  const [routing, setRouting] = useState("");

  useEffect(() => {
    if (business) {
      setBusinessName(business.businessName);
      setBank(business.bankName);
      setIban(business.iban);
      setAccount(business.accountNumber);
      setRouting(business.routingNumber);
    }
  }, [business]);

  const updateBusiness = () => {
    if (
      businessName !== "" &&
      bank !== "" &&
      iban !== "" &&
      account !== "" &&
      routing !== ""
    ) {
      setLoading(true);
      const reqData = {
        id: "",
        accountID: "",
        businessName: businessName,
        bankName: bank,
        iban,
        accountNumber: account,
        routingNumber: routing,
      };

      postBusinessReq(token, reqData)
        .then((res) => {
          setLoading(false);
          if (res.status == 200) {
            setAccountBusShow(false);
            toggleSuccess();
          } else {
            toast.error("Failed to update business information!");
          }
        })
        .catch(() => {
          setLoading(false);
          toast.error("Failed to update business information!");
        });
    } else {
      toast.info("Please fill all required fields!");
    }
  };

  return (
    <div className={styles.business}>
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
          <Input
            label="Business Name"
            type="text"
            state={businessName}
            setState={setBusinessName}
          />
          <Input
            label="Bank Name"
            type="text"
            state={bank}
            setState={setBank}
          />
          <Input label="IBAN" type="text" state={iban} setState={setIban} />
          <Input
            label="Account Number"
            type="text"
            state={account}
            setState={setAccount}
          />
          <Input
            label="Routing Number"
            type="text"
            state={routing}
            setState={setRouting}
          />
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

export default index;
