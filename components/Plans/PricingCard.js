import Fade from "react-reveal/Fade";

const PricingCard = ({ title, price, data, availability }) => {
  return (
    <Fade bottom cascade duration={600}>
      <div className="plans-pricing__card">
        <div className="plans-pricing__card-type">{title}</div>
        <div className="plans-pricing__card-price">{price}</div>
        <hr />
        <ul>
          {data.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
        <a href="#" className="plans-pricing__card-btn">
          {availability}
        </a>
      </div>
    </Fade>
  );
};

export default PricingCard;
