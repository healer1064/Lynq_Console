// libraries
import React, { useState, useEffect } from "react";

// styles
import styles from "./styles.module.scss";

// components
import AddNewButton from "@/components/common/AddButton";
import AddModal from "./AddModal";
import List from "./List";
import PageLoading from "@/components/common/PageLoading";

const index = ({ externalLinks, refetchData }) => {
  // states

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(externalLinks);

  useEffect(() => console.log(data), [data]);

  useEffect(() => {
    setData(externalLinks);
  }, [externalLinks]);

  return !data ? (
    <PageLoading />
  ) : (
    <>
      <div className={styles.external_links}>
        <AddNewButton
          title="New Button"
          style={{ width: "180px" }}
          onClick={() => setShowModal(true)}
        />
        <List setData={setData} list={data} refetchData={refetchData} />
      </div>
      {showModal && (
        <AddModal
          setData={setData}
          refetchData={refetchData}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export default index;
