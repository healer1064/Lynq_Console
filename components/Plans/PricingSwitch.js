const PricingSwitch = ({ isMonthly, toggle }) => {
  return (
    <div className="plans-pricing__switch">
      <span className="active">Monthly</span>
      <label className="plans-pricing__toggle">
        <input type="checkbox" checked={isMonthly} onChange={toggle} />
        <div className="toggle-control"></div>
      </label>
      <span>Yearly</span>
    </div>
  );
};

export default PricingSwitch;
