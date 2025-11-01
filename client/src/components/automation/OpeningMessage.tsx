import React, { useCallback } from 'react'
import { BiEdit } from 'react-icons/bi'
import useUser from '../../context/userContext'

const Defaultmsg = `Hey there! I’m so happy you’re here, thanks so much for your interest 😊 

Click below andfdfd I’ll sen kjd you the link in just a sec ✨`
const OpeningMessage: React.FC = () => {

    const { selectedPost, setSelectedPost ,setCurrentPreview} = useUser()

    const handleToggle = useCallback(() => {
        if (selectedPost.openingMsg) {
            setSelectedPost((prev) => {
                const { openingMsgData, ...rest } = prev
                return { ...rest, openingMsg: false }
            })
            return

        }

        setSelectedPost((prev) => ({
            ...prev, openingMsg: true, openingMsgData: {
                text: Defaultmsg,
                btnText: "Send me the link"
            }
        }))
    }, [selectedPost.openingMsg]);

    return (
        <div  onClick={() => setCurrentPreview("msg")} className={`w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm`}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-slate-900">Opening Message</h2>
                </div>

                {/* Toggle */}
                <button
                    type="button"
                    onClick={handleToggle}
                    aria-pressed={selectedPost.openingMsg}
                    className={[
                        "relative cursor-pointer inline-flex h-6 w-12 items-center rounded-full transition-colors",
                        selectedPost.openingMsg ? "bg-violet-600" : "bg-gray-300",
                    ].join(" ")}
                    title="Any keyword"
                >
                    <span
                        className={[
                            "absolute left-0.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow transition-transform",
                            selectedPost.openingMsg ? "translate-x-6" : "translate-x-0",
                        ].join(" ")}
                    />
                </button>
            </div>

            {selectedPost?.openingMsg && <> <div className='rounded-xl p-3 border mt-4 border-gray-200 focus-within:border-violet-500 focus-within:border-2'>
                <textarea
                    name=""
                    value={selectedPost?.openingMsgData?.text}
                    onChange={(e) => setSelectedPost((prev) => ({ ...prev, openingMsgData: { ...prev.openingMsgData, text: e.target.value } }))}
                    className='w-full outline-none border-none resize-none '
                    rows={5}></textarea>
                <p className='text-sm text-gray-400'>23/1000</p>
            </div>
                <div className='rounded-xl flex items-center justify-between px-3 py-1.5 border mt-4 border-gray-200 focus-within:border-violet-500 focus-within:border-2'>
                    <input
                        type="text"
                        value={selectedPost?.openingMsgData?.btnText}
                        onChange={(e) => setSelectedPost((prev) => ({ ...prev, openingMsgData: { ...prev.openingMsgData, btnText: e.target.value } }))}
                        className='w-full outline-none border-none' />
                    <button className='cursor-pointer'><BiEdit size={21} className='text-gray-400' /></button>
                </div>
            </>
            }
        </div>
    )
}

export default OpeningMessage