import React from 'react'
import { 
    Home, 
    Send, 
    Clock, 
    User, 
    CreditCard, 
    ChevronDown, 
    EllipsisVertical,
     
  } from 'lucide-react'

function BalanceCard(props) {
  return (
        <div className="bg-blue-600 text-white rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm opacity-75">Total Balance</p>
                    <h2 className="text-3xl font-bold mt-2">{'$'+props.balance}</h2>
                </div>
                <CreditCard className="text-white opacity-75" size={36} />
            </div>
        </div>
  )
}

export default BalanceCard