const EventTypeEdit = ({needsCount, setNeedsCount, descriptionCount, setDescriptionCount, showActionsHandle}) => {
    return (
        <div className="events-wrp">
            <div className="events-edit">
              <h2>Add a new event type</h2>
              <div className="events-edit__inner">
                <div className="events-edit__name">
                  <strong>Event Name*</strong>
                  <input type="text"/>
                </div>
                <div className="events-edit__col description">
                  <strong>Description*</strong>
                  <div className="events-edit__description__textarea">
                    <textarea maxlength="100" name="" id="" onChange={(e) => setDescriptionCount(e.target.value.length)} placeholder="100 Characters max">

                    </textarea>
                    <div className="count">{descriptionCount}/100</div>
                  </div>
                </div>
                <div className="events-edit__col need">
                  <strong>What people need to bring</strong>
                  <div className="events-edit__needs__textarea">
                    <textarea maxlength="100" name="" id="" onChange={(e) => setNeedsCount(e.target.value.length)} placeholder="100 Characters max">

                    </textarea>
                    <div className="count">{needsCount}/100</div>
                  </div>
                </div>
                <div className="events-edit__col radios">
                  <strong>Choose a duration</strong>
                  <div className="radios__predefined">
                    <label>
                      <input name="duration" type="radio"/>
                      <span>15 min</span>
                      <div className="checkmark"></div>
                    </label>
                    <label>
                      <input name="duration" type="radio"/>
                      <span>30 min</span>
                      <div className="checkmark"></div>
                    </label>
                    <label>
                      <input name="duration" type="radio"/>
                      <span>45 min</span>
                      <div className="checkmark"></div>
                    </label>
                    <label>
                      <input name="duration" type="radio"/>
                      <span>90 min</span>
                      <div className="checkmark"></div>
                    </label>
                  </div>
                  <strong>Choose custom duration (In minutes)</strong>
                  <label className="radios__custom">
                    <input name="duration" type="radio"/>
                    <div className="checkmark"></div>
                    <input type="text" placeholder="Example: 120 Min"/>
                  </label>
                </div>
                <div className="events-edit__col policy">
                  <strong>Cancelation policy*</strong>
                  <textarea name="" id=""></textarea>
                </div>
              </div>
              <div className="events-edit__btns">
                <button className="events-edit__btns-cancel">Cancel</button>
                <button className="events-edit__btns-save">Save</button>
              </div>
            </div>
          </div>
    )
}

export default EventTypeEdit
