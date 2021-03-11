import React from 'react'
import AppointmentsListItem from './AppointmentsListItem'

const AppointmentsList = ({ data }) => {
    return (
        <div className="appointments-col">
            {data.map((item, index) => {
                return <AppointmentsListItem data={item} key={index} />
            })}

        </div>
    )
}

export default AppointmentsList
