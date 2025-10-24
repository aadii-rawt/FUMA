import React, { useEffect, useRef, useState } from 'react'
import Editor from '../components/automation/Editor'
import Preview from '../components/automation/Preview'
import { LuPencilLine } from 'react-icons/lu'
import { RiRadioLine } from 'react-icons/ri'
import Axios from '../utils/axios'
import useUser from '../context/userContext'
import { FiEdit } from 'react-icons/fi'
import { IoMdCheckmarkCircle } from 'react-icons/io'
import { useLocation, useParams } from 'react-router-dom'
import { FaStopCircle } from 'react-icons/fa'
import { RxResume } from 'react-icons/rx'
const EditAutomtion: React.FC = () => {

    const { id } = useParams() || {}
    const { post } = useLocation().state
    const { selectedPost, setSelectedPost,user } = useUser()
    console.log(post);

    useEffect(() => {
        setSelectedPost(post)
    }, [])


    const handleAutomation = async () => {
        try {
            const res = await Axios.put(`/automation/${id}`, { post: selectedPost })
            console.log(selectedPost);
        } catch (error) {
            console.log(error);
        }

    }
     const handleStatus = async (status) => {
        try {
            const res = await Axios.put(`/automation/${id}`, { post: {status : status }})
            console.log(selectedPost);
        } catch (error) {
            console.log(error);
        }

    }

    const handleStop = async () => {
        if(!user || !id) return

        try {
            const res = Axios.put(`/automation/stop/${id}`)
        } catch (error) {
            
        }
    }
 
    const inputRef = useRef(null)
    const [isEditing, setIsEditing] = useState(false)

    return (
        <div className='w-full max-h-screen rounded-xl'>
            <div className="w-full border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                    {/* Left: Editor tab */}
                    <div className="relative">
                        <div className={`${isEditing ? "hidden" : "flex"} gap-3 items-center`}>
                            <p>{selectedPost?.name}</p>
                            <button onClick={() => {
                                inputRef.current.focus()
                                setIsEditing(true)
                            }} className='text-gray-400 cursor-pointer'><FiEdit /></button>
                        </div>
                        <div className={`${isEditing ? "flex" : "hidden"} gap-3 items-center`}>
                            <input ref={inputRef} type="text" value={selectedPost?.name} onChange={(e) => setSelectedPost((prev) => ({ ...prev, name: e.target.value }))} />
                            <button onClick={() => {
                                setIsEditing(false)
                                inputRef.current.blur()
                            }} className='text-gray-400 cursor-pointer bg-primary rounded-full text-white'><IoMdCheckmarkCircle /></button>
                        </div>

                    </div>

                    <div className='flex gap-3'>
                        <div className={`flex gap-2 items-center ${selectedPost?.status == "LIVE" ? "text-green-500" : "text-red-500"}`}>
                           <div className={`w-3 h-3 ${selectedPost?.status == "LIVE" ? "bg-green-500 text-green-500" : "bg-red-500 text-red-500"} rounded-full`}></div>
                            <h1>{selectedPost?.status == "LIVE" ? "Live" : selectedPost?.status == "PAUSED" ? "Stop" : "Draft"}</h1>
                        </div>
                        <div>
                         {selectedPost?.status == "LIVE" ?   <button onClick={() => handleStatus("PAUSED")} className={`text-red-500 font-semibold flex items-center gap-2 px-3 py-1 cursor-pointer rounded-xl border rounded border-gray-500/20`}>
                             <FaStopCircle  className='text-red-300 bg-red-500 rounded-full'/>   Stop
                            </button> : 
                             <button onClick={() => handleStatus("LIVE")} className={`text-green-500 font-semibold flex items-center gap-2 px-3 py-1 cursor-pointer rounded-xl border rounded border-gray-500/20`}>
                             <RxResume  className=''/>   Live
                            </button> }
                        </div>
                    </div>
                    {/* Right: Go Live button */}
                </div>
            </div>
            <div className='flex'>
                <div className='w-1/2'>
                    <Preview />
                </div>
                <div className='  w-1/2 overflow-y-scroll'>
                    <Editor />
                </div>
            </div>
        </div>

    )
}

export default EditAutomtion