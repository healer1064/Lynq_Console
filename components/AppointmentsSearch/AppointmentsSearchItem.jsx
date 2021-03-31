const AppointmentsSearchItem = ({ data }) => {

    const { title, date, time, duration, client_name, client_email, color } = data

    return (
        <div className={`appointments-col__event ${color === "red" ? "red" : "blue"}`}>
            <div className="title">
                {title}
            </div>
            <div className="det">
                {date}
                <div className="line"></div>
                <b>{time}</b>
                <div className="line"></div>
                <b>{duration}</b>
            </div>

            {(client_email || client_name) && <div className="client">
                Client: {client_name}
                <div className="line"></div>
                {client_email}
            </div>}
        </div>
    )
}

export default AppointmentsSearchItem
