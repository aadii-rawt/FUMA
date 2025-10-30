import React, { useCallback } from 'react'
import { BiEdit, BiMessage } from 'react-icons/bi'
import { CiSquarePlus } from 'react-icons/ci'
import { GoPlusCircle } from 'react-icons/go'
import useUser from '../../context/userContext'


const defaultReply = [
    {
        id: crypto.randomUUID(),
        reply: "That’s sent—take a look"
    },
    {
        id: crypto.randomUUID(),
        reply: "Inbox = updated 😉"
    },
    {
        id: crypto.randomUUID(),
        reply: "Just shared it there😜"
    },
]

const CommentReply = () => {

    const { selectedPost, setSelectedPost } = useUser()

    const handleToggle = useCallback(() => {
        if (selectedPost.commentReply) {
            setSelectedPost((prev) => {
                const { commentReplyData, ...rest } = prev
                return { ...rest, commentReply: false }
            })
            return

        }

        setSelectedPost((prev) => ({
            ...prev, commentReply: true, commentReplyData: defaultReply
        }))

    }, [selectedPost.commentReply]);

    const addNewReply = () => {
        setSelectedPost((prev) => ({...prev, commentReplyData : [...prev.commentReplyData, {id : crypto.randomUUID(), reply : ""}] }))
    }

    return (
        <div className={`w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm`}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-slate-900">Publicly reply to comments</h2>
                </div>

                {/* Toggle */}
                <button
                    type="button"
                    onClick={handleToggle}
                    aria-pressed={selectedPost.commentReply}
                    className={[
                        "relative cursor-pointer inline-flex h-6 w-12 items-center rounded-full transition-colors",
                        selectedPost.commentReply ? "bg-violet-600" : "bg-gray-300",
                    ].join(" ")}
                    title="Any keyword"
                >
                    <span
                        className={[
                            "absolute left-0.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow transition-transform",
                            selectedPost.commentReply ? "translate-x-6" : "translate-x-0",
                        ].join(" ")}
                    />
                </button>
            </div>

            {selectedPost?.commentReply && <div className='mt-5'>
                <div>
                    {selectedPost?.commentReplyData?.map((data, idx) => (
                        <div className='rounded-xl flex items-center justify-between px-3 py-1.5 border mt-2 border-gray-200 focus-within:border-violet-500 focus-within:border-2'>
                            <div className="flex items-center gap-2 w-full">
                                <BiMessage size={21} className='text-gray-400' />
                                <input
                                    type="text"
                                    value={data.reply}
                                    placeholder='Enter a reply...'
                                    onChange={(e) => {
                                        setSelectedPost((prev) => ({
                                            ...prev,
                                            commentReplyData: prev.commentReplyData.map((item, i) =>
                                                i === idx ? { ...item, reply: e.target.value } : item
                                            ),
                                        }))
                                    }}
                                    className='w-full outline-none border-none' />

                            </div>
                            <button className='cursor-pointer'><BiEdit size={21} className='text-gray-400' /></button>
                        </div>
                    ))}
                </div>
                <button onClick={addNewReply} className='rounded-xl text-center flex items-center gap-3 justify-center text-violet-600 font-medium w-full px-3 py-1.5 border mt-2 border-gray-200 cursor-pointer'>
                    <GoPlusCircle /> Add Public Reply
                </button>
            </div>}
        </div>
    )
}

export default CommentReply