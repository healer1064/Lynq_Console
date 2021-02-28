import React from 'react'

const AppointmentsListItem = ({ data }) => {

    const { day, date, appointments, status } = data

    return (
        <div className={`appointments-col__card__wrp ${status === "inactive" && "inactive"}`}>
            <div className="appointments-col__card">
                <div className="det">
                    {day}
                    <div className="line"></div>
                    {date}
                    <div className="line"></div>
                    <b>{appointments} appointments</b>
                </div>
                <div className="arrow">
                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 12L0.0717964 0L13.9282 0L7 12Z" fill="#7E88F4" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default AppointmentsListItem
