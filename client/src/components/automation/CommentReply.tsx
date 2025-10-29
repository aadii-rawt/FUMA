import React from 'react'
import { BiEdit, BiMessage } from 'react-icons/bi'

const CommentReply = () => {
    return (
        <div className={`w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm`}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-slate-900">Opening Message</h2>
                </div>

                {/* Toggle */}
                {/* <button
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
                  </button> */}
            </div>

            <div className='mt-5'>
                <div>
                    <div className='rounded-xl flex items-center justify-between px-3 py-1.5 border mt-2 border-gray-200 focus-within:border-violet-500 focus-within:border-2'>
                        <div className="flex items-center gap-2 w-full">
                            <BiMessage size={21} className='text-gray-400' />
                            <input
                                type="text"

                                value="Thanks for the commnet"
                                className='w-full outline-none border-none' />

                        </div>
                        <button className='cursor-pointer'><BiEdit size={21} className='text-gray-400' /></button>
                    </div>
                    <div className='rounded-xl flex items-center justify-between px-3 py-1.5 border mt-2 border-gray-200 focus-within:border-violet-500 focus-within:border-2'>
                        <div className="flex items-center gap-2">
                            <BiMessage size={21} className='text-gray-400' />
                            <input
                                type="text"

                                value="Thanks for the commnet"
                                className='w-full outline-none border-none' />

                        </div>
                        <button className='cursor-pointer'><BiEdit size={21} className='text-gray-400' /></button>
                    </div>
                    <div className='rounded-xl flex items-center justify-between px-3 py-1.5 border mt-2 border-gray-200 focus-within:border-violet-500 focus-within:border-2'>
                        <div className="flex items-center gap-2">
                            <BiMessage size={21} className='text-gray-400' />
                            <input
                                type="text"

                                value="Thanks for the commnet"
                                className='w-full outline-none border-none' />

                        </div>
                        <button className='cursor-pointer'><BiEdit size={21} className='text-gray-400' /></button>
                    </div>
                </div>
                <button className='rounded-xl flex items-center justify-between px-3 py-1.5 border mt-2 border-gray-200 focus-within:border-violet-500 focus-within:border-2'>
                    
                </button>
            </div>
        </div>
    )
}

export default CommentReply