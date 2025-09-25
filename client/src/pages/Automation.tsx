import React, { useState } from 'react'
import Editor from '../components/automation/Editor'
import Preview from '../components/automation/Preview'
const Automation: React.FC = () => {
  return (
    <div className=' w-full flex p-6'>
      <div className='w-1/2'>
        <Preview />
      </div>
      <Editor />
    </div>

  )
}

export default Automation