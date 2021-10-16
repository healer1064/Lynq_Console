// libraries
import React, { useState } from 'react';

// styles
import styles from './styles.module.scss';

// components
import AddNewButton from '@/components/common/AddButton';
import AddModal from './AddModal';
import { Menu } from 'antd';

const index = ({ externalLinks, setExternalLinks }) => {
  // states
  const [showModal, setShowModal] = useState(false);
  const [openKeys, setOpenKeys] = React.useState(['sub1']);

  // sub menu
  const { SubMenu } = Menu;

  const rootSubmenuKeys = externalLinks.map((item) => item.url);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <>
      <div className={styles.external_links}>
        <AddNewButton
          title='New Button'
          style={{ width: '180px' }}
          onClick={() => setShowModal(true)}
        />
        {externalLinks.length > 0 ? (
          <div className={styles.links}>
            <h3>Buttons list</h3>
            <Menu mode='inline' openKeys={openKeys} onOpenChange={onOpenChange}>
              {externalLinks.map((item) => (
                <SubMenu key={item.url} title={item.text}>
                  <Menu.Item key='1'>{item.url}</Menu.Item>
                </SubMenu>
              ))}
            </Menu>
          </div>
        ) : (
          <p className={styles.no_links}>No external links saved yet</p>
        )}
      </div>
      {showModal && (
        <AddModal
          setShowModal={setShowModal}
          setExternalLinks={setExternalLinks}
        />
      )}
    </>
  );
};

export default index;
