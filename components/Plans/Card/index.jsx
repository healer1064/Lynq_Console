// libraries
import { useState } from "react";
import { useRouter } from "next/router";

// styles
import styles from "./styles.module.sass";

const Card = () => {
  // states
  const [pricing, setPricing] = useState(false);
  const [plan, setPlan] = useState(false);
  const [error, setError] = useState(false);

  // router
  const router = useRouter();

  return (
    <div className={styles.card}>
      <div className={styles.title}>Early Bird Special Plan</div>
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
          <span>
            10% commission added on top of the session price with a maximum of
            $10
          </span>
        </li>
      </ul>
      <div onClick={() => router.push("/signup")} className={styles.next}>
        <span>NEXT</span>
        <img src="/img/arrow-next.svg" alt="" />
      </div>
    </div>
  );
};

export default Card;
