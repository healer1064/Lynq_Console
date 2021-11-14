// libraries
import { useState, useEffect } from 'react';
import moment from 'moment';

// styles
import styles from './styles.module.sass';

// components
import EmptyData from '@/components/common/EmptyData';
import Head from './Head';
import Item from './Item';
import Pagination from '../../common/Pagination';

const LIST_DATA = [{id: 'sadas', price: 100, path: 'asdas.png'}]

const index = ({ list, filter }) => {
  // states
  const [data, setData] = useState(list);
  const [order, setOrder] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  // filter using filter
  useEffect(() => {
    if (filter == "All") {
      setData(list);
    } else if (filter == "Video") {
      const arr = list.filter((item) => item.type == "video");
      setData(arr);
    } else if (filter == "Picture") {
      setData(
        list.filter(
          (item) => item.type == "image"
        ),
      );
    }
  }, [list, filter]);

  // sort
  const sortArray = (array) => {
    switch (order) {
      case "date_asc":
        return array.sort((a, b) => new Date(a.date) - new Date(b.date));
      case "date_desc":
        return array.sort((a, b) => new Date(b.date) - new Date(a.date));
      case "length_asc":
        return array.sort((a, b) => a.duration - b.duration);
      case "length_desc":
        return array.sort((a, b) => b.duration - a.duration);
      case "price_asc":
        return array.sort((a, b) => a.price - b.price);
      case "price_desc":
        return array.sort((a, b) => b.price - a.price);
      case "attendees_asc":
        return array.sort((a, b) => a.attendees?.length - b.attendees?.length);
      case "attendees_desc":
        return array.sort((a, b) => b.attendees?.length - a.attendees?.length);
      case "revenue_asc":
        return array.sort((a, b) => a.revenue - b.revenue);
      case "revenue_desc":
        return array.sort((a, b) => b.revenue - a.revenue);
      default:
        return array.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
    }
  };


  return data.length === 0 ? (
    <div className={styles.no_appointments}>
      <EmptyData title='No exlusive content to show' />
    </div>
  ) : (
    <div className={styles.list}>
      <Head order={order} setOrder={setOrder} />
      {sortArray(data).map((item, index) => (
        <Item key={index} data={item} />
      ))}
      <Pagination
          filteredData={data}
          setPageSize={setPageSize}
          setPageNumber={setPageNumber}
        />
    </div>
  );
};

export default index;
