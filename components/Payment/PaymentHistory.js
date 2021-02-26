const PaymentHistory = ({ data }) => {
    return (
        <div className="payment-history" >
            <h3>Payment History</h3>
            <div className="payment-histroy-wrap" >
                <div className="payment-history-table-head" >
                    <p>Date</p>
                    <p>Transfer Number</p>
                    <p>Amount</p>
                    <span>Status</span>
                </div>
                {data.map((item, index) => {
                    return <div key={index} className="payment-history-table-body" >
                        <p>{item.date}</p>
                        <p>{item.transfer_number}</p>
                        <p>{item.amount}</p>
                        <div>
                            <span>{item.status}</span>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default PaymentHistory
