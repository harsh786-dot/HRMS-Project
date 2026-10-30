
import "./Forgot.css";
import { useState } from "react";
import Dashboard from "../../assets/image/img_dashboard.png";
import { Link, useNavigate } from "react-router-dom";
import left_arrow from "../../assets/icons/ic_left_arrow.png";
import { STRINGS } from "../../constants/strings";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../../features/forgotSlice/ForgotSlice";

const Forgot = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const {
        loading,
        success,
        message,
        error,
    } = useSelector((state) => state.forgotPassword);

    const handleSendOtp = async (e) => {
        e.preventDefault();

        const enteredEmail = email.trim();

        if (!enteredEmail) {
            alert("Please enter your email.");
            return;
        }

        try {
            await dispatch(sendOtp(enteredEmail)).unwrap();

            // Save the same email for OTP verification
            sessionStorage.setItem("resetEmail", enteredEmail);

            navigate("/otp", {
                state: { email: enteredEmail },
            });
        } catch (err) {
            console.error("OTP request failed:", err);
        }
    };

    return (
        <form onSubmit={handleSendOtp}>
            <div className="forgot-container">
                <div className="forgot-left">
                    <div className="forgot-image">
                        <img src={Dashboard} alt="Dashboard" />
                    </div>
                </div>

                <div className="forgot-right">
                    <div className="forgot-back">
                        <Link to="/">
                            <span>
                                <img src={left_arrow} alt="" />
                            </span>
                            {STRINGS.BACK}
                        </Link>
                    </div>

                    <br />

                    <h3>{STRINGS.FORGOT}</h3>

                    <br />

                    <p>{STRINGS.PARA_FORGOT}</p>

                    <div className="input-containers">
                        <input
                            type="email"
                            className="floating-input"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label>{STRINGS.EMAIL}</label>
                    </div>

                    <br />

                    <div className="send-otp">
                        <button type="submit" disabled={loading}>
                            {loading ? "Sending OTP..." : "Send OTP"}
                        </button>

                        {success && message && (
                            <p>{message}</p>
                        )}

                        {error && (
                            <p style={{ color: "red" }}>
                                {typeof error === "string"
                                    ? error
                                    : error?.message ||
                                      error?.detail ||
                                      JSON.stringify(error)}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Forgot;
