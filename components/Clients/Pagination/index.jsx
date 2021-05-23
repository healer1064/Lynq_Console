// libraries
import { Pagination } from "antd";

// styles
import styles from "./styles.module.sass";

const index = ({ data, setData }) => {
  function onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
  }
  function onChange(page, pageSize) {
    setData(paginate(data, pageSize, page));
  }

  return (
    <div className={styles.pagination}>
      <Pagination
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        onChange={onChange}
        defaultCurrent={1}
        pageSizeOptions={[10, 25, 50, 100]}
        total={data.length}
      />
    </div>
  );
};

export default index;
