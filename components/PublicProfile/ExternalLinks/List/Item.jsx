// libraries
import React, { useState, useContext, useEffect } from "react";
import Fade from "react-reveal/Fade";
import Link from 'next/link'

// styles
import styles from "./styles.module.sass";

// utils
import { sortBy } from "lodash";

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

const Item = ({ data, index, refetchData, setData, allItems }) => {
  // states
  const [state, setState] = useState(data);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(state.is_enable);
  const [editLoading, setEditLoading] = useState(false);
  const [changePositionIsLoading, setChangePositionIsLoading] = useState(false);

  // Effect's
  useEffect(() => {
    setState(data);

    setStatus(data.is_enable);
  }, [data]);

  // context
  const { token } = useContext(ProfileContext);

  // handler's
  const onSwitch = (checked) => {
    setEditLoading(true);

    putLinkReq(token, state.id, {
      ...state,
      is_enable: checked,
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

    const currentIndex = allItems.findIndex((e) => e.id === state.id);

    putLinkReq(token, state.id, {
      ...state,
      position: action === "DOWN" ? state.position + 1 : state.position - 1,
    })
      .then((firstRes) =>
        putLinkReq(
          token,
          allItems[action === "DOWN" ? currentIndex + 1 : currentIndex - 1].id,
          {
            ...allItems[
              action === "DOWN" ? currentIndex + 1 : currentIndex - 1
            ],
            position: state.position,
          }
        )
          .then((secondRes) =>
            setData((prevState) => {
              const result = prevState.map((e) =>
                e.id === firstRes.id
                  ? firstRes
                  : e.id === secondRes.id
                  ? secondRes
                  : e
              );

              setStatus(firstRes.is_enable);

              setState(firstRes);

              return sortBy(result, (e) => e.position);
            })
          )
          .catch((e) => {
            toast.error("An error has occurred.");

            console.log("[Error while change button position]: ", e);
          })
      )
      .catch((e) => {
        toast.error("An error has occurred.");

        console.log("[Error while change button position]: ", e);
      })
      .finally(() => setChangePositionIsLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);

    deleteLinkReq(token, state.id)
      .then((res) =>
        setData((prevState) => prevState.filter((e) => e.id !== res.id))
      )
      .catch((e) => {
        toast.error("An error has occurred.");

        console.log("[Error while change button position]: ", e);
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
            allItems.length > 1 && (
              <div className={styles.arrow_wrapper}>
                {state.position !== 0 && (
                  <img
                    onClick={(e) => onChangeButtonPosition(e, "UP")}
                    className={styles.arrow}
                    src="/img/up-arrow.png"
                    alt="up-arrow"
                  />
                )}
                {state.position !== allItems.length - 1 && (
                  <img
                    onClick={(e) => onChangeButtonPosition(e, "DOWN")}
                    className={styles.arrow}
                    src="/img/down-arrow.png"
                    alt="down-arrow"
                  />
                )}
                
              </div>
            )
          )}

          <p>{index + 1}</p>
          <Switch
            checked={status}
            onChange={onSwitch}
            loading={editLoading}
            className={`${styles.switchButton} ${status ? styles.switch_on : styles.switch_off}`}
            style={{ width: "10px", borderRadius: "50px", padding: "0" }}
          />
          <p>{state.position < 5 ?<Link href={state.url} passHref><a>Manage</a></Link> : ''}</p>
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
