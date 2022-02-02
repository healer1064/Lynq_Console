// libraries
import { useState, useContext } from "react";
import { toast } from "react-toastify";

// styles
import styles from "../styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// requests
import { postMsgReq } from "@/utils/requests/messages";

// icons
import { IoIosAttach } from "react-icons/io";

// components
import Loading from "@/components/common/Loading";
import AttachmentModal from "../AttachmentModal";

const Sendbar = ({ selected, setSelected, refreshResponse }) => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [message, setMessage] = useState("");
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // handle send message
  const handleSend = (_token, _id, _message) => {
    if (message != "") {
      setLoading(true);
      postMsgReq(_token, _id, _message)
        .then((res) => {
          setSelected(res);
          refreshResponse();
          setLoading(false);
          setMessage("");
        })
        .catch(() => {
          setLoading(false);
          toast.error("Failed to send a message!");
        });
    } else {
      toast.info("Please write a message.");
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          !loading && handleSend(token, selected.id, message);
        }}
        className={styles.send_bar}
      >
        <IoIosAttach onClick={() => setAttachmentModal(true)} />
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
        />
        <button disabled={loading}>Send{loading && <Loading />}</button>
      </form>
      {attachmentModal && (
        <AttachmentModal
          selected={selected}
          setSelected={setSelected}
          refreshResponse={refreshResponse}
          setAttachmentModal={setAttachmentModal}
        />
      )}
    </>
  );
};

export default Sendbar;
