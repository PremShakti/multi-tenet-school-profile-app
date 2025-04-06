import React from 'react'
import { AuthForm } from '../auth/AuthForm'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className=" sticky to-0 left-0 z-30 bg-blue-500 ">
      <nav className=" container  text-white flex justify-between items-center p-4">
        <div className="w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-[700]"><Link href={'/'}>
           School App
            </Link> </h1>
          </div>
          <div>
            <div className="flex items-center gap-4">
            
              <AuthForm />
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar