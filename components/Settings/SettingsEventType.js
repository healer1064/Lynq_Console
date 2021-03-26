// libraries
import { useContext, useState, useEffect } from "react";

// context
import ProfileContext from "../../context/profile";

// components
import EventList from "./EventList";
import AddNewButton from "../common/AddNewButton";
import PageLoading from "../common/PageLoading";
import EmptyData from "../common/EmptyData";

const SettingsEventType = ({ setTab }) => {
  const { token } = useContext(ProfileContext);

  const [data, setData] = useState();
  const [response, setResponse] = useState(false);

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

  useEffect(() => {
    getEventTypes();
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
          onClick={() => setTab("eventtypeadd")}
          title="Add Event Type"
        />
      </div>
      {!data ? (
        <PageLoading />
      ) : data.length === 0 ? (
        <EmptyData title="No event types to show" />
      ) : (
        <EventList
          response={response}
          setResponse={setResponse}
          events={data}
          setTab={setTab}
        />
      )}
    </>
  );
};

export default SettingsEventType;
