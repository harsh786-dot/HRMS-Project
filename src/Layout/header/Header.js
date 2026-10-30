import React from "react";
import "./Header.css";
import { Bell, ChevronDown } from "lucide-react";
import SearchBox from "../../component/searchBox/SearchBox";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PAGE_DETAILS from "../../constants/PageDetails";

const Header = ({ title, subtitle }) => {
  const location = useLocation();
  const currentPage = PAGE_DETAILS[location.pathname] || {
    title: "Dashboard",
    breadcrumb: ["Dashboard"],
  };
  const breadcrumb = currentPage.breadcrumb || [];
 
  return (
    <header className="header">
      <div className="header-left">
        <h2>{currentPage.title}</h2>

        <div className="breadcrumb">
          {currentPage.subtitle ? (
            <span>{currentPage.subtitle}</span>
          ) : (
            breadcrumb.map((item, index) => (
              <React.Fragment key={item}>
                {index > 0 && <span className="breadcrumb-separator">&gt;</span>}
                <span className={index === breadcrumb.length - 1 ? "active" : ""}>
                  {item}
                </span>
              </React.Fragment>
            ))
          )}
        </div>
      </div>

      <div className="header-right">
        <div className="search-box">
          <SearchBox />
        </div>

        <button className="notification-btn">
          <Link to="/dashboard/notifications"> {<Bell size={25} />}</Link>
        </button>

        <div className="profile">
          <img
            src="https://i.pravatar.cc/100" alt="profile" />
          <div className="profile-info">
            <h4>Robert Allen</h4>
            <p>HR Manager</p>
          </div>

          <Link to="/dashboard/myprofile"> <ChevronDown size={20} /> </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;