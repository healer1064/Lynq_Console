// libraries
import { Pagination } from "antd";

// styles
import styles from "./styles.module.sass";

const index = ({ filteredData, setPageSize, setPageNumber }) => {
  function onShowSizeChange(pageNumber, pageSize) {
    setPageNumber(pageNumber);
    setPageSize(pageSize);
  }
  function onChange(pageNumber, pageSize) {
    setPageNumber(pageNumber);
    setPageSize(pageSize);
  }

  return (
    <div className={styles.pagination}>
      <Pagination
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        onChange={onChange}
        defaultCurrent={1}
        pageSizeOptions={[10, 25, 50, 100]}
        total={filteredData.length}
      />
    </div>
  );
};

export default index;
