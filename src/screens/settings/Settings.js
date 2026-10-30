import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./Settings.css";

const Settings = () => {

    const [appearance, setAppearance] = useState("Light");
    const [language, setLanguage] = useState("English");

    const [settings, setSettings] = useState({
        twoFactor: true,
        mobilePush: true,
        desktopNotification: true,
        emailNotification: true,
    });

    const handleToggle = (key) => {
        setSettings((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <div className="settings-container">
            <div className="settings-row">
                <div className="settings-info">
                    <h3>Appearance</h3>
                    <p>Customize how your theme looks on your device</p>
                </div>

                <div className="settings-select">
                    <select
                        value={appearance}
                        onChange={(e) => setAppearance(e.target.value)}>
                        <option value="Light">Light</option>
                        <option value="Dark">Dark</option>
                    </select>

                    <ChevronDown size={20} />
                </div>
            </div>

            <div className="settings-row">
                <div className="settings-info">
                    <h3>Language</h3>
                    <p>Select your language</p>
                </div>

                <div className="settings-select">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                    </select>
                    <ChevronDown size={20} />
                </div>
            </div>

            <div className="settings-row">
                <div className="settings-info">
                    <h3>Two-factor Authentication</h3>
                    <p>
                        Keep your account secure by enabling 2FA via mail
                    </p>
                </div>
                <Toggle
                    checked={settings.twoFactor}
                    onChange={() => handleToggle("twoFactor")}
                />
            </div>

            <div className="settings-row">
                <div className="settings-info">
                    <h3>Mobile Push Notifications</h3>
                    <p>
                        Receive push notification
                    </p>
                </div>
                <Toggle
                    checked={settings.mobilePush}
                    onChange={() => handleToggle("mobilePush")}
                />
            </div>


            <div className="settings-row">
                <div className="settings-info">
                    <h3>Desktop Notification</h3>
                    <p>
                        Receive push notification in desktop
                    </p>
                </div>
                <Toggle
                    checked={settings.desktopNotification}
                    onChange={() =>
                        handleToggle("desktopNotification")
                    }
                />
            </div>

            <div className="settings-row">
                <div className="settings-info">
                    <h3>Email Notifications</h3>
                    <p>
                        Receive email notification
                    </p>

                </div>

                <Toggle
                    checked={settings.emailNotification}
                    onChange={() =>
                        handleToggle("emailNotification")
                    }
                />
            </div>
        </div>
    );
};

const Toggle = ({ checked, onChange }) => {
    return (
        <label className="toggle">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <span className="toggle-slider"></span>
        </label>
    );
};

export default Settings;