// libraries
import { useContext } from "react";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// requests
import { delSlotReq } from "@/utils/requests/settings/availabilities";

// components
import PageLoading from "@/components/common/PageLoading";
import Row from "./Row";
import Item from "@/components/Dashboard/Stats/Item";

const days = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const SetupTable = ({ data, toggleSuccess }) => {
  // context
  const { token } = useContext(ProfileContext);

  // handle remove slot
  const removeTimeSlot = (_id) => {
    delSlotReq(_id, token)
      .then((res) => {
        if (res.status == 200) {
          toggleSuccess();
        } else {
          toast.error("Failed to remove the slot.");
        }
      })
      .catch(() => {
        toast.error("Failed to remove the slot.");
      });
  };

  const filterData = (day) => {
    const slots = data.filter((i) => i.day.toLowerCase() == day);
    return slots;
  };

  return (
    <div className={styles.table}>
      {!data ? (
        <div className={styles.loading}>
          <PageLoading />
        </div>
      ) : (
        <>
          <div className={styles.title}>Set your weekly hours</div>
          {days.map((day, index) => {
            return (
              <Row
                key={index}
                day={day}
                data={filterData(day.toLowerCase())}
                deleteTime={removeTimeSlot}
                toggleSuccess={toggleSuccess}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default SetupTable;
