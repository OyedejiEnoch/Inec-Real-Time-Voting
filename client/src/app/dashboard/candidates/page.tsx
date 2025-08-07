"use client"
import Image from 'next/image'
import React from 'react'
import AddCandidate from './AddCandidate'
import { useGetCandidatesQuery } from '@/redux/api/api'
import { Loader2 } from 'lucide-react'
 
const Candidates = () => {

  const {data:candidates, isLoading, error}=useGetCandidatesQuery(null);

  if(isLoading){
    return <div className='flex items-center justify-center h-screen'>{<Loader2 className='animate-spin' />}</div>
  }

  return (
    <div className='py-12'>
      <h2 className='text-2xl font-semibold'>Registered Candidates</h2>
      <div className='flex flex-col lg:flex-row items-center'>
      <div className='w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 px-4'>

        {candidates.map((candidate:any)=>(

        <div key={candidate._id} className='bg-primary-foreground rounded-3xl'>
          <div className=' '>
            <Image src={candidate.imageUrl.url} alt='image' className='object-cover rounded-3xl h-[230px]' width={400} height={300} />
          </div>
          <div className='flex justify-center mt-6'>
          <p className='font-semibold'>{candidate.name}</p>
          </div>
        </div>

        ))}

      </div>

        <div className='w-full lg:w-1/4'>
          <AddCandidate />
        </div>

      </div>
    </div>
  )
}

export default Candidates
