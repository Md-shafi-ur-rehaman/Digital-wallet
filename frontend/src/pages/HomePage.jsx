import axios from "axios"
import { useNavigate, Navigate } from "react-router-dom";
import Login from "./Login";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import {  
  CreditCard, 
} from 'lucide-react';
import BalanceCard from "../components/BalanceCard";
import {useCookies} from "react-cookie";
// import jwt from "jsonwebtoken"



function HomePage() {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['token']);
    const [balance, setBalance] = useState()
    const [isValidate, setIsValidate] = useState(false);
    const [transaction, setTransaction] = useState([]);
    const [user, setUser] = useState(null);

    const getDetails = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/balance`, {
        withCredentials: true,
      });
      if(!data.success){
        throw new Error(data.message)
      }
      setIsValidate(true);
      setBalance(data.balance); // Assuming `data.balance` contains the balance value
    
    };

    const getTransaction = async () => {
      const {data} = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/transaction`,{withCredentials:true});
      setTransaction(data.transactionArray);
    }
    const getUser = async ()=>{
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user`,{withCredentials:true})          
      setUser(response.data.user);
    }
    const sortTransaction = ()=>{
      transaction.forEach((tran)=>{
        const date = new Date(tran.createdAt)
        const tranDate = date.getDate() +" "+ date.toLocaleString('default', { month: 'long' }) + " " + date.getFullYear();
        tran.createdAt = tranDate;
      })
    }


    
  

    useEffect(() => {
        if(cookies){
          if(!cookies.token){
            return navigate("/login")
          }
          getDetails();
          getTransaction();
          getUser();
          sortTransaction();
        }
        else{
          return navigate("/login")
        }
    }, [cookies, setCookie]); // Empty dependency array ensures this runs only once on mount

    const [recentContacts] = useState([
        { 
          id: 1, 
          name: 'John Doe', 
          avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=john',
          lastTransaction: '$50 - 2 days ago'
        },
        { 
          id: 2, 
          name: 'Emma Smith', 
          avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=emma',
          lastTransaction: '$25 - 1 week ago'
        },
        { 
          id: 3, 
          name: 'Mike Johnson', 
          avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=mike',
          lastTransaction: '$100 - 3 days ago'
        }
    ]);

      return (
        <>
            <Header />
    
            {/* Main Content with Scrollable Area */}
            {!isValidate && <Navigate to="/" />}
            <main className="flex-grow overflow-auto pt-16 pb-20 px-4 space-y-6">
              {/* Balance Card */}
              <BalanceCard balance={balance}/>
    
              {/* Quick Send Section */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Quick Send</h3>
                </div>
                <div className="flex space-x-4">
                  {recentContacts.map(contact => (
                    <div 
                      key={contact.id} 
                      className="flex flex-col items-center space-y-2 cursor-pointer"
                    >
                      <img 
                        src={contact.avatar} 
                        alt={contact.name} 
                        className="w-16 h-16 rounded-full border-2 border-blue-500"
                      />
                      <p className="text-sm font-medium">{contact.name}</p>
                    </div>
                  ))}
                </div>
              </section>
    
              {/* Recent Transactions */}
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
            </main>
    
            {/* Fixed Bottom Navigation */}
            <Navbar />
            </>
      );
}

export default HomePage;
