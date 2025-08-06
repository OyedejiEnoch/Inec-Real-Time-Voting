import Image from 'next/image'
import React from 'react'
import inecLogo from "@/assets/inecLogo.png"

const Navbar = () => {
  return (
    <section className='w-full  py-4 border-b border-gray-300/30'>
      <div className='max-w-6xl md:max-w-7xl mx-auto py-2 px-6'>
        <div>
            <Image src={inecLogo} alt='inec-logo' className='w-[150px]' />
        </div>


      </div>
    </section>
  )
}

export default Navbar
//  fixed top-0 left-0 z-10 bg-white