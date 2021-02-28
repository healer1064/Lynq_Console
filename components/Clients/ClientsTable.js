import ClientItem from "./ClientItem"

const arr = [1, 2, 3, 4, 5, 6, 7]

const ClientsTable = () => {
    return (
        <div className="clients-table">
            <div className="row head">
                <div className="col first__name"><strong>First Name</strong></div>
                <div className="col last__name"><strong>Last Name</strong></div>
                <div className="col email"><strong>Email Address</strong></div>
                <div className="col session"><strong>Last Session</strong></div>
                <div className="col revenue"><strong>Total Revenue</strong></div>
                <div className="col actions"></div>
            </div>
            {arr.map(i => {
                return <ClientItem key={i} />
            })}
        </div>
    )
}

export default ClientsTable
