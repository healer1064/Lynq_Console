const AppointmentCard = ({ data }) => {
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
    </div>
  );
};

export default AppointmentCard;
