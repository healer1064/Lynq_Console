const PublicScreenAbout = () => {
  return (
    <div className="public-screen-1-content">
      <div className="public-screen-1-profile">
        <div className="public-screen-profile-grap">
          <div className="public-screen-profile-img" />
          <div className="public-screen-profile-social-wrapper">
            <div className="public-screen-profile-social">
              <img src="/img/public-screen-facebook.png" alt="facebook" />
              <img src="/img/public-screen-instagram.png" alt="instagram" />
              <img src="/img/public-screen-gmail.png" alt="gmail" />
              <img src="/img/public-screen-youtube.png" alt="youtube" />
            </div>
            <div className="public-screen-profile-stars">
              <img src="/img/public-screen-star-on.png" alt="star" />
              <img src="/img/public-screen-star-on.png" alt="star" />
              <img src="/img/public-screen-star-on.png" alt="star" />
              <img src="/img/public-screen-star-on.png" alt="star" />
              <img src="/img/public-screen-star-off.png" alt="star" />
            </div>
          </div>
        </div>
        <div className="public-screen-profile-content">
          <h1>Alex Caruso</h1>
          <p>Los Angeles, California</p>
          <div className="public-screen-profile-hash-tags">
            <p>#Meditation</p>
            <p>#Fitness</p>
            <p>#Yoga</p>
          </div>
        </div>
      </div>
      <div className="public-screen-1-about">
        <h3>ABOUT:</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum
          fringilla adipiscing sed posuere sed null viverra nulla elit. Volutpat
          sagittis orci arcu parturient purus aliquam dictumst elit. Tempus,
          libero ipsum viverra mauris fusce ac volutpat, iaculis sit. adipi
        </p>
      </div>
    </div>
  );
};

export default PublicScreenAbout;
