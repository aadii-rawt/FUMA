import React from 'react'
import useUser from '../context/userContext'
import { GoPlus } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { LuPlus } from 'react-icons/lu';

const MobileHeader = () => {
    const { user } = useUser();
    return (
        <div className='px-2 py-1 flex items-center justify-between'>
            <div>

            </div>
            <div className='flex items-center gap-3'>
                <Link to="/automation/new" className="inline-flex items-center gap-2 rounded-xl bg-[#6E32FF] px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-95">
                    <LuPlus className="text-[18px]" />
                    New
                </Link>
                <div className='w-9 cursor-pointer h-9 rounded-full bg-gray-300'>
                    <img src={user?.avatar} alt="" />
                </div>
            </div>
        </div>
    )
}

export default MobileHeader