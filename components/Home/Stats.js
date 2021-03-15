import React from "react";
import AnimatedNumber from "animated-number-react";

const Stats = ({ stats }) => {
  return (
    <div className="home-stats__row">
      <div className="card">
        <div className="icon">
          <img src="/img/home-stats-revenue.svg" alt="" />
        </div>
        <div className="title">Revenue</div>
        <div className="num">
          $
          <AnimatedNumber
            value={stats.revenue}
            formatValue={(value) => value.toFixed(2)}
          />
        </div>
      </div>
      <div className="card">
        <div className="icon">
          <img src="/img/home-stats-session.svg" alt="" />
        </div>
        <div className="title">Session</div>
        <div className="num">
          <AnimatedNumber
            value={stats.session}
            formatValue={(value) => value.toFixed(0)}
          />
        </div>
      </div>
      <div className="card">
        <div className="icon">
          <img src="/img/home-stats-request.svg" alt="" />
        </div>
        <div className="title">Request</div>
        <div className="num">
          <AnimatedNumber
            value={stats.request}
            formatValue={(value) => value.toFixed(0)}
          />
        </div>
      </div>
    </div>
  );
};

export default Stats;
