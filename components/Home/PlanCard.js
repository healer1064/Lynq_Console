const PlanCard = ({ pricing, setPricing }) => {
  return (
    <div className="plans-card">
      <div className="plans-card__title">Early Bird Special Plan</div>
      <div className="plans-card__free">
        <div className="circle"></div>
        <span>$99/year</span>
        <strong>FREE</strong>
      </div>
      <ul>
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
          <span>10% commission added on top of the session price</span>
        </li>
      </ul>
      <a href="#" className="plans-card__next">
        <span>NEXT</span>
        <img src="/img/arrow-next.svg" alt="" />
      </a>
      <div
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
      </div>
    </div>
  );
};

export default PlanCard;
