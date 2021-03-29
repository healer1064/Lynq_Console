// libraries
import { useState } from "react";

// components
import Stats from "./Stats";

const HomeStats = ({ data }) => {
  // states
  const [index, setIndex] = useState(1);
  const [stats, setStats] = useState(data.home.stats.today);

  return (
    <div className="home-stats" style={{ paddingBottom: "50px" }}>
      <div className="home-stats__switch">
        <div
          className={`option  ${index === 1 && "active"}`}
          onClick={() => {
            setIndex(1);
            setStats(data.home.stats.today);
          }}
        >
          Today
        </div>
        <div
          className={`option  ${index === 2 && "active"}`}
          onClick={() => {
            setIndex(2);
            setStats(data.home.stats.weekly);
          }}
        >
          Weekly
        </div>
        <div
          className={`option  ${index === 3 && "active"}`}
          onClick={() => {
            setIndex(3);
            setStats(data.home.stats.monthly);
          }}
        >
          Monthly
        </div>
        <div
          className={`option  ${index === 4 && "active"}`}
          onClick={() => {
            setIndex(4);
            setStats(data.home.stats.yearly);
          }}
        >
          Yearly
        </div>
      </div>
      <select
        value={index}
        onChange={(e) => {
          setIndex(e.target.value);
          e.target.value == 1
            ? setStats(data.home.stats.today)
            : e.target.value == 2
            ? setStats(data.home.stats.weekly)
            : e.target.value == 3
            ? setStats(data.home.stats.monthly)
            : setStats(data.home.stats.yearly);
        }}
        className="home-stats__select"
      >
        <option value={1}>Today</option>
        <option value={2}>Weekly</option>
        <option value={3}>Monthly</option>
        <option value={4}>Yearly</option>
      </select>
      <Stats stats={stats} />
    </div>
  );
};

export default HomeStats;
