import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../../assets/image/img_dashboard.png";
import left_arrow from "../../assets/icons/ic_left_arrow.png";
import "./NewPassword.css";
import {resetPassword, clearResetPasswordState} from "../../features/newPassSlice/NewPassSlice";
import Popup from "../otp/Popup";

const NewPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [validationError, setValidationError] = useState("");
    const { loading, success, error, message } = useSelector(
        (state) => state.newPassword);

    useEffect(() => {
        dispatch(clearResetPasswordState());
    }, [dispatch]);

    const getErrorMessage = (err) => {
        if (typeof err === "string") return err;
        if (err?.message) return err.message;
        if (err?.detail) return err.detail;
        if (err?.error) return err.error;
        if (err && typeof err === "object") {
            return Object.entries(err)
                .map(([key, value]) => {
                    const text = Array.isArray(value)
                        ? value.join(", ")
                        : String(value);
                    return `${key}: ${text}`;}).join(" ");}
        return "Unable to reset password. Please try again.";
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setValidationError("");
        const email = sessionStorage
            .getItem("resetEmail")
            ?.trim();
        if (!email) {
            setValidationError(
                "Email not found. Please try Forgot Password again."
            );
            return;
        }


        if (!password || !confirmPassword) {
            setValidationError(
                "Please fill both password fields."
            );
            return;
        }

        if (password.length < 8) {
            setValidationError(
                "Password must contain at least 8 characters."
            );
            return;
        }

        if (password !== confirmPassword) {
            setValidationError("Passwords do not match.");
            return;
        }

        const payload = {
            email,
            new_password: password,
            confirm_password: confirmPassword,
        };

        try {
            await dispatch(resetPassword(payload)).unwrap();
            sessionStorage.removeItem("resetOtp");
            sessionStorage.removeItem("resetEmail");
        } catch (err) {
            console.error("Password reset failed:", err);
        }
    };

    return (
        <div className="newPass-container">
            <div className="newPass-left">
                <div className="newPass-image">
                    <img src={Dashboard} alt="Dashboard" />
                </div>
            </div>

            <div className="newPass-right">
                {success ? (
                    <Popup />
                ) : (
                    <>
                        <div className="newPass-back">
                            <Link to="/otp">
                                <span>
                                    <img
                                        src={left_arrow}
                                        alt=""
                                    />
                                </span>
                                Back
                            </Link>
                        </div>

                        <br />

                        <h3>Reset Password</h3>

                        <br />

                        <form onSubmit={handleResetPassword}>
                            <div className="input-container">
                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    className="floating-input"
                                    placeholder=" "
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    autoComplete="new-password"
                                    required
                                />

                                <label>
                                    Enter New Password
                                </label>

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            (prev) => !prev
                                        )
                                    }
                                >
                                    {showPassword
                                        ? "Hide"
                                        : "Show"}
                                </button>
                            </div>

                            <br />

                            <div className="input-container">
                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    className="floating-input"
                                    placeholder=" "
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                    autoComplete="new-password"
                                    required
                                />

                                <label>
                                    Confirm New Password
                                </label>

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            (prev) => !prev
                                        )
                                    }
                                >
                                    {showConfirmPassword
                                        ? "Hide"
                                        : "Show"}
                                </button>
                            </div>

                            {validationError && (
                                <p className="password-error">
                                    {validationError}
                                </p>
                            )}

                            {error && (
                                <p className="password-error">
                                    {getErrorMessage(error)}
                                </p>
                            )}

                            <div className="newPass-send-otp">
                                <button
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Resetting..."
                                        : "Confirm"}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default NewPassword;