import { useRouter } from "next/router";
import { useState } from "react";

// icons
import { GoPrimitiveDot } from "react-icons/go";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

const SettingsEventTypeSelect = () => {
  // router
  const router = useRouter();

  // state
  const [info, setInfo] = useState(false);

  console.log(info);

  return (
    <div className="settings-event-type-select">
      <p>Select the type of event</p>
      <button onClick={() => router.push("/event-types/add")}>
        <GoPrimitiveDot /> 1:1 Live video call
      </button>
      <button onClick={() => router.push("event-types/add-async")}>
        <GoPrimitiveDot /> 1:1 Asynchronous video call
      </button>
      <div className="select-event-type-info" onClick={() => setInfo(true)}>
        <BsFillInfoCircleFill color="#7E88F4" />
        How does it work?
        {!info ? (
          <span></span>
        ) : (
          <div className="select-event-type-info-main">
            <AiFillCloseCircle
              onClick={(e) => {
                e.stopPropagation();
                setInfo(false);
              }}
              className="select-event-type-info-close"
            />
            <div>
              <h1>How does a 1:1 live video call work?</h1>
              <ol>
                <li>
                  You define the content and the price of the sessions you want
                  to propose
                </li>
                <li>You define your availabilities</li>
                <li>
                  Your clients book a slot directly from your calendar (public
                  profile url)
                </li>
                <li>
                  You receive the request in your email and in your calendar
                  (and Google calendar if you opted in for the sync), you can
                  still accept or reject it
                </li>
                <li>
                  We provide you with a unique link to start the video call
                  (yes, unique because we value your privacy!)
                </li>
                <li>
                  You perform the video call and we transfer the amount in your
                  balance
                </li>
              </ol>
            </div>
            <div>
              <h1>How does an asynchronous video call work?</h1>
              <ol>
                <li>
                  You define the content and the price of the sessions you want
                  to propose
                </li>
                <li>
                  You define precisely what your client needs to provide in
                  their request
                </li>
                <li>
                  Clients buy a session through your public profile and upload a
                  video with their question/request
                </li>
                <li>You receive the request directly in your mailbox</li>
                <li>
                  You have 7 days (or less if the client paid for an express
                  answer) to send your video answer
                </li>
                <li>
                  You send the video and we transfer the amount in your balance
                </li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsEventTypeSelect;
