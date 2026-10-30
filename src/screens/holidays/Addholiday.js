import React from 'react'
import "./Addholiday.css"
import Button from "../../component/button/Button"

const Addholiday = ({ onClose }) => {
  return (
    <div className='add-holiday'>
      <div className='addholiday-container'>

        <h1>Add New Holiday</h1>

        <div className='add-holiday-input'>
          <input type="text" placeholder='Holiday Name' />
        </div>

        <div className='add-holiday-input'>
          <input type="date" placeholder='Date' />
        </div>

        <div className="holiday-btn">

          <Button
            icon=""
            text="Cancle"
            width="50%"
            height="50px"
            backgroundColor="white"
            border="1px solid #A2A1A833"
            color="#16151C"
            borderRadius="10px"
           onClick={onClose}

          />

          <Button
            icon=""
            text="Add"
            width="50%"
            height="50px"
            backgroundColor="#7152F3"
            border="1px solid #7152F3"
            color="#ffff"
            borderRadius="10px"
            onClick={onClose}
          />
        </div>


      </div>


    </div>
  )
}

export default Addholiday
