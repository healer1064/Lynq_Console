const AccountEditInputContainer = ({ label, type }) => {
  return (
    <div className="account-edit-input-container">
      <p>{label}</p>
      <input type={type} />
    </div>
  );
};

export default AccountEditInputContainer;
