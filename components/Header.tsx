import Image from "next/image";
import Link from "next/link";
import React from 'react';

function Header() {
  return (
    <header className='flex justify-between p-5 max-w-7xl mx-auto shadow-md sticky top-0'>
      <div className='inline-flex justify-between items-center space-x-5'>
        <Link href='#'>
          <Image
            src='/header-logo.png'
            alt=' header logo'
            width={180}
            height={40}
            className='w-10 object-contain cursor-pointer'
          />
        </Link>
        <div className='hidden md:inline-flex space-x-5 items-center '>
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className='text-white bg-green-500 px-4 py-1 rounded-full'>
            Follow
          </h3>
        </div>
      </div>
      <div className='inline-flex space-x-5 items-center justify-center'>
        <h3>Sign In</h3>
        <h3 className='text-green-600 border border-green-500  px-4 py-1 rounded-full'>
          Get Started
        </h3>
      </div>
    </header>
  );
}

export default Header