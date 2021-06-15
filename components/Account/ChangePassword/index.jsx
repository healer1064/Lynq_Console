// libraries
import { useState, useContext } from "react";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// requests
import { postPassChangeReq } from "@/utils/requests/account";

// components
import Loading from "@/components/common/Loading";
import Input from "../Input";

const ChangePassword = ({}) => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [passShow, setPassShow] = useState(false);
  const [prevPass, setPrevPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  // handle update password
  const updatePassword = () => {
    if (prevPass !== "" && newPass !== "" && confirmPass !== "") {
      if (newPass === confirmPass) {
        setLoading(true);
        const reqData = {
          oldPassword: prevPass,
          newPassword: newPass,
        };
        postPassChangeReq(token, reqData)
          .then((res) => {
            setLoading(false);
            if (res.status == 200) {
              setPassShow(false);
            } else {
              toast.error("Failed to change the password!");
            }
          })
          .catch(() => {
            setLoading(false);
            toast.error("Failed to change the password!");
          });
      } else {
        toast.error("Passwords don't match!");
      }
    } else {
      toast.error("Please fill all required fields!");
    }
  };

  return (
    <div className={styles.password}>
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
          <Input
            label="Previous Password"
            type="password"
            state={prevPass}
            setState={setPrevPass}
          />
          <Input
            label="New Password"
            type="password"
            state={newPass}
            setState={setNewPass}
          />
          <Input
            label="Repeat Password"
            type="password"
            state={confirmPass}
            setState={setConfirmPass}
          />
          <button
            onClick={updatePassword}
            style={{
              position: "relative",
            }}
          >
            {loading && <Loading />} Update My Password
          </button>
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
