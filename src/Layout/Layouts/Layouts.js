
import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import { Outlet, useLocation } from "react-router-dom";
import "./Layouts.css";

const Layouts = () => {
  const location = useLocation();

  const isMessagesPage =
    location.pathname === "/dashboard/messages";

  return (
    <div
      className={`layouts-container ${
        isMessagesPage ? "messages-layout" : ""
      }`}
    >
      {!isMessagesPage && (
        <div className="lay-sidebar">
          <Sidebar />
        </div>
      )}

      <div className="lay-main">
        {!isMessagesPage && (
          <div className="lay-Header">
            <Header
              title="Hello Robert 👋"
              subtitle="Good Morning"
            />
          </div>
        )}

        <div className="lay-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layouts;
