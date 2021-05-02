// libraries
import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import Fade from "react-reveal/Fade";
import { toast } from "react-toastify";
import { Tabs } from "antd";
import { Dropdown, Button } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

// styles
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

// context
import ProfileContext from "../../../context/profile";

// components
import RequestList from "../../../components/Appointments/Request/RequestList";
import PageLoading from "../../../components/common/PageLoading";
import DropdownMenu from "../../../components/common/DropdownMenu";
import SearchInput from "../../../components/common/SearchInput";
import InvitationsList from "../../../components/Appointments/Invitations/InvitationsList";

export default function Appointments() {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [requests, setRequests] = useState(null);
  const [invitations, setInvitations] = useState(null);
  const [success, setSuccess] = useState(false);
  const [filter, setFilter] = useState("All");
  const [requestSearchTerm, setRequestSearchTerm] = useState("");
  const [sentSearchTerm, setSentSearchTerm] = useState("");

  // tabs
  const { TabPane } = Tabs;

  useEffect(() => {
    if (token) {
      fetchRequests();
      fetchInvitations();
    }
  }, [token, success]);

  const fetchRequests = async () => {
    const config = {
      method: "GET",
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        `https://api.lynq.app/account/appointments/requests?t=${token}`,
        config
      );
      const _data = await response.json();
      setRequests(_data.reverse());
    } catch (err) {
      setRequests([]);
      toast.error("Error, Failed to Fetch Request List!!!");
    }
  };

  const fetchInvitations = async () => {
    const config = {
      method: "GET",
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        `https://api.lynq.app/account/appointments/pending_payments?t=${token}`,
        config
      );
      const _data = await response.json();
      setInvitations(_data.reverse());
    } catch (err) {
      setInvitations([]);
      toast.error("Error, Failed to Fetch Invitation List!!!");
    }
  };

  return (
    <>
      <Head>
        <title>Requests | Lynq</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="content-wrp">
        <Fade>
          <br />
          <div className="card-container">
            <Tabs type="card" size="large">
              <TabPane tab="Received" key="1">
                <br />
                <br />
                {!requests ? (
                  <PageLoading />
                ) : (
                  <>
                    <div className="requests-menu-search">
                      <Dropdown
                        arrow
                        overlay={
                          <DropdownMenu
                            state={filter}
                            setState={setFilter}
                            data={["All", "Scheduled", "Asynchronous"]}
                          />
                        }
                        placement="bottomCenter"
                      >
                        <Button className="requests-dropdown-btn" size="large">
                          {filter} <CaretDownOutlined />
                        </Button>
                      </Dropdown>
                      <SearchInput setState={setRequestSearchTerm} />
                    </div>
                    <RequestList
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
                      success={success}
                      setSuccess={setSuccess}
                    />
                  </>
                )}
              </TabPane>
              <TabPane tab="Sent" key="2">
                <br />
                <br />
                {!invitations ? (
                  <PageLoading />
                ) : (
                  <>
                    <div className="invitations-menu-search">
                      <SearchInput setState={setSentSearchTerm} />
                    </div>
                    <InvitationsList
                      invitationsList={
                        sentSearchTerm === ""
                          ? invitations
                          : invitations.filter(
                              (item) =>
                                item.activity_name
                                  .toLowerCase()
                                  .includes(sentSearchTerm.toLowerCase()) ||
                                item.email
                                  .toLowerCase()
                                  .includes(sentSearchTerm.toLowerCase())
                            )
                      }
                      success={success}
                      setSuccess={setSuccess}
                    />
                  </>
                )}
              </TabPane>
            </Tabs>
          </div>
        </Fade>
      </div>
    </>
  );
}
