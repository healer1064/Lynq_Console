// libraries
import { useState } from "react";
import { useRouter } from "next/router";
import Fade from "react-reveal/Fade";

// components
import PlanCard from "./PlanCard";
import PricingCard from "./PricingCard";
import PricingSwitch from "./PricingSwitch";

// data
import data from "../../utils/data";

const Plans = () => {
  const [pricing, setPricing] = useState(false);
  const [plan, setPlan] = useState(false);
  const [error, setError] = useState(false);
  const [isMonthly, setIsMonthly] = useState(false);

  const router = useRouter();

  const toggle = () => setIsMonthly(!isMonthly);

  const checkPlan = () => {
    if (plan) {
      setError(false);
      router.push("/signup");
    } else {
      setError(true);
    }
  };

  return (
    <div className="plans-wrp">
      <h1>
        Join Hundreds of experts than use <b>Lynq</b>
      </h1>
      <PlanCard
        pricing={pricing}
        setPricing={setPricing}
        checkPlan={checkPlan}
        plan={plan}
        setPlan={setPlan}
        error={error}
        setError={setError}
      />
      {pricing && (
        <>
          <Fade bottom cascade duration={600}>
            <div className="plans-pricing">
              <h2>Pricing Plans</h2>
              <p>Choose the plan that’s right for you</p>
              <PricingSwitch isMonthly={isMonthly} toggle={toggle} />
            </div>
            <div className="plans-pricing__row">
              <PricingCard
                title="Basic"
                price={
                  !isMonthly ? data.plans.month.basic : data.plans.year.basic
                }
                data={[
                  "2 Event types",
                  "Maximum 20 clients",
                  "Google call sync",
                  "Payment module",
                  "20% commission added on top of the session price",
                ]}
                availability={"available soon"}
              />
              <PricingCard
                title="Silver"
                price={
                  !isMonthly ? data.plans.month.silver : data.plans.year.silver
                }
                data={[
                  "Unlimited event types",
                  "Unlimited clients",
                  "Google call sync",
                  "Payment module",
                  "16% commission added on top of the session price",
                ]}
                availability={"available soon"}
              />
              <PricingCard
                title="Premium"
                price={
                  !isMonthly
                    ? data.plans.month.premium
                    : data.plans.year.premium
                }
                data={[
                  "Unlimited event types",
                  "Unlimited clients",
                  "Google call sync",
                  "Payment module",
                  "12% commission added on top of the session price",
                  "Automatic video recording and storage (up to 1 To)",
                  "AI slots optimization: Automatic discount based on activity and request trends",
                ]}
                availability={"available soon"}
              />
            </div>
          </Fade>
        </>
      )}
    </div>
  );
};

export default Plans;
