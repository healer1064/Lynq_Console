const ClientItem = () => {
  return (
    <div className="row">
      <div className="col first__name">
        <span>John</span>
      </div>
      <div className="col last__name">
        <span>Brimbo</span>
      </div>
      <div className="col email">
        <span>Jbrimbo@gmail.com</span>
      </div>
      <div className="col session">
        <span>02/10/2021</span>
      </div>
      <div className="col revenue">
        <strong>$589</strong>
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
