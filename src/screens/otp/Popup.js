import React from "react";
import "./Popup.css";
import { Link } from "react-router-dom";
import { STRINGS } from "../../constants/strings";

const Popup = () => {
    return (
        <div className="success-overlay">
            <div className="success-popup">
                <div className="success-icon">
                    🎉
                </div>
                <h2>
                    {STRINGS.POP_UPDATE}
                </h2>
                <p>
                    {STRINGS.POP_MSG}
                </p>
                <div className='send-otp'>
                            <Link to="/">
                            <button>{STRINGS.POP_BUTTON}</button>
                            </Link>
                            </div>
            </div>
        </div>
    );
};
export default Popup;