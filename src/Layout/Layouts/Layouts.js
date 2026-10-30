import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import Header from '../header/Header'
import { Outlet } from 'react-router-dom'
import "./Layouts.css"

const Layouts = () => {
  return (
    <div className='layouts-container'>

      <div className='lay-sidebar'>
        <Sidebar />
      </div>

      <div className='lay-main'>
        <div className='lay-Header'>
          <Header
            title="Hello Robert 👋"
            subtitle="Good Morning" />
        </div>
        
        <div className="lay-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layouts
