
import { useState } from "react";
import { X, CalendarDays, ChevronDown } from "lucide-react";
import "./ApplyLeave.css";

const ApplyLeave = ({ onClose }) => {
    const [leaveType, setLeaveType] = useState("CL");
    const [periodType, setPeriodType] = useState("single");
    const [dayType, setDayType] = useState("full");
    const [startDate, setStartDate] = useState("2026-10-13");
    const [endDate, setEndDate] = useState("2026-10-13");
    const [reason, setReason] = useState("");
    const [attachment, setAttachment] = useState(null);
    const [error, setError] = useState("");

    const leaveTypes = [
        { value: "CL", label: "Casual Leave (CL) - 3 Balance" },
        { value: "SL", label: "Sick Leave (SL) - 5 Balance" },
        { value: "EL", label: "Earned Leave (EL) - 10 Balance" },
    ];

    const getTotalDays = () => {
        if (!startDate) return 0;

        if (periodType === "single") {
            return dayType === "full" ? 1 : 0.5;
        }

        if (!endDate || endDate < startDate) return 0;

        const start = new Date(`${startDate}T00:00:00`);
        const end = new Date(`${endDate}T00:00:00`);

        const difference =
            Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;

        return Math.max(0, difference);
    };

    const formatDate = (date) => {
        if (!date) return "";
        return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!reason.trim()) {
            setError("Reason is required");
            return;
        }

        if (!startDate || !endDate) {
            setError("Please select the leave date");
            return;
        }

        if (periodType === "multiple" && endDate < startDate) {
            setError("End date cannot be before start date");
            return;
        }

        const leaveData = {
            leaveType,
            periodType,
            dayType: periodType === "single" ? dayType : "full",
            startDate,
            endDate: periodType === "multiple" ? endDate : startDate,
            totalDays: getTotalDays(),
            reason: reason.trim(),
            attachment,
        };

        console.log("Leave Application:", leaveData);
        alert("Leave application submitted successfully!");

        if (onClose) onClose();
    };

    return (
        <div className="leave-modal-overlay">
            <div
                className="leave-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="leave-modal-title"
            >
                <div className="leave-modal-header">
                    <h2 id="leave-modal-title">Apply Leave</h2>

                    <button
                        type="button"
                        className="leave-close-btn"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <X size={23} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="leave-modal-body">
                        <div className="leave-field leave-type-field">
                            <label htmlFor="leaveType">
                                Select Leave Type <span>*</span>
                            </label>

                            <div className="leave-select-wrapper">
                                <select
                                    id="leaveType"
                                    value={leaveType}
                                    onChange={(e) =>
                                        setLeaveType(e.target.value)
                                    }
                                >
                                    {leaveTypes.map((leave) => (
                                        <option
                                            key={leave.value}
                                            value={leave.value}
                                        >
                                            {leave.label}
                                        </option>
                                    ))}
                                </select>

                                <ChevronDown size={18} />
                            </div>
                        </div>

                        <h3 className="leave-section-title">
                            Leave Period
                        </h3>

                        <div className="leave-radio-group">
                            <label className="leave-radio-option">
                                <input
                                    type="radio"
                                    name="periodType"
                                    checked={periodType === "single"}
                                    onChange={() => {
                                        setPeriodType("single");
                                        setEndDate(startDate);
                                    }}
                                />
                                <span>Half Day / Full Day</span>
                            </label>

                            <label className="leave-radio-option">
                                <input
                                    type="radio"
                                    name="periodType"
                                    checked={periodType === "multiple"}
                                    onChange={() => {
                                        setPeriodType("multiple");
                                        setDayType("full");
                                    }}
                                />
                                <span>Multiple Days</span>
                            </label>
                        </div>

                        <div className="leave-date-row">
                            <div className="leave-date-fields">
                                <div className="leave-field leave-date-field">
                                    <label htmlFor="startDate">
                                        {periodType === "single"
                                            ? "Date *"
                                            : "From Date *"}
                                    </label>

                                    <div className="leave-date-input">
                                        <input
                                            id="startDate"
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => {
                                                setStartDate(e.target.value);

                                                if (
                                                    periodType === "single"
                                                ) {
                                                    setEndDate(e.target.value);
                                                }
                                            }}
                                            required
                                        />
                                        <CalendarDays size={18} />
                                    </div>
                                </div>

                                {periodType === "multiple" && (
                                    <div className="leave-field leave-date-field">
                                        <label htmlFor="endDate">
                                            To Date *
                                        </label>

                                        <div className="leave-date-input">
                                            <input
                                                id="endDate"
                                                type="date"
                                                min={startDate}
                                                value={endDate}
                                                onChange={(e) =>
                                                    setEndDate(e.target.value)
                                                }
                                                required
                                            />
                                            <CalendarDays size={18} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {periodType === "single" && (
                                <div className="leave-day-selector">
                                    {[
                                        { value: "full", label: "Full Day" },
                                        { value: "first", label: "1st Half" },
                                        { value: "second", label: "2nd Half" },
                                    ].map((day) => (
                                        <button
                                            type="button"
                                            key={day.value}
                                            className={
                                                dayType === day.value
                                                    ? "leave-day-btn active"
                                                    : "leave-day-btn"
                                            }
                                            onClick={() =>
                                                setDayType(day.value)
                                            }
                                        >
                                            {day.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="leave-total-days">
                            <strong>
                                Total: {getTotalDays()}{" "}
                                {getTotalDays() === 1 ? "Day" : "Days"}
                            </strong>
                        </div>

                        <h3 className="leave-section-title reason-title">
                            Brief Explain your reason for leave
                        </h3>

                        <div
                            className={`leave-field leave-reason-field ${
                                error ? "has-error" : ""
                            }`}
                        >
                            <label htmlFor="leaveReason">
                                Reason For Leave <span>*</span>
                            </label>

                            <textarea
                                id="leaveReason"
                                value={reason}
                                onChange={(e) => {
                                    setReason(e.target.value);
                                    if (e.target.value.trim()) {
                                        setError("");
                                    }
                                }}
                                placeholder=" "
                                rows={4}
                            />
                        </div>

                        {error && (
                            <p className="leave-error">{error}</p>
                        )}

                        <div className="leave-field leave-attachment-field">
                            <label htmlFor="attachment">Attachment</label>

                            <div className="leave-file-input">
                                <input
                                    id="attachment"
                                    type="file"
                                    onChange={(e) =>
                                        setAttachment(
                                            e.target.files?.[0] || null
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="leave-modal-footer">
                        <p>* Indicates required</p>

                        <button
                            type="submit"
                            className="leave-save-btn"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyLeave;
