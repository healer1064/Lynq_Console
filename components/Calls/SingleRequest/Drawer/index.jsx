// libraries
import { useState, useEffect, useContext } from "react";
import moment from "moment";
import { Drawer } from "antd";
import { toast } from "react-toastify";

// context
import ProfileContext from "@/context/profile";

// requests
import { getCallsList } from "@/utils/requests/calendar";

// helpers
import { getCurrentDaySessions } from "@/utils/helpers";

// components
import PageLoading from "@/components/common/PageLoading";
import EmptyData from "@/components/common/EmptyData";
import Item from "./Item";

const RequestDrawer = ({ isOpen, toggle, day }) => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    if (token) {
      getCallsList(token)
        .then((res) => {
          const arr = getCurrentDaySessions(res, day);
          if (arr.length > 0) {
            const sortedList = arr[0].appointments.sort(
              (a, b) => new Date(b.starting_date) - new Date(a.starting_date)
            );
            setAppointments(sortedList);
          } else {
            setAppointments([]);
          }
        })
        .catch(() => {
          toast.error("Failed to get the list!");
        });
    }
    return () => {
      setAppointments(null);
    };
  }, [token]);

  return (
    <Drawer
      width={440}
      title={moment().format("ddd, MMM DD, YYYY")}
      placement="right"
      closable={true}
      onClose={toggle}
      visible={isOpen}
    >
      {!appointments ? (
        <PageLoading />
      ) : appointments.length == 0 ? (
        <div>
          <EmptyData title="No appointments" />
        </div>
      ) : (
        appointments.map((item, index) => <Item key={index} data={item} />)
      )}
    </Drawer>
  );
};

export default RequestDrawer;
