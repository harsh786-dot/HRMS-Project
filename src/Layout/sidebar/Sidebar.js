import "./Sidebar.css";
import Button from "../../component/button/Button";
import Logo from "../../assets/image/img_logo.png";
import { STRINGS } from "../../constants/strings";
import { NavLink } from "react-router-dom";
import MENU_ITEMS from "../../constants/MenuItems";

const Sidebar = () => {

    return (
        <div className="sidebar-container">
            <div className="sidebar-logo">
                <div className="sidbarr">
                    <img src={Logo} alt="HRMS Logo" />
                    <h1>{STRINGS.TITLE}</h1>
                </div>

                <div className="sidebar-main">
                    <nav>
                        {MENU_ITEMS.map((item) => (
                            <NavLink
                                to={item.path}
                                key={item.name}
                                end={item.name === "Dashboard"}
                                className={({ isActive }) =>
                                    `menu-item ${isActive ? "active" : ""}`}>
                                <span>{item.icon}</span>
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="sidebars-button">
                        <Button
                            icon="👋"
                            text="Light"
                            width="110px"
                            height="50px"
                            backgroundColor="#7152F3"
                            border="1px solid #7152F3"
                            color="#ffff"
                            borderRadius="10px"
                        />

                        <Button
                            text="Dark"
                            icon="💖"
                            width="110px"
                            height="50px"
                            backgroundColor="#A2A1A80D"
                            border="1px solid #A2A1A80D"
                            color="#16151C"
                            borderRadius="10px"
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;