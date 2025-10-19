import React from 'react'
import Editor from '../components/automation/Editor'
import Preview from '../components/automation/Preview'
import { LuPencilLine } from 'react-icons/lu'
import { RiRadioLine } from 'react-icons/ri'
const NewAutomation: React.FC = () => {
    return (
        <div className='w-full max-h-screen rounded-xl overflow-hidden'>
            <div className="w-full border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                    {/* Left: Editor tab */}
                    <div className="relative">
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-[17px] font-semibold text-violet-700"
                        >
                            <LuPencilLine className="text-xl" />
                            Editor
                        </button>

                    </div>

                    {/* Right: Go Live button */}
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-3 py-2 cursor-pointer text-white shadow hover:bg-teal-600"
                    >
                        <RiRadioLine className="text-xl" />
                        <span className="text-lg font-semibold">Go Live</span>
                    </button>
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

export default NewAutomation