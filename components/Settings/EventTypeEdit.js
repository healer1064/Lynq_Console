const EventTypeEdit = ({
  setTab,
  needsCount,
  setNeedsCount,
  descriptionCount,
  setDescriptionCount,
  eventName,
  setEventName,
  desc,
  setDesc,
  needToBring,
  setNeedToBring,
  duration,
  setDuration,
  policy,
  setPolicy,
  customDur,
  setCustomDur,
}) => {
  return (
    <div className="events-wrp">
      <div className="events-edit">
        <h2>Edit event type</h2>
        <div className="events-edit__inner">
          <div className="events-edit__name">
            <strong>Event Name*</strong>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          <div className="events-edit__col description">
            <strong>Description*</strong>
            <div className="events-edit__description__textarea">
              <textarea
                maxlength="100"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                  setDescriptionCount(e.target.value.length);
                }}
                placeholder="100 Characters max"
              ></textarea>
              <div className="count">{descriptionCount}/100</div>
            </div>
          </div>
          <div className="events-edit__col need">
            <strong>What people need to bring</strong>
            <div className="events-edit__needs__textarea">
              <textarea
                maxlength="100"
                value={needToBring}
                onChange={(e) => {
                  setNeedsCount(e.target.value.length);
                  setNeedToBring(e.target.value);
                }}
                placeholder="100 Characters max"
              ></textarea>
              <div className="count">{needsCount}/100</div>
            </div>
          </div>
          <div className="events-edit__col radios">
            <strong>Choose a duration</strong>
            <div className="radios__predefined">
              <label>
                <input
                  name="duration"
                  type="radio"
                  checked={duration === "15 min"}
                  onClick={() => setDuration("15 min")}
                />
                <span>15 min</span>
                <div className="checkmark"></div>
              </label>
              <label>
                <input
                  name="duration"
                  type="radio"
                  checked={duration === "30 min"}
                  onClick={() => setDuration("30 min")}
                />
                <span>30 min</span>
                <div className="checkmark"></div>
              </label>
              <label>
                <input
                  name="duration"
                  type="radio"
                  checked={duration === "45 min"}
                  onClick={() => setDuration("45 min")}
                />
                <span>45 min</span>
                <div className="checkmark"></div>
              </label>
              <label>
                <input
                  name="duration"
                  type="radio"
                  checked={duration === "90 min"}
                  onClick={() => setDuration("90 min")}
                />
                <span>90 min</span>
                <div className="checkmark"></div>
              </label>
            </div>
            <strong>Choose custom duration (In minutes)</strong>
            <label className="radios__custom">
              <input
                name="duration"
                type="radio"
                checked={duration === "custom"}
                onClick={() => setDuration("custom")}
              />
              <div className="checkmark"></div>
              <input
                disabled={duration !== "custom"}
                type="text"
                placeholder="Example: 120 Min"
                value={customDur}
                onChange={(e) => {
                  if (duration !== "custom") {
                    setCustomDur("");
                  } else {
                    setCustomDur(e.target.value);
                  }
                }}
              />
            </label>
          </div>
          <div className="events-edit__col policy">
            <strong>Cancellation policy*</strong>
            <textarea
              value={policy}
              onChange={(e) => setPolicy(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="events-edit__btns">
          <button
            onClick={() => setTab("eventtype")}
            className="events-edit__btns-cancel"
          >
            Cancel
          </button>
          <button className="events-edit__btns-save">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EventTypeEdit;
