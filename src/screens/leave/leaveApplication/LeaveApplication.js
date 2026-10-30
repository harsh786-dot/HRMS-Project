import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./LeaveApplications.css";


const leaveData = [
    {
        id: 1,
        leaveType: "Casual Leave",
        dateRange: "09-Oct-2026",
        days: "1 Day(s)",
        status: "Approved",
        actionBy: "Kamlesh Soni",
        actionDate: "9-Oct-2026",
        applicant: "Pradeep Veragi",
        manager: "Divesh Thakur",
        applicationDate: "8-Oct-2026 at 2:08 pm",
        approvedBy: "Kamlesh Soni",
        approvedOn: "9-Oct-2026",
        balance: "3",
        reason:
            "I would like to request leave on 9 Oct as I need to take my father to the hospital for a medical appointment.\n\nThank you for your understanding.",
        holidays: [],
    },
    {
        id: 2,
        leaveType: "Sick Leave",
        dateRange: "12-Oct-2026",
        days: "2 Day(s)",
        status: "Pending Approval",
        actionBy: "Not Assigned",
        actionDate: "-",
        applicant: "Pradeep Veragi",
        manager: "Divesh Thakur",
        applicationDate: "10-Oct-2026 at 10:00 am",
        approvedBy: "-",
        approvedOn: "-",
        balance: "5",
        reason: "I am not feeling well and need two days of rest.",
        holidays: [],
    },
    {
        id: 3,
        leaveType: "Earned Leave",
        dateRange: "15-Oct-2026",
        days: "3 Day(s)",
        status: "Rejected",
        actionBy: "Rahul Sharma",
        actionDate: "15-Oct-2026",
        applicant: "Pradeep Veragi",
        manager: "Divesh Thakur",
        applicationDate: "12-Oct-2026 at 11:00 am",
        approvedBy: "Rahul Sharma",
        approvedOn: "15-Oct-2026",
        balance: "8",
        reason: "I would like to request three days of earned leave.",
        holidays: [],
    },
    {
        id: 4,
        leaveType: "Casual Leave",
        dateRange: "16-Oct-2026",
        days: "1 Day(s)",
        status: "Cancelled",
        actionBy: "Not Assigned",
        actionDate: "-",
        applicant: "Pradeep Veragi",
        manager: "Divesh Thakur",
        applicationDate: "14-Oct-2026 at 9:30 am",
        approvedBy: "-",
        approvedOn: "-",
        balance: "3",
        reason: "Personal work.",
        holidays: [],
    },
];

const tabs = [
    "All",
    "Pending Approval",
    "Approved",
    "Rejected",
    "Cancelled",
];

const LeaveApplications = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("All");
    const [activeLeaveType, setActiveLeaveType] = useState("All Leave Types");
    const [selectedLeave, setSelectedLeave] = useState(leaveData[0]);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState({
        1: [
            {
                name: "Kamlesh Soni",
                text: "Kamlesh soni approved at admin stage",
                date: "4 days ago",
            },
        ],
    });
    const [commentError, setCommentError] = useState("");

    const filteredLeaves = leaveData.filter((leave) => {
        const matchesStatus =
            activeTab === "All" || leave.status === activeTab;

        const matchesType =
            activeLeaveType === "All Leave Types" ||
            leave.leaveType === activeLeaveType;

        return matchesStatus && matchesType;
    });

    const leaveComments = selectedLeave
        ? comments[selectedLeave.id] || []
        : [];

    const handleSubmitComment = (e) => {
        e.preventDefault();

        if (!comment.trim()) {
            setCommentError("Please enter a comment.");
            return;
        }

        const newComment = {
            name: "You",
            text: comment.trim(),
            date: "Just now",
        };

        setComments((prev) => ({
            ...prev,
            [selectedLeave.id]: [
                ...(prev[selectedLeave.id] || []),
                newComment,
            ],
        }));

        setComment("");
        setCommentError("");
    };

    return (
        <div className="leave-page">
            {/* Leave Applications Table */}
            <section className="leave-applications">
                <div className="leave-header">
                    <div className="leave-tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                className={`leave-tab ${
                                    activeTab === tab ? "active" : ""
                                }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <select
                        className="leave-type-btn"
                        value={activeLeaveType}
                        onChange={(e) =>
                            setActiveLeaveType(e.target.value)
                        }
                        aria-label="Filter by leave type"
                    >
                        <option>All Leave Types</option>
                        <option>Casual Leave</option>
                        <option>Sick Leave</option>
                        <option>Earned Leave</option>
                    </select>
                </div>

                <div className="leave-table">
                    <div className="leave-table-header">
                        <span>Leave Type</span>
                        <span>Date Range</span>
                        <span>Days</span>
                        <span>Status</span>
                        <span>Action Details</span>
                        <span>Action</span>
                    </div>

                    {filteredLeaves.length > 0 ? (
                        filteredLeaves.map((leave) => (
                            <div className="leave-app-row" key={leave.id}>
                                <span className="leave-name">
                                    <span
                                        className={`leave-dot ${leave.status
                                            .toLowerCase()
                                            .replaceAll(" ", "-")}`}
                                    />
                                    {leave.leaveType}
                                </span>

                                <span>{leave.dateRange}</span>
                                <span>{leave.days}</span>

                                <span>
                                    <span
                                        className={`status-badge ${leave.status
                                            .toLowerCase()
                                            .replaceAll(" ", "-")}`}
                                    >
                                        {leave.status}
                                    </span>
                                </span>

                                <div className="leave-action-details">
                                    <span>{leave.actionBy}</span>
                                    <small>
                                        {leave.actionDate !== "-"
                                            ? leave.actionDate
                                            : "No action yet"}
                                    </small>
                                </div>

                                <button
                                    type="button"
                                    className="view-detail-btn"
                                    onClick={() => navigate("/dashboard/leaveApplication")}>
                                    View Detail
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="no-leaves">
                            No leave applications found.
                        </p>
                    )}
                </div>
            </section>

            {/* Selected Leave Details */}
            {selectedLeave && (
                <section className="view-details-container">
                    {/* Left Card */}
                    <div className="view-left-side">
                        <h2 className="section-heading">
                            Application By:
                        </h2>

                        <div className="view-left-profile">
                            <div
                                className="profile-avatar applicant-avatar"
                                aria-label="Applicant profile"
                            >
                                <span>PV</span>
                            </div>

                            <div className="profile-info">
                                <p>
                                    <strong>Name:</strong>{" "}
                                    <span className="profile-link">
                                        {selectedLeave.applicant}
                                    </span>
                                </p>

                                <p>
                                    <strong>Reporting Manager:</strong>{" "}
                                    <span className="profile-link">
                                        {selectedLeave.manager}
                                    </span>
                                </p>

                                <p>
                                    <strong>Application Date:</strong>{" "}
                                    {selectedLeave.applicationDate}
                                </p>

                                <p>
                                    <strong>Approved By:</strong>{" "}
                                    <span className="profile-link">
                                        {selectedLeave.approvedBy}
                                    </span>
                                </p>

                                <p>
                                    <strong>Approved On:</strong>{" "}
                                    {selectedLeave.approvedOn}
                                </p>

                                <p>
                                    <strong>Status:</strong>{" "}
                                    <span
                                        className={`status-badge ${selectedLeave.status
                                            .toLowerCase()
                                            .replaceAll(" ", "-")}`}
                                    >
                                        {selectedLeave.status}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="application-details">
                            <h3>Application Details</h3>

                            <p className="leave-type-line">
                                <strong>Leave Type:</strong>{" "}
                                <span className="leave-type-pill">
                                    {selectedLeave.leaveType}
                                </span>{" "}
                                <span className="balance-text">
                                    ({selectedLeave.balance} Balance)
                                </span>
                            </p>

                            <div className="view-box">
                                <div className="view-box-left">
                                    <div>
                                        <h4>Date:</h4>
                                        <p className="leave-date">
                                            {selectedLeave.dateRange}
                                        </p>
                                        <span className="day-pill">
                                            Full Day
                                        </span>
                                    </div>

                                    <div className="total-days">
                                        <strong>Total:</strong>{" "}
                                        {selectedLeave.days}
                                    </div>
                                </div>

                                <div className="view-box-right">
                                    <h3>Holidays In This Period</h3>

                                    {selectedLeave.holidays.length > 0 ? (
                                        <ul>
                                            {selectedLeave.holidays.map(
                                                (holiday, index) => (
                                                    <li key={index}>
                                                        {holiday}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    ) : (
                                        <p>No Holidays</p>
                                    )}
                                </div>
                            </div>

                            <details className="leave-balance">
                                <summary>Leave Balance</summary>
                                <div className="balance-content">
                                    <p>
                                        {selectedLeave.leaveType}:{" "}
                                        <strong>
                                            {selectedLeave.balance} day(s)
                                        </strong>
                                    </p>
                                </div>
                            </details>

                            <div className="leave-reason">
                                <h3>Reason for Leave:</h3>
                                <p>{selectedLeave.reason}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Card: Comments */}
                    <div className="view-right-side">
                        <h2 className="section-heading">Comments</h2>

                        <form
                            className="comment-form"
                            onSubmit={handleSubmitComment}
                        >
                            <div className="profile-avatar comment-avatar">
                                <span>PV</span>
                            </div>

                            <div className="comment-input-wrap">
                                <textarea
                                    value={comment}
                                    onChange={(e) => {
                                        setComment(e.target.value);
                                        setCommentError("");
                                    }}
                                    placeholder="Comment here *"
                                    aria-label="Write a comment"
                                    rows={2}
                                />

                                {commentError && (
                                    <small className="comment-error">
                                        {commentError}
                                    </small>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="comment-submit"
                            >
                                Submit
                            </button>
                        </form>

                        <div className="comment-controls">
                            <button
                                type="button"
                                title="Scroll comments up"
                                onClick={() =>
                                    document
                                        .querySelector(".comment-list")
                                        ?.scrollTo({
                                            top: 0,
                                            behavior: "smooth",
                                        })
                                }
                            >
                                ↑
                            </button>

                            <button
                                type="button"
                                title="Scroll comments down"
                                onClick={() => {
                                    const list =
                                        document.querySelector(".comment-list");

                                    if (list) {
                                        list.scrollTo({
                                            top: list.scrollHeight,
                                            behavior: "smooth",
                                        });
                                    }
                                }}
                            >
                                ↓
                            </button>
                        </div>

                        <div className="comment-list">
                            {leaveComments.length > 0 ? (
                                leaveComments.map((item, index) => (
                                    <article
                                        className="comment-item"
                                        key={`${selectedLeave.id}-${index}`}
                                    >
                                        <div className="profile-avatar small-avatar">
                                            <span>
                                                {item.name
                                                    .split(" ")
                                                    .map((part) => part[0])
                                                    .join("")
                                                    .slice(0, 2)}
                                            </span>
                                        </div>

                                        <div className="comment-content">
                                            <div className="comment-meta">
                                                <strong>{item.name}</strong>
                                                <small>{item.date}</small>
                                            </div>

                                            <p>{item.text}</p>
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <p className="empty-comments">
                                    No comments yet.
                                </p>
                            )}
                        </div>
                    </div> 
                </section>
            )}
        </div>
    );
};

export default LeaveApplications;
