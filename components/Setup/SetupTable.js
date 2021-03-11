import React from 'react'

const SetupTable = () => {
    return (
        <div className="setup-table">
              <div className="setup-table__title">
                Set your weekly hours
              </div>
              <div className="setup-table__row">
                <div className="setup-table__day">
                  <img src="/img/setup-check-unavailable.svg" alt=""/>
                  <span>sun</span>
                </div>
                <div className="setup-table__col">
                  <span className="unavailable">Unavailable</span>
                </div>
                <div className="setup-table__add">
                  <img src="/img/setup-add.svg" alt=""/>
                </div>
              </div>
              <div className="setup-table__row available">
                <div className="setup-table__day">
                  <img src="/img/setup-check-available.svg" alt=""/>
                  <span>mon</span>
                </div>
                <div className="setup-table__col">
                  <div className="time__row">
                    <input type="time" value="09:00"/>
                    <div className="line"></div>
                    <input type="time" value="17:00"/>
                    <div className="trash">
                      <img src="/img/setup-trash.svg" alt=""/>
                    </div>
                  </div>
                  <div className="time__row">
                    <input type="time" value="09:00"/>
                    <div className="line"></div>
                    <input type="time" value="19:00"/>
                    <div className="trash">
                      <img src="/img/setup-trash.svg" alt=""/>
                    </div>
                  </div>
                </div>
                <div className="setup-table__add">
                  <img src="/img/setup-add.svg" alt=""/>
                </div>
              </div>
              <div className="setup-table__row available">
                <div className="setup-table__day">
                  <img src="/img/setup-check-available.svg" alt=""/>
                  <span>tue</span>
                </div>
                <div className="setup-table__col">
                  <div className="time__row">
                    <input type="time" value="09:00"/>
                    <div className="line"></div>
                    <input type="time" value="17:00"/>
                    <div className="trash">
                      <img src="/img/setup-trash.svg" alt=""/>
                    </div>
                  </div>
                </div>
                <div className="setup-table__add">
                  <img src="/img/setup-add.svg" alt=""/>
                </div>
              </div>
              <div className="setup-table__row available">
                <div className="setup-table__day">
                  <img src="/img/setup-check-available.svg" alt=""/>
                  <span>wed</span>
                </div>
                <div className="setup-table__col">
                  <div className="time__row">
                    <input type="time" value="09:00"/>
                    <div className="line"></div>
                    <input type="time" value="17:00"/>
                    <div className="trash">
                      <img src="/img/setup-trash.svg" alt=""/>
                    </div>
                  </div>
                </div>
                <div className="setup-table__add">
                  <img src="/img/setup-add.svg" alt=""/>
                </div>
              </div>
              <div className="setup-table__row available">
                <div className="setup-table__day">
                  <img src="/img/setup-check-available.svg" alt=""/>
                  <span>thu</span>
                </div>
                <div className="setup-table__col">
                  <div className="time__row">
                    <input type="time" value="09:00"/>
                    <div className="line"></div>
                    <input type="time" value="17:00"/>
                    <div className="trash">
                      <img src="/img/setup-trash.svg" alt=""/>
                    </div>
                  </div>
                </div>
                <div className="setup-table__add">
                  <img src="/img/setup-add.svg" alt=""/>
                </div>
              </div>
              <div className="setup-table__row available">
                <div className="setup-table__day">
                  <img src="/img/setup-check-available.svg" alt=""/>
                  <span>fri</span>
                </div>
                <div className="setup-table__col">
                  <div className="time__row">
                    <input type="time" value="09:00"/>
                    <div className="line"></div>
                    <input type="time" value="17:00"/>
                    <div className="trash">
                      <img src="/img/setup-trash.svg" alt=""/>
                    </div>
                  </div>
                </div>
                <div className="setup-table__add">
                  <img src="/img/setup-add.svg" alt=""/>
                </div>
              </div>
              <div className="setup-table__row">
                <div className="setup-table__day">
                  <img src="/img/setup-check-unavailable.svg" alt=""/>
                  <span>sat</span>
                </div>
                <div className="setup-table__col">
                  <span className="unavailable">Unavailable</span>
                </div>
                <div className="setup-table__add">
                  <img src="/img/setup-add.svg" alt=""/>
                </div>
              </div>
            </div>
    )
}

export default SetupTable
