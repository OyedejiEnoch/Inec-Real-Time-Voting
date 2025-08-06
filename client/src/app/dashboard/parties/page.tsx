"use client"
import Image from 'next/image'
import React from 'react'
import pdpImg from "@/assets/pdp.jpg"
import apcImg from "@/assets/apc.jpg"
import AddNewParty from './AddNewParty'
import { useGetPartiesQuery } from '@/redux/api/api'
import { Loader2 } from 'lucide-react'

const Party = () => {

  const {data:parties, isLoading, error}=useGetPartiesQuery(null)
  console.log(parties)

  if(isLoading){
    return <div className='flex items-center justify-center h-screen'>{<Loader2 className='animate-spin' />}</div>
  }

  return (
    <div className='py-12'>
        <div className='flex justify-between items-center'>
            <h2 className='md:text-2xl font-semibold text-sm'>All Political Parties</h2>

            <div>
            <AddNewParty />
            </div>
        </div>

      <div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4'>
        {parties.map((party:any)=>(
          <div key={party._id} className='bg-primary-foreground rounded-3xl md:w-[200px] h-[200px]'>
              <div className='h-[150px]'>
              <Image src={party.logo.url} alt='image' className='object-cover rounded-3xl h-[150px]' width={220} height={220}/>
              </div>
            
            <div className='flex justify-center mt-6'>
            <p className='font-semibold text-sm'>{party.name}</p>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Party
