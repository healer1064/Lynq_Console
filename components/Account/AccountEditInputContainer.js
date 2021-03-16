const AccountEditInputContainer = ({ label, type, state, setState }) => {
  return (
    <div className="account-edit-input-container">
      <p>{label}</p>
      <input
        style={{ padding: "0 10px" }}
        type={type}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default AccountEditInputContainer;
