// components
import AccountEditInputContainer from "./AccountEditInputContainer";

const ChangePassword = ({
  passShow,
  setPassShow,
  updatePassword,
  prevPass,
  setPrevPass,
  newPass,
  setNewPass,
  confirmPass,
  setConfirmPass,
  passError,
  passCheck,
}) => {
  return (
    <div className="account-password">
      <h3>
        Change Password{" "}
        {passShow ? (
          <span onClick={() => setPassShow(false)}>Cancel</span>
        ) : (
          <span onClick={() => setPassShow(true)}>Edit</span>
        )}
      </h3>
      {passShow ? (
        <>
          <AccountEditInputContainer
            label="Previous Password"
            type="password"
            state={prevPass}
            setState={setPrevPass}
          />
          <AccountEditInputContainer
            label="New Password"
            type="password"
            state={newPass}
            setState={setNewPass}
          />
          <AccountEditInputContainer
            label="Repeat Password"
            type="password"
            state={confirmPass}
            setState={setConfirmPass}
          />
          {passError && (
            <p style={{ color: "red", margin: "-10px 0 20px" }}>
              * Please fill all fields
            </p>
          )}
          {passCheck && (
            <p style={{ color: "red", margin: "-10px 0 20px" }}>
              * Passwords don't match
            </p>
          )}
          <button onClick={updatePassword}>Update My Password</button>
        </>
      ) : (
        <div>
          <p>
            For editing your password, you need to remember the previous one.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
