import { TrendingUp } from 'lucide-react'
import React from 'react'

const FiguresCard = () => {
  return (
    <div className='py-2 flex flex-col gap-4'>
        <div className='w-full rounded-2xl px-6 py-4 bg-white flex justify-between items-center'>
            <h2 className='font-semibold'>Current Vote counting</h2>

            <div className='text-sm flex flex-col items-end'>
                <p>6000</p>
                <TrendingUp className='text-green-600' />
            </div>
        </div>
        <div className='w-full rounded-2xl px-6 py-4 bg-white flex justify-between items-center'>
            <h2 className='font-semibold'>Total Regsitered Voters</h2>

            <div className='text-sm flex flex-col items-end'>
                <p>9000</p>
                <TrendingUp className='text-green-600' />
            </div>
        </div>
        <div className='w-full rounded-2xl px-6 py-4 bg-white flex justify-between items-center'>
            <h2 className='font-semibold'>Total Regsitered Polling Unit</h2>

            <div className='text-sm flex flex-col items-end'>
                <p>300,</p>
                <TrendingUp className='text-green-600' />
            </div>
        </div>

        <div className='w-full rounded-2xl px-6 py-4 bg-white flex justify-between items-center'>
            <h2 className='font-semibold'>Total Regsitered Parties</h2>

            <div className='text-sm flex flex-col items-end'>
                <p>19</p>
                <TrendingUp className='text-green-600' />
            </div>
        </div>
    </div>
  )
}

export default FiguresCard
