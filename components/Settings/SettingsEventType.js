// libraries
import { useContext } from "react";
import useSWR from "swr";

// utils
import fetcher from "../../utils/fetcher";

// context
import ProfileContext from "../../context/profile";

// components
import EventList from "./EventList";
import AddNewButton from "../common/AddNewButton";
import PageLoading from "../common/PageLoading";
import EmptyData from "../common/EmptyData";

const SettingsEventType = ({ setTab }) => {
  const { token } = useContext(ProfileContext);

  const { data, error } = useSWR(
    ["/api/settings/get-event-types", token],
    fetcher
  );

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
        <EventList events={data} setTab={setTab} />
      )}
    </>
  );
};

export default SettingsEventType;
