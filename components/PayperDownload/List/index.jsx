// libraries
import { useState, useEffect } from 'react';
import moment from 'moment';

// styles
import styles from './styles.module.sass';

// components
import EmptyData from '@/components/common/EmptyData';
import Head from './Head';
import Item from './Item';

const index = ({ list, filter }) => {
  // states
  const [data, setData] = useState(list);
  const [order, setOrder] = useState('');

  // filter using filter
  // useEffect(() => {
  //   if (filter == "All") {
  //     setData(list);
  //   } else if (filter == "Upcoming") {
  //     const arr = list.filter((item) => new Date(item.date) > new Date());
  //     setData(arr);
  //   } else if (filter == "Expired") {
  //     setData(
  //       list.filter(
  //         (item) => moment(item.date).add(item.duration, "minutes") < moment(),
  //       ),
  //     );
  //   }
  // }, [list, filter]);

  // sort
  // const sortArray = (array) => {
  //   switch (order) {
  //     case "date_asc":
  //       return array.sort((a, b) => new Date(a.date) - new Date(b.date));
  //     case "date_desc":
  //       return array.sort((a, b) => new Date(b.date) - new Date(a.date));
  //     case "length_asc":
  //       return array.sort((a, b) => a.duration - b.duration);
  //     case "length_desc":
  //       return array.sort((a, b) => b.duration - a.duration);
  //     case "price_asc":
  //       return array.sort((a, b) => a.price - b.price);
  //     case "price_desc":
  //       return array.sort((a, b) => b.price - a.price);
  //     case "attendees_asc":
  //       return array.sort((a, b) => a.attendees.length - b.attendees.length);
  //     case "attendees_desc":
  //       return array.sort((a, b) => b.attendees.length - a.attendees.length);
  //     case "revenue_asc":
  //       return array.sort((a, b) => a.revenue - b.revenue);
  //     case "revenue_desc":
  //       return array.sort((a, b) => b.revenue - a.revenue);
  //     default:
  //       return array.sort(
  //         (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  //       );
  //   }
  // };

  return data.length === 0 ? (
    <div className={styles.no_appointments}>
      <EmptyData title='No exlusive content to show' />
    </div>
  ) : (
    <div className={styles.list}>
      <Head order={order} setOrder={setOrder} />
      {data.map((item, index) => (
        <Item key={index} data={item} />
      ))}
    </div>
  );
};

export default index;
