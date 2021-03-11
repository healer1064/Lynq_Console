const Settings = ({ active }) => {
  return (
    <>
      <div className="settings-types">
        <div className={`option ${active === "setup" && "active"}`}>Set Up</div>
        <div className={`option ${active === "eventtype" && "active"}`}>Event Type</div>
        <div className={`option ${active === "callsync" && "active"}`}>Call Sync</div>
      </div>
      <div className="settings-types__mobile">
        <select name="" id="">
          <option value="" selected={active === "setup" ? true : false}>Set Up</option>
          <option value="" selected={active === "eventtype" ? true : false}>Event Type</option>
          <option value="" selected={active === "callsync" ? true : false}>Call Sync</option>
        </select>
      </div>
    </>
  )
}

export default Settings
