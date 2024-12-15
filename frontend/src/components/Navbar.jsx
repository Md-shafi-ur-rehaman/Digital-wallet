import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { 
    Home, 
    Send, 
    Clock,
    User,
    Contact,
    ArrowLeftRight 
} from 'lucide-react';

function Navbar() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('');
    const handlechange = (name)=>{
        setActiveTab(name)
        navigate(`/${name}`)
    }

    const navItems = [
        { 
        icon: Home, 
        name: 'home',
        label: 'Home'
        },
        { 
        icon: Contact, 
        name: 'search',
        label: 'Send money'
        },
        { 
        icon: ArrowLeftRight , 
        name: 'History',
        label: 'Transaction'
        },
        {
            icon:User,
            name:'profile',
            label:'Profile'
        }
    ];
  return (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-10 bg-white rounded-b-lg shadow-lg p-4 flex justify-around">
            {navItems.map((item) => (
                <button 
                    key={item.name}
                    onClick={() => {
                        handlechange(item.name)
                    }}
                    className={`flex flex-col items-center justify-center ${
                        activeTab === item.name 
                        ? 'text-blue-600' // Active tab color (blue)
                        : 'text-gray-500' // Inactive tab color
                    } hover:text-blue-700 transition-colors duration-200`}
                    >
                    <item.icon 
                        size={24} 
                        strokeWidth={activeTab === item.name ? 2.5 : 1.5}
                    />
                    <span className="text-xs mt-1">{item.label}</span>
                </button>
        ))}
        </nav>
  )
}

export default Navbar