const SetupNotifications = () => {
  return (
    <div className="setup-notifications">
      <div className="setup-notifications__card">
        <div className="title">
          <img src="/img/notifications-buffers.svg" alt="" />
          <strong>Buffers</strong>
        </div>
        <span>5 min before event</span>
      </div>
      <div className="setup-notifications__card">
        <div className="title">
          <img src="/img/notifications-reminders.svg" alt="" />
          <strong>Reminders</strong>
        </div>
        <span>24 hours before event</span>
        <span>1 hour before event</span>
      </div>
      <div className="setup-notifications__card">
        <div className="title">
          <img
            src="/img/not-allow.svg"
            alt=""
            style={{ height: "17px", width: "17px" }}
          />
          <strong>Do Not Allow Clients To</strong>
        </div>
        <span className="donot-allow-clients">
          Schedule fewer than <input type="number" /> hours in advance
        </span>
      </div>
    </div>
  );
};

export default SetupNotifications;
