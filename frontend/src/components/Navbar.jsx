import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { 
    Home, 
    Send, 
    Clock,
} from 'lucide-react';

function Navbar() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('home');

  return (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-10 bg-white rounded-b-lg shadow-lg p-4 flex justify-around">
            <div onClick={()=>{
                        setActiveTab('home')
                        navigate('/home')
                    }}  
                className={`flex flex-col items-center ${activeTab==='home' ? 'text-blue-600' : 'text-gray-500'}`}>
                <Home size={24} />
                <span className="text-xs mt-1">Home</span>
            </div>
            <div onClick={()=>{
                        setActiveTab('send')
                        navigate('/send')
                }} 
                className={`flex flex-col items-center ${activeTab==='send' ? 'text-blue-600' : 'text-gray-500'} `}>
                <Send size={24} />
                <span className="text-xs mt-1">Send</span>
            </div>
            <div onClick={()=>{
                        setActiveTab('history')
                        navigate('/history')
                }}
                className={`flex flex-col items-center ${activeTab==='history' ? 'text-blue-600' : 'text-gray-500'} `}>
                <Clock size={24} />
                <span className="text-xs mt-1">History</span>
            </div>
        </nav>
  )
}

export default Navbar