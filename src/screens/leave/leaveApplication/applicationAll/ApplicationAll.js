import React from 'react'
import "./ApplicationAll.css"

const ApplicationAll = () => {
  return (
    <div>
        <div className='payroll-main'>

                <div className='all-row'>
                <span>Leave Type</span>
                    <span>Date Range</span>
                    <span>Days</span>
                    <span>Status</span>
                    <span>Action Details</span>
                </div>

                <div className='all-row all-header' >
                    <div className='all-orange'>
                        <span></span> Casual Leave
                        {/* <p>Applied On: 8-oct-2026</p> */}
                    </div>

                    <div>09-Oct-2026</div>
                    <div>1 Day(s)</div>
                    <div>Approved</div>
                    <div>By: Kamlesh Soni
                        <p>Approved On: 9-Oct-2026</p>
                    </div>
                    <div className='all-button'><button>View Detail</button></div>
                </div>

                </div>

    </div>
  )
}

export default ApplicationAll
