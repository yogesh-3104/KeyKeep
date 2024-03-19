import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-600 text-white p-2'>

      <ul className='flex justify-around '>
        <div className="logo text-xl">
          <span>&lt;</span>
          <span className=''>Key<span className='text-green-300'>Keep</span></span>
          <span>&gt;</span>
        </div>
        <li className='flex gap-4 '>
          <a href='/' className='hover:text-lg'>Home</a>
          <a href='/about' className='hover:text-lg'>About</a>
          <a href='/contact' className='hover:text-lg'>Contact</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar