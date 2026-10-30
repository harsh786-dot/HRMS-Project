import React from 'react'
import "./Jobs.css"
import Button from '../../component/button/Button'
import { Search } from 'lucide-react'

const Jobs = () => {
  return (
    <div className='jobs-container'>

        <div className='jobs-header'>
            <div className="search-box">
            
          <Search size={20} />
          <input type="text" placeholder="Search"/>
        </div>

        <div>
            <Button 
            icon=""
            text="Add New Tab"
            width="220px"
            height="50px"
            backgroundColor="#7152F3"
            border="1px solid #7152F3"
            color="#ffff"
            borderRadius="10px" />
        </div>
         </div>

        <div className='jobs-main'>

        <div className='active-job'>
            <span></span> <h4>Active Jobs</h4>
            <div></div>

        </div>

        </div>
      
    </div>
  )
}

export default Jobs
