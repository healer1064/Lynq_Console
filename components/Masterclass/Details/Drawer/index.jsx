// libraries
import { Drawer } from "antd";

// styles
import styles from "./styles.module.sass";

// components
import PageLoading from "@/components/common/PageLoading";
import EmptyData from "@/components/common/EmptyData";
import Item from "./Item";

const RequestDrawer = ({ isOpen, toggle, data }) => {
  console.log(data);
  return (
    <Drawer
      title='Participants'
      placement='right'
      closable={true}
      onClose={toggle}
      visible={isOpen}
    >
      {!data ? (
        <PageLoading />
      ) : data.length == 0 ? (
        <div>
          <EmptyData title='No participants' />
        </div>
      ) : (
        <>
          <div className={styles.head}>
            <p>S.No</p>
            <p>First Name</p>
            <p>Last Name</p>
            <p>Email</p>
          </div>
          {data.map((item, index) => (
            <Item key={index} data={item} index={index} />
          ))}
        </>
      )}
    </Drawer>
  );
};

export default RequestDrawer;
