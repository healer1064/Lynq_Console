// libraries
import React, { useState, useContext, useEffect } from "react";
import Fade from "react-reveal/Fade";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// requests
import { putLinkReq, deleteLinkReq } from "@/utils/requests/public-profile";

// icons
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

// components
import { Switch } from "antd";
import { toast } from "react-toastify";
import AddModal from "../AddModal";

const Item = ({ data, index, refetchData, setData }) => {
  // states
  const [state, setState] = useState(data);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(state.is_enable);
  const [editLoading, setEditLoading] = useState(false);
  const [changePositionIsLoading, setChangePositionIsLoading] = useState(false);

  // Effect's
  useEffect(() => setState(data), [data]);

  // context
  const { token } = useContext(ProfileContext);

  // handler's
  const onSwitch = (checked) => {
    setEditLoading(true);

    putLinkReq(token, state.id, {
      ...state,
      is_enable: checked,
      type: "external",
    })
      .then((res) => {
        setState(res);

        setStatus(checked);
      })
      .catch(() => {
        toast.error("An error has occurred.");
      })
      .finally(() => setEditLoading(false));
  };

  const onChangeButtonPosition = (e, action) => {
    e.preventDefault();

    setChangePositionIsLoading(true);

    putLinkReq(token, state.id, {
      ...state,
      position: action === "DOWN" ? index + 1 : index - 1,
    })
      .then((res) => setState(res))
      .catch(() => toast.error("An error has occurred."))
      .finally(() => setChangePositionIsLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);

    deleteLinkReq(token, state.id)
      .then((res) => setState(res))
      .catch(() => {
        toast.error("An error has occurred.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Fade duration={800} delay={50}>
        <div className={styles.item}>
          {changePositionIsLoading ? (
            <img
              className={styles.loading}
              src="/img/Rolling-dark.svg"
              alt="rolling"
            />
          ) : (
            <div className={styles.arrow_wrapper}>
              <img
                onClick={(e) => onChangeButtonPosition(e, "UP")}
                className={styles.arrow}
                src="/img/up-arrow.png"
                alt="up-arrow"
              />
              <img
                onClick={(e) => onChangeButtonPosition(e, "DOWN")}
                className={styles.arrow}
                src="/img/down-arrow.png"
                alt="down-arrow"
              />
            </div>
          )}

          <p></p>
          <p>{index + 1}</p>
          <Switch
            checked={status}
            onChange={onSwitch}
            loading={editLoading}
            className={status ? styles.switch_on : styles.switch_off}
            style={{ width: "10px", borderRadius: "50px", padding: "0" }}
          />
          <p>{state.name}</p>
          <div className={styles.icons}>
            <FiEdit onClick={() => setShowModal(true)} />
            {loading ? (
              <img
                className={styles.loading}
                src="/img/Rolling-dark.svg"
                alt="rolling"
              />
            ) : (
              state.type !== "internal" && <MdDelete onClick={handleDelete} />
            )}
          </div>
        </div>
      </Fade>
      {showModal && (
        <AddModal
          edit
          data={state}
          setData={setData}
          refetchData={refetchData}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export default Item;
