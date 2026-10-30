import React from 'react'
import "./InfoDocuments.css"
import { Eye, Download } from 'lucide-react'
const InfoDocuments = () => {
  return (
    <div className='info-documents-container'>

      <div className='info-documents'>
        <p>hello</p>
          <span className='info-span'><Eye /></span><span className='info-span'><Download /></span>
      </div>

      <div className='info-documents'>
        <p>hello</p>
        <span className='info-span'><Eye /></span><span className='info-span'><Download /></span>
      </div>
      
    </div>
  )
}

export default InfoDocuments
