// libraries
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Tabs } from "antd";

// styles
import "antd/dist/antd.css";

// context
import ProfileContext from "../../context/profile";

// components
import EventList from "./EventList";
import AddNewButton from "../common/AddNewButton";
import PageLoading from "../common/PageLoading";
import EmptyData from "../common/EmptyData";

const SettingsEventType = () => {
  const { token } = useContext(ProfileContext);

  const [data, setData] = useState();
  const [asyncData, setAsyncData] = useState();
  const [response, setResponse] = useState(false);

  // router
  const router = useRouter();

  // tabs
  const { TabPane } = Tabs;

  const getEventTypes = async () => {
    let config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
      },
    };

    const response = await fetch(
      `https://api.lynq.app/account/event-type?t=${token}`,
      config
    );
    const data = await response.json();

    setData(data);
  };

  const getAsync = async () => {
    let config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
      },
    };

    const response = await fetch(
      `https://api.lynq.app/async/type?t=${token}`,
      config
    );
    const data = await response.json();

    setAsyncData(data);
  };

  useEffect(() => {
    getEventTypes();
    // getAsync();
  }, [response, token]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "20px",
        }}
      >
        <AddNewButton
          onClick={() => router.push("select-event-type")}
          title="Add Event Type"
        />
      </div>
      <Tabs defaultActiveKey="1" type="card" size="large">
        <TabPane tab="Live " key="1">
          {!data ? (
            <PageLoading />
          ) : data.length === 0 ? (
            <EmptyData title="No event types to show" />
          ) : (
            <EventList
              response={response}
              setResponse={setResponse}
              events={data}
            />
          )}
        </TabPane>
        <TabPane tab="Asynchronous" key="2">
          {!data ? (
            <PageLoading />
          ) : data.length === 0 ? (
            <EmptyData title="No event types to show" />
          ) : (
            <EventList
              response={response}
              setResponse={setResponse}
              events={data}
              // events={asyncData}
            />
          )}
        </TabPane>
      </Tabs>
    </>
  );
};

export default SettingsEventType;
