import React, { useEffect, useMemo, useRef, useState } from 'react'
import Editor from '../components/automation/Editor'
import Preview from '../components/automation/Preview'
import { LuPencilLine } from 'react-icons/lu'
import { RiRadioLine } from 'react-icons/ri'
import Axios from '../utils/axios'
import useUser from '../context/userContext'
import { FiEdit } from 'react-icons/fi'
import { IoMdCheckmarkCircle } from 'react-icons/io'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { FaStopCircle } from 'react-icons/fa'
import { RxResume } from 'react-icons/rx'
import LoadingSpinner from '../components/LoadingSpinner'

const simpleDeepEqual = (obj1, obj2) => {
    if (obj1 === obj2) return true;
    if (
        typeof obj1 !== 'object' || obj1 === null ||
        typeof obj2 !== 'object' || obj2 === null
    ) {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (!obj2.hasOwnProperty(key) || !simpleDeepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
};


// ------------------------------------------------
const EditAutomtion: React.FC = () => {

    const { id } = useParams() || {}
    const { post } = useLocation().state
    const { selectedPost, setSelectedPost, user } = useUser()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setSelectedPost(post)
    }, [])

    const areObjectsSame = useMemo(() => {
        return simpleDeepEqual(post, selectedPost);
    }, [post, selectedPost]);

    const handleUpdate = async () => {
        if (!id) return
        try {
            setLoading(true)
            const res = await Axios.put(`/automation/${id}`, { post: selectedPost })
            navigate("/automation")
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }

    }

    const handleStatus = async (status) => {
        if (!user || !id) return
        try {
            const res = await Axios.put(`/automation/${id}`, { post: { status: status } })
            setSelectedPost(res.data.automation)
            navigate("/automation")
        } catch (error) {
            console.log(error);
        }

    }

    const inputRef = useRef(null)
    const [isEditing, setIsEditing] = useState(false)

    return (
        <div className='w-full max-h-screen rounded-xl overflow-hidden'>
            <div className="w-full border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
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
                            }} className='cursor-pointer bg-primary rounded-full text-white'><IoMdCheckmarkCircle /></button>
                        </div>
                    </div>
                    <div>
                        {areObjectsSame ?
                            <div className='flex gap-3'>
                                <div className={`flex gap-2 items-center ${selectedPost?.status == "LIVE" ? "text-green-500" : "text-red-500"}`}>
                                    <div className={`w-3 h-3 ${selectedPost?.status == "LIVE" ? "bg-green-500 text-green-500" : "bg-red-500 text-red-500"} rounded-full`}></div>
                                    <h1>{selectedPost?.status == "LIVE" ? "Live" : selectedPost?.status == "PAUSED" ? "Stop" : "Draft"}</h1>
                                </div>
                                <div>
                                    {selectedPost?.status == "LIVE" ? <button onClick={() => handleStatus("PAUSED")} className={`text-red-500 font-semibold flex items-center gap-2 px-3 py-1 cursor-pointer rounded-xl border rounded border-gray-500/20`}>
                                        <FaStopCircle className='text-red-300 bg-red-500 rounded-full' />   Stop
                                    </button> :
                                        <button onClick={() => handleStatus("LIVE")} className={`text-green-500 font-semibold flex items-center gap-2 px-3 py-1 cursor-pointer rounded-xl border rounded border-gray-500/20`}>
                                            <RxResume className='' />   Live
                                        </button>}
                                </div>


                            </div> :
                            <button
                                type="button"
                                disabled={loading}
                                onClick={handleUpdate}
                                className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-3 py-2 cursor-pointer text-white shadow hover:bg-teal-600"
                            >
                                {loading ? <LoadingSpinner /> : <> <RiRadioLine className="text-xl" />
                                    <span className="text-lg font-semibold">Update</span></>
                                }
                            </button>

                        }
                    </div>
                </div>
            </div>
            <div className='flex h-full'>
                <div className='w-1/2'>
                    <Preview />
                </div>
                <div className='w-1/2 h-full'>
                    <Editor />
                </div>
            </div>
        </div>

    )
}

export default EditAutomtion