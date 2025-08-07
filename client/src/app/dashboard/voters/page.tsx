'use client'
import React from 'react'
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useGetAllVotersQuery } from '@/redux/api/api'
import { Loader2 } from 'lucide-react'
 



const page = () => {

const {data:voters, isLoading,}=useGetAllVotersQuery()
        
  if(isLoading){
    return <div className='flex items-center justify-center h-screen'>{<Loader2 className='animate-spin' />}</div>
  }

  return (
    <div className="container mx-auto py-10">
      <div className='mb-8 px-4 py-2 bg-secondary rounded-md'>
         <h1 className='font-semibold'>Voters</h1>
       </div>
       <DataTable columns={columns} data={(voters as any)} />
    </div>
  )
}

export default page
