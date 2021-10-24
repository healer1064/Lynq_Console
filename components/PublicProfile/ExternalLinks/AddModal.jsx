// libraries
import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.scss";

// context
import ProfileContext from "@/context/profile";

// requests
import { postLinkReq, putLinkReq } from "@/utils/requests/public-profile";

// components
import Loading from "@/components/common/Loading";

const AddModal = ({ setShowModal, edit, data, setData }) => {
  // states
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data && edit) {
      setText(data.name);
      setUrl(data.url);
    }
  }, [data]);

  // context
  const { token } = useContext(ProfileContext);

  // handle click
  const handleSave = (e) => {
    e.preventDefault();

    if (text === "" && url === "") {
      toast.error("Please fill the fields first!");
    } else {
      setLoading(true);

      postLinkReq(token, {
        position: data.length ? data.length : 0,
        name: text,
        url,
        type: "external",
        is_enable: true,
        creation_date: new Date(),
      })
        .then((res) => {
          setData((prevState) =>
            prevState.length ? [...prevState, res] : [res]
          );

          setShowModal(false);
          setText("");
          setUrl("");
        })
        .catch((e) => {
          toast.error("An error has occurred.");

          console.log("[Error while create new Button]: ", e);
        })
        .finally(() => setLoading(false));
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();

    if (text === "" && url === "") {
      toast.error("Please fill the fields first!");
    } else {
      setLoading(true);

      putLinkReq(token, data.id, { ...data, name: text, url })
        .then((res) => {
          setData((prevState) =>
            prevState.map((e) =>
              e.id === res.id ? { ...data, name: res.name, url: res.url } : e
            )
          );

          setShowModal(false);
          setText("");
          setUrl("");
        })
        .catch(() => {
          toast.error("An error has occurred.");

          console.log("[Error while create new Button]: ", e);
        })
        .finally(() => setLoading(true));
    }
  };

  return (
    <div className={styles.modal} onClick={() => setShowModal(false)}>
      <form className={styles.inner} onClick={(e) => e.stopPropagation()}>
        <div>
          <label>Button Text</label>
          <input
            type="text"
            placeholder="Enter the text to display on the button"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        {edit ? (
          data.type !== "internal" && (
            <div>
              <label>URL</label>
              <input
                placeholder="Enter the URL"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          )
        ) : (
          <div>
            <label>URL</label>
            <input
              placeholder="Enter the URL"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        )}
        <button
          onClick={(e) => {
            edit ? handleEdit(e) : handleSave(e);
          }}
          style={{ position: "relative" }}
        >
          {loading ? <Loading /> : "Save"}
        </button>
      </form>
    </div>
  );
};

export default AddModal;
