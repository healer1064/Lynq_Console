const AppointmentNewShare = ({ setEmail, email }) => {
  return (
    <div className="appointment-new__share">
      <div className="appointment-new__share__cnt">
        <h3>Share your Invitation</h3>
        <label>
          <strong>Enter invitee emails</strong>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>
            you can also copy the link once the appointment us published
          </span>
        </label>
      </div>
    </div>
  );
};

export default AppointmentNewShare;
