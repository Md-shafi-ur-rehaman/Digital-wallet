import React from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'

import { 
    Home, 
    Send, 
    Clock, 
    User, 
    CreditCard, 
    ChevronDown, 
    EllipsisVertical,
     
} from 'lucide-react'


function History() {
  return (
        <>
            <main className='flex-grow overflow-auto pt-4 pb-20 px-4 space-y-6'>

            <Header/>
                <section>
                    <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
                    <a href="#" className="text-blue-600 text-sm">View All</a>
                    </div>
                    <div className="space-y-3">
                    {[
                        { id: 1, name: 'Spotify', amount: '-$12.99', type: 'Subscription' },
                        { id: 2, name: 'Groceries', amount: '-$45.50', type: 'Shopping' },
                        { id: 3, name: 'Salary', amount: '+$2500.00', type: 'Income' },
                        { id: 4, name: 'Electricity Bill', amount: '-$85.30', type: 'Utilities' },
                        { id: 5, name: 'Freelance Work', amount: '+$500.00', type: 'Income' }
                    ].map(transaction => (
                        <div 
                        key={transaction.id} 
                        className="bg-white rounded-lg p-4 flex justify-between items-center shadow-sm border"
                        >
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-2 rounded-full">
                            <CreditCard className="text-blue-600" size={20} />
                            </div>
                            <div>
                            <p className="font-medium">{transaction.name}</p>
                            <p className="text-sm text-gray-500">{transaction.type}</p>
                            </div>
                        </div>
                        <p className={`font-semibold ${transaction.amount.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                            {transaction.amount}
                        </p>
                        </div>
                    ))}
                    </div>
                </section>
            <Navbar/>
            </main>
        </>
  )
}

export default History