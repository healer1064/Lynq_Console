const RequestPayment = () => {
    return (
        <div className="request-payment" >
            <p className="payment-temporary-balance" >Temporary Balance: $289</p>
            <p className="payment-final-balance" >Final Balance: $237</p>
            <span className="payment-final-note" >The final balance corresponds to the sessions that were performed at the date of the payment request</span>
            <button>REQUEST PAYMENT</button>
            <span className="payment-final-account-note" >You need to provide your bank information in your account</span>
        </div>
    )
}

export default RequestPayment
