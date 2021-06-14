// libraries
import { useState, useContext, useEffect } from "react";
import Fade from "react-reveal/Fade";

// styles
import styles from "./styles.module.sass";

// components
import PageLoading from "@/components/common/PageLoading";
import RequestsHead from "../Head";
import List from "../List";

const index = () => {
  // context
  //   const { token } = useContext(ProfileContext);

  // states
  const [requests, setRequests] = useState(null);
  const [asyncs, setAsyncs] = useState(null);
  const [filter, setFilter] = useState("All Active");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Fade>
        <div className="card-container">
          {requests || asyncs ? (
            <div className={styles.page_loading}>
              <PageLoading />
            </div>
          ) : (
            <>
              <RequestsHead
                filter={filter}
                setFilter={setFilter}
                setSearchTerm={setSearchTerm}
              />
              <List />
              {/* <RequestList
                requestList={
                  requestSearchTerm === ""
                    ? requests
                    : requests.filter(
                        (item) =>
                          item.activity_name
                            .toLowerCase()
                            .includes(requestSearchTerm.toLowerCase()) ||
                          item.email
                            .toLowerCase()
                            .includes(requestSearchTerm.toLowerCase())
                      )
                }
                asyncList={
                  requestSearchTerm === ""
                    ? asyncs
                    : asyncs.filter(
                        (item) =>
                          item.activityName
                            .toLowerCase()
                            .includes(requestSearchTerm.toLowerCase()) ||
                          item.customerEmail
                            .toLowerCase()
                            .includes(requestSearchTerm.toLowerCase())
                      )
                }
                filter={filter}
              /> */}
            </>
          )}
        </div>
      </Fade>
    </>
  );
};

export default index;
