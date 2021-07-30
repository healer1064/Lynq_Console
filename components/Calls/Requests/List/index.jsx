// libraries
import { useState, useEffect } from "react";

// styles
import styles from "./styles.module.sass";

// components
import EmptyData from "@/components/common/EmptyData";
import Head from "./Head";
import Item from "./Item";

const index = ({ list, filter }) => {
  // states
  const [data, setData] = useState(list);
  const [order, setOrder] = useState("received_asc");

  // filter using filter
  useEffect(() => {
    if (filter == "All") {
      setData(list);
    } else if (filter == "To Validate") {
      const arr = list.filter(
        (item) => new Date(item.starting_date) > new Date(),
      );
      setData(arr);
    } else if (filter == "Expired") {
      setData(list.filter((item) => new Date(item.ending_date) < new Date()));
    }
  }, [list, filter]);

  // sort
  const sortArray = (array) => {
    switch (order) {
      case "received_asc":
        return array.sort(
          (a, b) => new Date(b.create_date) - new Date(a.create_date),
        );
      case "received_desc":
        return array.sort(
          (a, b) => new Date(a.create_date) - new Date(b.create_date),
        );
      case "length_asc":
        return array.sort((a, b) => a.session_duration - b.session_duration);
      case "length_desc":
        return array.sort((a, b) => b.session_duration - a.session_duration);
      case "date_asc":
        return array.sort(
          (a, b) => new Date(a.starting_date) - new Date(b.starting_date),
        );
      case "date_desc":
        return array.sort(
          (a, b) => new Date(b.starting_date) - new Date(a.starting_date),
        );
      case "status_asc":
        return array.sort(
          (a, b) =>
            new Date(a.starting_date) <
            new Date() - new Date(b.starting_date) <
            new Date(),
        );
      case "status_desc":
        return array.sort(
          (a, b) =>
            new Date(b.starting_date) <
            new Date() - new Date(a.starting_date) <
            new Date(),
        );
      default:
        break;
    }
  };

  console.log(data);

  return data && data.length === 0 ? (
    <div className={styles.no_appointments}>
      <EmptyData title='No requests to show' />
    </div>
  ) : (
    <div className={styles.list}>
      <Head order={order} setOrder={setOrder} />
      {sortArray(data).map((item, index) => (
        <Item key={index} data={item} />
      ))}
    </div>
  );
};

export default index;
