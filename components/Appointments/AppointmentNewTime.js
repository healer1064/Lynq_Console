const AppointmentNewTime = () => {
    return (
        <div className="appointment-new__time">
            <div className="top">
                <div className="arr prev">
                    <img src="/img/appointment-time-prev.svg" alt="" />
                </div>
                <div className="days">
                    <div className="day">
                        <b>Thursday</b>
                        <span>Feb 11</span>
                    </div>
                    <div className="day">
                        <b>Friday</b>
                        <span>Feb 12</span>
                    </div>
                    <div className="day">
                        <b>Saturday</b>
                        <span>Feb 13</span>
                    </div>
                    <div className="day">
                        <b>Sunday</b>
                        <span>Feb 14</span>
                    </div>
                    <div className="day">
                        <b>Monday</b>
                        <span>Feb 15</span>
                    </div>
                    <div className="day">
                        <b>Tuesday</b>
                        <span>Feb 16</span>
                    </div>
                    <div className="day">
                        <b>Wednesday</b>
                        <span>Feb 17</span>
                    </div>
                </div>
                <div className="arr next">
                    <img src="/img/appointment-time-next.svg" alt="" />
                </div>
            </div>
            <div className="btm">
                <div className="row">
                    <div className="col">
                        <button>
                            09:00 AM
                    </button>
                        <button>
                            10:00 AM
                    </button>
                        <button>
                            11:00 AM
                    </button>
                        <button>
                            12:00 PM
                    </button>
                        <button>
                            01:00 PM
                    </button>
                        <button>
                            02:00 PM
                    </button>
                        <button>
                            03:00 PM
                    </button>
                        <button>
                            04:00 PM
                    </button>
                    </div>
                    <div className="col">
                        <button>
                            09:00 AM
                    </button>
                    </div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                </div>
            </div>
        </div>
    )
}

export default AppointmentNewTime
