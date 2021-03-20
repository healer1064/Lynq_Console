const AppointmentCard = ({ data, toggle }) => {
  return (
    <div className={`appointments-col__event ${data.type}`}>
      <div className="title">{data.name}</div>
      <div className="det">
        {data.date}
        <div className="line"></div>
        <b>{data.time}</b>
        <div className="line"></div>
        <b>{data.duration}</b>
      </div>
      {data.client && (
        <div className="client">
          Client: {data.client}
          <div className="line"></div>
          {data.clientEmail}
        </div>
      )}
      {data.type === "blue" && (
        <button className="btnCancel" onClick={() => toggle(data.id)}>
          Cancel Appointment
        </button>
      )}
    </div>
  );
};

export default AppointmentCard;
