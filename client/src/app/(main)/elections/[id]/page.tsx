"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { electoralCandidates } from '@/constants'
import VoteCandidate from '@/components/VoteCandidate'
import {useGSAP} from "@gsap/react"
import gsap from 'gsap'
import { useParams, useRouter } from 'next/navigation'
import { useGetSingleElectionQuery } from '@/redux/api/api'
import { Loader2 } from 'lucide-react'
import { useUserProfileQuery } from '@/redux/api/userApi'

const SingleElectionPage = () => {
  // {params}:{params:{id:string}}
  const router =useRouter()
  const {data:user} =useUserProfileQuery()
  const params = useParams(); // useParams is safe in client components
  const id = params.id;

  const {data:election, isLoading, error}=useGetSingleElectionQuery(id)
  
   useEffect(()=>{
    if(user?.hasVoted){
      router.replace('/login')
    }
  },[user])

  useGSAP(()=>{
    gsap.from(".item", {opacity:0,yPercent:100, duration:1.3, ease:'expo.out', stagger:0.09})
  },[])
  
  if(isLoading){
      return <div className='flex items-center justify-center h-screen'>{<Loader2 className='animate-spin' />}</div>
  }

 
    // in this 
  return (
    <section className='py-16'>
      <div className='max-w-6xl md:max-w-7xl mx-auto'>

        <h2 className='font-semibold text-3xl'>Electorial Candidates For The 2023 Presidential Election</h2>
        <div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>

            {election.candidates.map((candidate:any)=>(
            <div key={candidate._id} className='item'>
                <div className='border border-gray-400/20 rounded-2xl shadow p-1'>
                    <Image src={candidate.imageUrl.url} alt='candidate-image' className='object-cover rounded-2xl' width={400} height={350} />
                </div>

                <div className='flex items-center flex-col mt-4 gap-4'>
                    <Image src={candidate.party.logo.url} alt='party-image' className='h-[50px] w-[50px] object-cover' width={100} height={100} />

                    <h1 className='text-xl font-bold'>{candidate.name}</h1>

                    <VoteCandidate id={candidate._id} />
                </div>
                
            </div>

            ))}

        </div>
      </div>
    </section>
  )
}

export default SingleElectionPage
