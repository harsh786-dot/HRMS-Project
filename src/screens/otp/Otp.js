
import { useState, useRef } from "react";
import "./Otp.css";
import Dashboard from "../../assets/image/img_dashboard.png";
import left_arrow from "../../assets/icons/ic_left_arrow.png";
import { STRINGS } from "../../constants/strings";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../features/otpSlice/OtpSlice";
import { Link, useNavigate } from "react-router-dom";

const Otp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [box, setBox] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);

    const email = sessionStorage.getItem("resetEmail") || "";

    const { loading, success, error } = useSelector(
        (state) => state.otpVerify
    );

    const handleChange = (value, index) => {
        if (!/^\d*$/.test(value)) return;

        const digit = value.slice(-1);
        const newBox = [...box];

        newBox[index] = digit;
        setBox(newBox);

        if (digit && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !box[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();

        const savedEmail = sessionStorage
            .getItem("resetEmail")
            ?.trim();

        const otp = box.join("");

        if (!savedEmail) {
            alert("Email not found. Please try Forgot Password again.");
            navigate("/forgot");
            return;
        }

        if (otp.length !== 6) {
            alert("Please enter the complete 6-digit OTP.");
            return;
        }

        const payload = {
            email: savedEmail,
            otp: otp,
        };

        console.log("OTP API payload:", payload);

        try {
            const response = await dispatch(
                verifyOtp(payload)
            ).unwrap();

            console.log("OTP verification response:", response);

            navigate("/newPassword");
        } catch (err) {
            console.error("OTP verification failed:", err);
        }
    };

    return (
        <div className="otp-container">
            <div className="otp-left">
                <div className="otp-image">
                    <img src={Dashboard} alt="Dashboard" />
                </div>
            </div>

            <div className="otp-right">
                <div className="otp-back">
                    <Link to="/forgot">
                        <span>
                            <img src={left_arrow} alt="" />
                        </span>
                        {STRINGS.BACK}
                    </Link>
                </div>

                <br />

                <h3>{STRINGS.OTP}</h3>

                <br />

                <p>{STRINGS.PARA_OTP}</p>

                <form onSubmit={handleVerify}>
                    <div className="otp-inputs">
                        {box.map((value, index) => (
                            <input
                                key={index}
                                ref={(el) =>
                                    (inputRefs.current[index] = el)
                                }
                                type="text"
                                inputMode="numeric"
                                autoComplete={
                                    index === 0 ? "one-time-code" : "off"
                                }
                                maxLength={1}
                                value={value}
                                className="otp-input"
                                aria-label={`OTP digit ${index + 1}`}
                                onChange={(e) =>
                                    handleChange(
                                        e.target.value,
                                        index
                                    )
                                }
                                onKeyDown={(e) =>
                                    handleKeyDown(e, index)
                                }
                            />
                        ))}
                    </div>

                    <br />

                    <button type="submit" disabled={loading}>
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>

                    {error && (
                        <p style={{ color: "red" }}>
                            {typeof error === "string"
                                ? error
                                : error?.message ||
                                  error?.detail ||
                                  JSON.stringify(error)}
                        </p>
                    )}

                    {success && (
                        <p style={{ color: "green" }}>
                            OTP Verified Successfully!
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Otp;
