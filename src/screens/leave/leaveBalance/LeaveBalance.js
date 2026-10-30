import "./LeaveBalance.css";

const leaveData = [
  {
    code: "RH",
    name: "Restricted Holiday",
    balance: 3,
    granted: 3,
    used: 0,
    entitlement: "3/year*",
    color: "#009688",
  },
  {
    code: "CL",
    name: "Casual Leave",
    balance: 3,
    granted: 6,
    used: 3,
    entitlement: "6/year*",
    color: "#ff9800",
  },
  {
    code: "SL",
    name: "Sick Leave",
    balance: 5,
    granted: 6,
    used: 1,
    entitlement: "6/year*",
    color: "#c026d3",
  },
  {
    code: "PL",
    name: "Privilege Leave",
    balance: 4,
    granted: 6,
    used: 2,
    entitlement: "6/year*",
    color: "#303f9f",
  },
  {
    code: "EL",
    name: "Earned Leave",
    balance: 5,
    granted: 7,
    used: 2,
    entitlement: "12/year*",
    color: "#4caf50",
  },
];

const LeaveBalance = () => {
  return (
    <>
            <div className="leave-balance">
              Leave Balance{" "}
              <span>(Calendar Year - 2026)</span>
            </div>

            <div className="leave-list">
              {leaveData.map((leave) => (
                <div
                  className="leave-card"
                  key={leave.code}
                >
                  <div className="leave-card-header">
                    <h2 style={{ color: leave.color }}>
                      {leave.code}
                    </h2>

                    <p style={{ color: leave.color }}>
                      {leave.name}
                    </p>
                  </div>

                  <div className="leave-card-body">
                    <h3>{leave.balance}</h3>

                    <p className="balance-label">
                      Balance
                    </p>

                    <p className="leave-details">
                      Granted: {leave.granted}
                      <span>|</span>
                      Used: {leave.used}
                    </p>

                    <p className="leave-entitlement">
                      Entitlement: {leave.entitlement}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="leave-granted">
              <h4>
                Granted: <span>28</span>
              </h4>

              <h4>
                Used: <span>8</span>
              </h4>

              <h4>
                Balanced: <span>20</span>
              </h4>
            </div>

            <div className="leave-star">
              <p>
                *Leaves are accrued periodically. Click on a
                card to view its ledger.
              </p>
            </div>
          </>

  )
}

export default LeaveBalance
