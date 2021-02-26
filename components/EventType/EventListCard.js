const EventListCard = ({card, index, showActionsHandle, activeItemsHandler}) => {
    return (
        <div className="events-row__card">
                    <strong>{card.title}</strong>
                    <div className="btm">
                      <div>
                        <span className="duration">
                          {card.duration} min
                        </span>
                        <span>${card.price}</span>
                      </div>
                      <label className="events-row__toggle">
                        {card.isActive ? (
                          <input type="checkbox" checked />
                        ) : (
                          <input type="checkbox" />
                        )}
                        <div className="toggle-control" onClick={() => activeItemsHandler(index)}></div>
                      </label>
                    </div>
                    <div className="see__more" onClick={() => showActionsHandle(index)}>
                      <img src="/img/events-see-more.svg" alt=""/>
                    </div>
                    <div className={`actions__popup ${card.showActions ? 'show' : ''}`}>
                      <div className="actions__popup-wrp">
                        <div className="close" onClick={() => showActionsHandle(index)}>
                          <img src="/img/events-actions-close.svg" alt=""/>
                        </div>
                        <span>
                          <img src="/img/events-edit-icon.svg" alt=""/>
                          Edit
                        </span>
                        <span>
                          <img src="/img/events-delete-icon.svg" alt=""/>
                          Delete
                        </span>
                      </div>
                    </div>
                  </div>
    )
}

export default EventListCard
