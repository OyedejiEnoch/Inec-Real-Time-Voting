'use client'
import React from 'react'
import AddElection from './AddElection'
import { useGetElectionsQuery } from '@/redux/api/api'
import { Loader2 } from 'lucide-react'

const Elections = () => {
    const {data:elections, isLoading}= useGetElectionsQuery(null)
    
    if(isLoading){
        return <div className='flex items-center justify-center h-screen'>{<Loader2 className='animate-spin' />}</div>
    }

  return (
    <div className='py-12'>
       <div className='flex justify-between items-center'>
            <h2 className='text-xl md:text-2xl font-semibold'>All Elections</h2>

            <div>
            <AddElection />
            </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 px-4'>
            {elections.map((election:any)=>(
                <div className='bg-primary-foreground rounded-3xl h-[300px] flex items-center justify-center cursor-pointer
                    hover:bg-neutral-600/20 transition duration-200'>
                    <h3 className='text-xl font-semibold'>{election.name}</h3>
                </div>
            ))}
        </div>
      
    </div>
  )
}

export default Elections
