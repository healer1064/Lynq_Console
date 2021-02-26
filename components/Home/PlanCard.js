const PlanCard = () => {
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
              <img src="/img/checkmark-circle.svg" alt=""/>
              <span>Unlimited event types</span>
            </li>
            <li>
              <img src="/img/checkmark-circle.svg" alt=""/>
              <span>Unlimited clients management</span>
            </li>
            <li>
              <img src="/img/checkmark-circle.svg" alt=""/>
              <span>Google calendar sync and reminders</span>
            </li>
            <li>
              <img src="/img/checkmark-circle.svg" alt=""/>
              <span>Public profile</span>
            </li>
            <li>
              <img src="/img/checkmark-circle.svg" alt=""/>
              <span>10% commission added on top of the session price</span>
            </li>
          </ul>
          <a href="#" className="plans-card__next">
            <span>NEXT</span>
            <img src="/img/arrow-next.svg" alt=""/>
          </a>
          <div className="plans-card__seeother">
            <span>See Other Plans</span>
            <img src="/img/see-other-arrow.svg" alt=""/>
          </div>
        </div>
    )
}

export default PlanCard
