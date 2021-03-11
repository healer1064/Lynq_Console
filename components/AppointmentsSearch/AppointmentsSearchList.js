// components
import AppointmentsSearchItem from "./AppointmentsSearchItem"

const AppointmentsSearchList = ({ data }) => {
    return (
        <div className="appointments-col__card__wrp active">
            {data.map((item, index) => {
                return <AppointmentsSearchItem data={item} key={index} />
            })}
        </div>
    )
}

export default AppointmentsSearchList
