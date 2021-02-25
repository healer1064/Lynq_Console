import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <header className="header">
        <a href="#" className="header-logo">
          <img src="/img/linq-logo.svg" alt=""/>
        </a>
        <div className="burger-menu">
          <img src="/img/burger-menu.svg" alt=""/>
        </div>
      </header>
      <div className="plans-wrp">
        <h1>Join Hundreds of experts than use <b>Linq</b></h1>
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
        <div className="plans-pricing">
          <h2>Pricing Plans</h2>
          <p>Choose the plan that’s right for you</p>
          <div className="plans-pricing__switch">
            <span className="active">Monthly</span>
            <label className="plans-pricing__toggle">
              <input type="checkbox"/>
              <div className="toggle-control"></div>
            </label>
            <span>Yearly</span>
          </div>
        </div>
        <div className="plans-pricing__row">
          <div className="plans-pricing__card">
            <div className="plans-pricing__card-type">
              Basic
            </div>
            <div className="plans-pricing__card-price">
              FREE
            </div>
            <hr/>
            <ul>
              <li>2 Event types</li>
              <li>Maximum 20 clients</li>
              <li>Google call sync</li>
              <li>Payment module</li>
              <li>20% commission added on top of the session price</li>
            </ul>
            <a href="#" className="plans-pricing__card-btn">
              available soon
            </a>
          </div>
          <div className="plans-pricing__card">
            <div className="plans-pricing__card-type">
              Silver
            </div>
            <div className="plans-pricing__card-price">
              $9.9
            </div>
            <hr/>
            <ul>
              <li>Unlimited event types</li>
              <li>Unlimited clients</li>
              <li>Google call sync</li>
              <li>Payment module</li>
              <li>16% commission added on top of the session price</li>
            </ul>
            <a href="#" className="plans-pricing__card-btn">
              available soon
            </a>
          </div>
          <div className="plans-pricing__card">
            <div className="plans-pricing__card-type">
              Premium
            </div>
            <div className="plans-pricing__card-price">
              $29.9
            </div>
            <hr/>
            <ul>
              <li>Unlimited event types</li>
              <li>Unlimited clients</li>
              <li>Google call sync</li>
              <li>Payment module</li>
              <li>12% commission added on top of the session price</li>
              <li>Automatic video recording and storage (up to 1 To)</li>
              <li>AI slots optimization: Automatic discount based on activity and request trends</li>
            </ul>
            <a href="#" className="plans-pricing__card-btn">
              available soon
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
