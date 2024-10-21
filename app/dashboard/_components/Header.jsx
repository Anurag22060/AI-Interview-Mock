"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React, { useEffect } from 'react'

const Header = () => {
  const path = usePathname();

  useEffect(() => {
    // console.log(path);
  }, [path]);

  return (
    <div className='flex p-6 items-center justify-between bg-secondary shadow-sm'>
      <Image src={'/logo3.svg'} width={60} height={60} alt="logo" />

      <ul className='hidden md:flex gap-6 font-semibold '>
        <li className={`hover:text-primary hover:font-extrabold transition-all cursor-pointer
        ${path === '/dashboard' && 'text-primary font-extrabold'}`}>
          <Link href="/dashboard">Dashboard</Link>
        </li>

        <li className={`hover:text-primary hover:font-extrabold transition-all cursor-pointer
        ${path === '/dashboard/questions' && 'text-primary font-extrabold'}`}>
          <Link href="/dashboard/questions">FAQs</Link>
        </li>

        <li className={`hover:text-primary hover:font-extrabold transition-all cursor-pointer
        ${path === '/dashboard/upgrade' && 'text-primary font-extrabold'}`}>
          <Link href="/dashboard/upgrade">Upgrade</Link>
        </li>

        <li className={`hover:text-primary hover:font-extrabold transition-all cursor-pointer
        ${path === '/dashboard/works' && 'text-primary font-extrabold'}`}>
          <Link href="/dashboard/works">How it works?</Link>
        </li>
      </ul>

      <UserButton />
    </div>
  );
};

export default Header;
