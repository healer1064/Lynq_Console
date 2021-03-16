// libraries
import { useState } from "react";

// components
import EventTypeEdit from "../EventTypeEdit/EventTypeEdit";

const SettingsEventTypeEdit = ({ setTab }) => {
  // states
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [needsCount, setNeedsCount] = useState(0);
  const [eventName, setEventName] = useState("");
  const [desc, setDesc] = useState("");
  const [needToBring, setNeedToBring] = useState("");
  const [duration, setDuration] = useState("");
  const [customDur, setCustomDur] = useState("");
  const [policy, setPolicy] = useState();

  return (
    <EventTypeEdit
      setTab={setTab}
      needsCount={needsCount}
      setNeedsCount={setNeedsCount}
      descriptionCount={descriptionCount}
      setDescriptionCount={setDescriptionCount}
      eventName={eventName}
      setEventName={setEventName}
      desc={desc}
      setDesc={setDesc}
      needToBring={needToBring}
      setNeedToBring={setNeedToBring}
      duration={duration}
      setDuration={setDuration}
      policy={policy}
      setPolicy={setPolicy}
      customDur={customDur}
      setCustomDur={setCustomDur}
    />
  );
};

export default SettingsEventTypeEdit;
