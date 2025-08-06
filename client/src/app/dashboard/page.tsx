import FiguresCard from '@/components/dashboard/FiguresCard'
import OverviewCard from '@/components/dashboard/OverviewCard'
import VotersPerDay from '@/components/dashboard/VotersPerDay'
import VotesPerStates from '@/components/dashboard/VotesPerStates'
import React from 'react'

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className='p-4 rounded-2xl bg-primary-foreground'>
        <OverviewCard />
      </div>
      <div className='p-4 lg:col-span-2 rounded-2xl bg-primary-foreground'>
        <VotesPerStates />
      </div>
      <div className='p-4 rounded-2xl bg-primary-foreground'>
        <FiguresCard />
      </div>
      <div className='p-4 rounded-2xl lg:col-span-3 lg:row-span-2 bg-primary-foreground'>
        <VotersPerDay />
      </div>
      <div className='p-4 rounded-2xl bg-primary-foreground'>

      </div>

      {/* <div className='border border-gray-400 p-4 rounded-2xl bg-primary-foreground'>

      </div> */}

    </div>
  )
}

export default Dashboard
