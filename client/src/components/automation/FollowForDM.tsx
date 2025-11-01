import React, { useCallback } from 'react'
import { BiEdit } from 'react-icons/bi'
import useUser from '../../context/userContext'

const Defaultmsg = `Oh no! It seems you're not following me 👀It would really mean a lot if you visit my profile and hit the follow button😁. Once you have done that, click on the 'I'm following' button below and you will get the link ✨.`
const FollowForDM = () => {

    const { selectedPost, setSelectedPost ,setCurrentPreview} = useUser()

    const handleToggle = useCallback(() => {
        if (selectedPost.followForDM) {
            setSelectedPost((prev) => {
                const { followForDMData, ...rest } = prev
                return { ...rest, followForDM: false }
            })
            return

        }

        setSelectedPost((prev) => ({
            ...prev, followForDM: true, followForDMData: {
                text: Defaultmsg,
                visitProfile : "Visit Profile",
                imFollowing : "I'm following ✅"
            }
        }))
    }, [selectedPost.followForDM]);

    return (
        <div  onClick={() => setCurrentPreview("msg")} className={`w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm`}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-slate-900">Follow For DM</h2>
                </div>

                {/* Toggle */}
                <button
                    type="button"
                    onClick={handleToggle}
                    aria-pressed={selectedPost.followForDM}
                    className={[
                        "relative cursor-pointer inline-flex h-6 w-12 items-center rounded-full transition-colors",
                        selectedPost.followForDM ? "bg-violet-600" : "bg-gray-300",
                    ].join(" ")}
                    title="Any keyword"
                >
                    <span
                        className={[
                            "absolute left-0.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow transition-transform",
                            selectedPost.followForDM ? "translate-x-6" : "translate-x-0",
                        ].join(" ")}
                    />
                </button>
            </div>

            {selectedPost?.followForDM && <> <div className='rounded-xl p-3 border mt-4 border-gray-200 focus-within:border-violet-500 focus-within:border-2'>
                <textarea
                    name=""
                    value={selectedPost?.followForDMData?.text}
                    onChange={(e) => setSelectedPost((prev) => ({ ...prev, followForDMData: { ...prev.followForDMData, text: e.target.value } }))}
                    className='w-full outline-none border-none resize-none '
                    rows={5}></textarea>
                <p className='text-sm text-gray-400'>23/1000</p>
            </div>
                <div className='space-y-2'>
                    <div className='rounded-xl flex items-center justify-between px-3 py-1.5 border  mt-3 border-gray-200 focus-within:border-violet-500 focus-within:border-2'>
                        <input
                            type="text"
                            value={selectedPost?.followForDMData?.visitProfile}
                            onChange={(e) => setSelectedPost((prev) => ({ ...prev, followForDMData: { ...prev.followForDMData, visitProfile: e.target.value } }))}
                            className='w-full outline-none border-none' />
                        <button className='cursor-pointer'><BiEdit size={21} className='text-gray-400' /></button>
                    </div>
                    <div className='rounded-xl flex items-center justify-between px-3 py-1.5 border  border-gray-200 focus-within:border-violet-500 focus-within:border-2'>
                        <input
                            type="text"
                            value={selectedPost?.followForDMData?.imFollowing}
                            onChange={(e) => setSelectedPost((prev) => ({ ...prev, followForDMData: { ...prev.followForDMData, imFollowing: e.target.value } }))}
                            className='w-full outline-none border-none' />
                        <button className='cursor-pointer'><BiEdit size={21} className='text-gray-400' /></button>
                    </div>

                </div>
            </>
            }
        </div>
    )
}

export default FollowForDM