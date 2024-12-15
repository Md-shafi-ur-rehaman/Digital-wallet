import React, { useEffect, useState } from 'react'
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
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'



function History() {
    const navigate = useNavigate;
    const [transaction, setTransaction] = useState([]);
    const [user, setUser] = useState();
    const [cookies, setCookie] = useCookies(['token']);

    const getTransaction = async () => {
        const {data} = await axios.get('http://localhost:3000/api/v1/transaction',{withCredentials:true});
        setTransaction(data.transactionArray);
    }
    const getUser = async ()=>{
        const response = await axios.get('http://localhost:3000/api/v1/user',{withCredentials:true})        
        setUser(response.data.user);
    }
    const sortTransaction = ()=>[
        transaction.forEach((tran)=>{
            const date = new Date(tran.createdAt)
            const tranDate = date.getDate() +" "+ date.toLocaleString('default', { month: 'long' }) + " " + date.getFullYear();
            tran.createdAt = tranDate;
        })
    ]
    
    useEffect(()=>{
        if(cookies){
            if(!cookies.token){
              return navigate("/login")
            }
            getTransaction();
            getUser();
            sortTransaction();
          }
          else{
            return navigate("/login")
          }
        getTransaction();
        getUser();
    },[cookies, setCookie])

    
    
  return (
        <>
            <main className='flex-grow overflow-auto pt-4 pb-20 px-4 space-y-6'>

            <Header/>
                <section>
                    <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
                    </div>
                    <div className="space-y-3">
                    
                    {transaction && transaction.toReversed().map(transaction => (
                        <div 
                        key={transaction.id} 
                        className="bg-white rounded-lg p-4 flex justify-between items-center shadow-sm border"
                        >
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-2 rounded-full">
                            <CreditCard className="text-blue-600" size={20} />
                            </div>
                            <div>
                            <p className="font-medium">{user && transaction.sender_id == user.id ? `Sent to ${transaction.recipientName}` : `Recieved from ${transaction.senderName}`}</p>
                            <p className="text-sm text-gray-500">{transaction.createdAt}</p>
                            </div>
                        </div>
                        <p className={`font-semibold ${ user && transaction.sender_id == user.id ?  'text-red-500 ' : 'text-green-500 '}`}>
                            {user && transaction.sender_id == user.id ? `-${transaction.amount}`: `+${transaction.amount}`}
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