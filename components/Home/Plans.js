// components
import PlanCard from "./PlanCard"
import PricingCard from "./PricingCard"
import PricingSwitch from "./PricingSwitch"

const Plans = () => {
    return (
        <div className="plans-wrp">
        <h1>Join Hundreds of experts than use <b>Linq</b></h1>
        <PlanCard />
        <div className="plans-pricing">
          <h2>Pricing Plans</h2>
          <p>Choose the plan that’s right for you</p>
          <PricingSwitch />
        </div>
        <div className="plans-pricing__row">
            <PricingCard title="Basic" price="FREE" data={["2 Event types","Maximum 20 clients","Google call sync", "Payment module", "20% commission added on top of the session price"]} availability={"available soon"} />
            <PricingCard title="Silver" price="$9.9" data={["Unlimited event types","Unlimited clients","Google call sync", "Payment module", "16% commission added on top of the session price"]} availability={"available soon"} />
            <PricingCard title="Premium" price="$29.9" data={["Unlimited event types","Unlimited clients","Google call sync", "Payment module", "12% commission added on top of the session price", "Automatic video recording and storage (up to 1 To)", "AI slots optimization: Automatic discount based on activity and request trends"]} availability={"available soon"} />
        </div>
      </div>
    )
}

export default Plans
