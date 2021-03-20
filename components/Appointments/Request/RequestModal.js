import Fade from "react-reveal/Fade";

const RequestModal = ({ setModalShow }) => {
  return (
    <Fade duration={600}>
      <div className="appointment-request__modal__wrp">
        <div className="appointment-request__modal">
          <div className="top">
            <div className="close__btn" onClick={() => setModalShow(false)}>
              <img src="/img/request-modal-close.svg" alt="" />
            </div>
            <div className="title">10 February 2021</div>
          </div>
          <div className="events__col">
            <div className="event__card red">
              <div className="title">Event in your google calendar</div>
              <div className="det">
                Wednesday, 24, 2021
                <div className="line"></div>
                <b>10:00 AM - 11:00 AM</b>
                <div className="line"></div>
                <b>60 Min</b>
              </div>
            </div>
            <div className="event__card blue">
              <div className="title">Meditation 30 Min</div>
              <div className="det">
                Wednesday, 24, 2021
                <div className="line"></div>
                <b>10:00 AM - 11:00 AM</b>
                <div className="line"></div>
                <b>60 Min</b>
              </div>
              <div className="client">
                Client: John Regiani
                <div className="line"></div>
                John.regiani@gmail.com
              </div>
            </div>
            <div className="event__card red">
              <div className="title">Event in your google calendar</div>
              <div className="det">
                Wednesday, 24, 2021
                <div className="line"></div>
                <b>10:00 AM - 11:00 AM</b>
                <div className="line"></div>
                <b>60 Min</b>
              </div>
            </div>
            <div className="event__card blue">
              <div className="title">Meditation 30 Min</div>
              <div className="det">
                Wednesday, 24, 2021
                <div className="line"></div>
                <b>10:00 AM - 11:00 AM</b>
                <div className="line"></div>
                <b>60 Min</b>
              </div>
              <div className="client">
                Client: John Regiani
                <div className="line"></div>
                John.regiani@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default RequestModal;
