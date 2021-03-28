const PaymentTabs = ({ setTabIndex, tabIndex }) => {
  return (
    <>
      <div className="settings-types">
        <div
          onClick={() => setTabIndex(1)}
          className={`option ${tabIndex == 1 && "active"}`}
        >
          Balance
        </div>
        <div
          onClick={() => setTabIndex(2)}
          className={`option ${tabIndex == 2 && "active"}`}
        >
          Details
        </div>
      </div>
      <div className="settings-types__mobile">
        <select onChange={(e) => setTabIndex(e.target.value)} value={tabIndex}>
          <option value={1}>Balance</option>
          <option value={2}>Details</option>
        </select>
      </div>
    </>
  );
};

export default PaymentTabs;
