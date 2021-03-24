import React, { useState } from "react";
import { Drawer } from "antd";
import Fade from "react-reveal/Fade";
import "antd/dist/antd.css";

const RequestDrawer = ({ isOpen, toggle }) => {
  return (
    <Drawer
      width={440}
      title="Today Appointments"
      placement="right"
      closable={true}
      onClose={toggle}
      visible={isOpen}
    >
      <Fade duration={600}>
        <div>
          <h3>No Appointments For Today</h3>
        </div>
      </Fade>
    </Drawer>
  );
};

export default RequestDrawer;
