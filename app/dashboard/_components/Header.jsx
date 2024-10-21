"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const Header = () => {
    const path = usePathname();
    useEffect(() => {
    console.log(path);
    
    }, [])
    

  return (
    <div className='flex p-6 items-center justify-between bg-secondary shadow-sm'>
    
      <Image src={'/logo.svg'} width={160} height={100} alt="logo" />
      <ul className='hidden md:flex gap-6 font-semibold '>
        <li className={`hover:text-primary hover:font-extrabold transition-all cursor-pointer
        ${path=='/dashboard'&&'text-primary font-extrabold'}
        `}>Dashboard</li>
        <li className={`hover:text-primary hover:font-extrabold transition-all cursor-pointer
        ${path=='/dashboard/questions'&&'text-primary font-extrabold'} `}> Questions </li>

        <li className={`hover:text-primary hover:font-extrabold transition-all cursor-pointer
        ${path=='/dashboard/upgrade'&&'text-primary font-extrabold'} `}>Upgrade</li>
        <li className={`hover:text-primary hover:font-extrabold transition-all cursor-pointer
        ${path=='/dashboard/works'&&'text-primary font-extrabold'} `}>How it works ?</li>
      </ul>
      <UserButton/>
    </div>
  )
}

export default Header
