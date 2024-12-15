import React from 'react'
import { 
    User, 
    EllipsisVertical 
  } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate()
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md z-10 bg-white rounded-t-lg shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2" onClick={()=>{navigate("/profile")}}>
            <User className="text-blue-600" size={24} />
            <h1 className="text-xl font-bold text-gray-800">My Wallet</h1>
        </div>
    <EllipsisVertical className="text-gray-600" size={24} />
  </header>
  )
}

export default Header