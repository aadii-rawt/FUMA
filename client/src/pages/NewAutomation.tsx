import React, { useEffect, useRef, useState } from 'react'
import Editor from '../components/automation/Editor'
import Preview from '../components/automation/Preview'
import { LuPencilLine } from 'react-icons/lu'
import { RiRadioLine } from 'react-icons/ri'
import Axios from '../utils/axios'
import useUser from '../context/userContext'
import { FiEdit } from 'react-icons/fi'
import { IoMdCheckmarkCircle } from 'react-icons/io'
const NewAutomation: React.FC = () => {

    const { selectedPost, setSelectedPost, user } = useUser()
    useEffect(() => {
        setSelectedPost({
            name: "New Automation",
            status: "LIVE",
            postMediaId: "",
            postThumbnail: "",
            anyKeyword: false,
            keywords: [],
            dmText: "",
            msgTitle: "",
            dmLinks: [],
            dmImageUrl: ""
        })
    }, [])

    const handleAutomation = async () => {
        if (!user) return
        try {
            const res = await Axios.post("/automation", { post: selectedPost })
            console.log(selectedPost);
            setSelectedPost({
                name: "New Automation",
                status: "LIVE",
                postMediaId: "",
                postThumbnail: "",
                anyKeyword: false,
                keywords: [],
                dmText: "",
                msgTitle: "",
                dmLinks: [],
                dmImageUrl: ""
            })
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
                    {/* Left: Editor tab */}
                    <div className="relative">
                        <div className={`${isEditing ? "hidden" : "flex"} gap-3 items-center`}>
                            <p>{selectedPost.name}</p>
                            <button onClick={() => {
                                inputRef.current.focus()
                                setIsEditing(true)
                            }} className='text-gray-400 cursor-pointer'><FiEdit /></button>
                        </div>
                        <div className={`${isEditing ? "flex" : "hidden"} gap-3 items-center`}>
                            <input ref={inputRef} type="text" value={selectedPost.name} onChange={(e) => setSelectedPost((prev) => ({ ...prev, name: e.target.value }))} />
                            <button onClick={() => {
                                setIsEditing(false)
                                inputRef.current.blur()
                            }} className='text-gray-400 cursor-pointer bg-primary rounded-full text-white'><IoMdCheckmarkCircle /></button>
                        </div>

                    </div>

                    {/* Right: Go Live button */}
                    <button
                        type="button"
                        onClick={handleAutomation}
                        className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-3 py-2 cursor-pointer text-white shadow hover:bg-teal-600"
                    >
                        <RiRadioLine className="text-xl" />
                        <span className="text-lg font-semibold">Go Live</span>
                    </button>
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

export default NewAutomation