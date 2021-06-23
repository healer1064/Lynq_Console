// libraries
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";

// components
import Content from "@/components/Calendar/Content";
import PageLoading from "@/components/common/PageLoading";

// context
import ProfileContext from "@/context/profile";

// requests
import { getCallsList } from "@/utils/requests/calendar";

// helpers
import { filterByCurrWeek } from "@/utils/helpers/dates";
import { groupListInSectionsByDate } from "@/utils/helpers";

export default function Appointments() {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [data, setData] = useState(null);
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    if (token) {
      getCallsList(token)
        .then((res) => {
          setData(filterByCurrWeek(groupListInSectionsByDate(res)));
          setTemp(groupListInSectionsByDate(res));
        })
        .catch(() => toast.error("Failed to get the list!"));
    }
  }, [token]);

  const onWeekChange = (_start, _end) => {
    _start = format(_start, "yyyy-MM-dd");
    _end = format(_end, "yyyy-MM-dd");

    let filter = temp.filter(
      (item) =>
        new Date(item.date).getTime() >= new Date(_start).getTime() &&
        new Date(item.date).getTime() <= new Date(_end).getTime()
    );
    setData(filter);
  };

  return (
    <>
      <Head>
        <title>Calendar | Lynq</title>
      </Head>
      <div className="content-wrp wrp-1">
        {!data ? (
          <PageLoading />
        ) : (
          <Content data={data} onWeekChange={onWeekChange} />
        )}
      </div>
    </>
  );
}
