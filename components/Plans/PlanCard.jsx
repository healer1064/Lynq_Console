const PlanCard = ({
  pricing,
  setPricing,
  plan,
  setPlan,
  checkPlan,
  error,
  setError,
}) => {
  const handleChange = (e) => {
    if (!plan) {
      setError(false);
    }
    setPlan(e.target.checked);
  };

  return (
    <div className="plans-card">
      <div
        className="plans-card__title"
        style={{ textAlign: "center", width: "100%" }}
      >
        Early Bird Special Plan
      </div>
      {/* <div className="plans-card__free">
        <input
          checked={plan}
          onChange={(e) => handleChange(e)}
          type="checkbox"
          className="circle"
        />
        {/* <HomeSelect /> */}
      {/* <span>$99/year</span>
        <strong>FREE</strong> */}
      {/* </div>  */}
      <ul style={{ margin: "30px auto" }}>
        <li>
          <img src="/img/checkmark-circle.svg" alt="" />
          <span>Unlimited event types</span>
        </li>
        <li>
          <img src="/img/checkmark-circle.svg" alt="" />
          <span>Unlimited clients management</span>
        </li>
        <li>
          <img src="/img/checkmark-circle.svg" alt="" />
          <span>Google calendar sync and reminders</span>
        </li>
        <li>
          <img src="/img/checkmark-circle.svg" alt="" />
          <span>Public profile</span>
        </li>
        <li>
          <img src="/img/checkmark-circle.svg" alt="" />
          <span>
            10% commission added on top of the session price with a maximum of
            $10
          </span>
        </li>
      </ul>
      <div onClick={checkPlan} className="plans-card__next">
        <span>NEXT</span>
        <img src="/img/arrow-next.svg" alt="" />
      </div>
      {/* {error && (
        <span
          style={{
            color: "red",
            fontSize: "12px",
            marginBottom: "20px",
            marginTop: "-10px",
          }}
        >
          Please select a plan
        </span>
      )} */}
      {/* <div
        onClick={() => setPricing(!pricing)}
        className="plans-card__seeother"
      >
        <span>{pricing ? "Hide" : "See"} Other Plans</span>
        <img
          style={{
            transform: `${pricing ? "rotate(180deg)" : "rotate(0deg)"}`,
            transition: "0.2s all linear",
          }}
          src="/img/see-other-arrow.svg"
          alt=""
        />
      </div> */}
    </div>
  );
};

export default PlanCard;
