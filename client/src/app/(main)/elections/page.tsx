"use client"
import { useUserProfileQuery } from '@/redux/api/userApi'
import image1 from "@/assets/nigeriaMap.jpg"
import image2 from "@/assets/election2.jpg"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useGetElectionsQuery } from '@/redux/api/api'
import { Loader2 } from 'lucide-react'

const Elections = () => {
  const {data} =useUserProfileQuery()
  const {data:elections, isLoading, error}=useGetElectionsQuery(null)

    useGSAP(()=>{
    gsap.from(".item", {opacity:0,yPercent:100, duration:1.3, ease:'expo.out', stagger:0.09})
  },[])

  if(isLoading){
    return <div className='flex items-center justify-center h-screen'>{<Loader2 className='animate-spin' />}</div>
  }

  return (
    <section className='py-12'>
        <div className='max-w-6xl md:max-w-7xl mx-auto'>
          <h2 className='text-4xl font-semibold mb-4'>All ongoing Elections</h2>
          
          <div className='px-4 py-4 flex flex-col md:flex-row justify-center items-center gap-8'>

            {elections.map((election:any)=>(

            <Link key={election._id} href={`/elections/${election._id}`} className='item'>
            <div className='w-full  rounded-3xl bg-accent-foreground h-[320px] relative cursor-pointer'>
                <Image src={image1} alt='election-image' className='w-full h-full object-cover' />
                <div className='bg-neutral-800/40 hover:bg-neutral-800/60 transition duration-200 absolute inset-0 rounded-3xl' />
                <h2 className='absolute bottom-10 text-white font-bold text-3xl left-6'>{election.name}</h2>
            </div>  
            </Link>   
            ))}

            


            {/* <Link href={`/elections/${1}`} className='item'>
            <div className='w-full  rounded-3xl bg-accent-foreground h-[320px] relative cursor-pointer'>
                <Image src={image2} alt='election-image' className='w-full h-full object-cover' />
                <div className='bg-neutral-800/40 hover:bg-neutral-800/60 transition duration-200 absolute inset-0 rounded-3xl' />
                <h2 className='absolute bottom-10 text-white font-bold text-3xl left-6'>Governorship Election</h2>
            </div>  
            </Link>    */}

          </div>
        </div>
    </section>
  )
}

export default Elections
