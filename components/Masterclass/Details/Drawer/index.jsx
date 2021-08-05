// libraries
import { Drawer } from "antd";

// styles
import styles from "./styles.module.sass";

// components
import { Tabs } from "antd";
import PageLoading from "@/components/common/PageLoading";
import EmptyData from "@/components/common/EmptyData";
import Item from "./Item";

const RequestDrawer = ({ isOpen, toggle, data }) => {
  // tabs
  const { TabPane } = Tabs;

  return (
    <Drawer placement='right' closable={true} onClose={toggle} visible={isOpen}>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Attendees' key='1'>
          {!data ? (
            <PageLoading />
          ) : data.filter((item) => item.status == "PAID").length == 0 ? (
            <div>
              <EmptyData title='No participants' />
            </div>
          ) : (
            <>
              <div className={styles.head}>
                <p>Order Id</p>
                <p>First Name</p>
                <p>Last Name</p>
                <p>Email</p>
              </div>
              {data
                .filter((item) => item.status == "PAID")
                .map((item, index) => (
                  <Item key={index} data={item} index={index} />
                ))}
            </>
          )}
        </TabPane>
        <TabPane tab='Canceled' key='2'>
          {!data ? (
            <PageLoading />
          ) : data.filter((item) => item.status == "CANCELLED").length == 0 ? (
            <div>
              <EmptyData title='No participants' />
            </div>
          ) : (
            <>
              <div className={styles.head}>
                <p>Order Id</p>
                <p>First Name</p>
                <p>Last Name</p>
                <p>Email</p>
              </div>
              {data
                .filter((item) => item.status == "CANCELLED")
                .map((item, index) => (
                  <Item key={index} data={item} index={index} />
                ))}
            </>
          )}
        </TabPane>
      </Tabs>
    </Drawer>
  );
};

export default RequestDrawer;
