import React from "react";
import "./topbar.css";
import { Button } from "antd";
import "antd/dist/antd.css";
import { LogoutOutlined } from "@ant-design/icons";

export default function topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Calistenia Admin</span>
        </div>

        <div className="btnSalir">
          <Button type="default" shape="round">
            <LogoutOutlined />
            Salir
          </Button>
        </div>
      </div>
    </div>
  );
}
