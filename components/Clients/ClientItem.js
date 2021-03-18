const ClientItem = ({ data }) => {
  const { firstName, lastName, email, session, revenue } = data;

  return (
    <div className="row">
      <div className="col first__name">
        <span>{firstName}</span>
      </div>
      <div className="col last__name">
        <span>{lastName}</span>
      </div>
      <div className="col email">
        <span>{email}</span>
      </div>
      <div className="col session">
        <span>{session}</span>
        {/* <span>02/10/2021</span> */}
      </div>
      <div className="col revenue">
        <strong>${revenue}</strong>
      </div>
      {/* <div className="col actions">
                <div className="action">
                    <img src="/img/clients-table-remove.svg" alt="" />
                </div>
                <div className="action">
                    <img src="/img/clients-table-edit.svg" alt="" />
                </div>
            </div> */}
    </div>
  );
};

export default ClientItem;
