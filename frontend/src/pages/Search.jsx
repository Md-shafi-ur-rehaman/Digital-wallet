import {useEffect, useState} from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import axios from 'axios';

import { 
  Home, 
  Send, 
  Clock, 
  User, 
  CreditCard, 
  ChevronDown, 
  EllipsisVertical,
} from 'lucide-react';
import InputFeild from '../components/InputFeild';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';



function Search() {
  const navigate = useNavigate();
  const avatar ='https://api.dicebear.com/8.x/avataaars/svg?seed=john'
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

  const [name, setName] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to validate and send phone number
  const sendPhoneNumber = async (number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/search`, { 
        phoneNumber: number 
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });


      if(response.data.isValid){
        setIsValid(true);
        setName(response.data.name);
        setPhoneNumber(response.data.phoneNumber);
      }
      
      // You might want to show a success message or update UI
    } catch (err) {
      // Handle error
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e)=>{
    const inputValue = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(inputValue);
    setName(null)
  }

  useEffect( () =>{
    const cleanedNumber = phoneNumber.replace(/\D/g, '');

    // Check if the number is exactly 10 digits
    if (cleanedNumber.length === 10) {
      sendPhoneNumber(cleanedNumber);
    }

  },[phoneNumber])

  const handleSubmit = async ()=>{
    navigate('/send', {state:{name,phoneNumber, avatar}})
  }
  

  return (
    <div>
        <Header />
        <main className="flex-grow overflow-auto pt-16 pb-20 px-4 space-y-6">
          <InputFeild type="Number"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={handleChange}
                      placeHolder="Search any mobile number"
                      error={null}
                      icon={User}
                      lable="Mobile number"
          />
          {isLoading && (
            <div className="text-blue-600">Verifying phone number...</div>
          )}

          {error && (
            <div className="text-red-500">{error}</div>
          )}

          <div onClick={handleSubmit} className='w-full p-2 pl-2 rounded-lg bg-blue-50 flex items-center space-x-4 cursor-pointer	'>
            {name && <img
              src={avatar}
              alt={name}
              className="w-16 h-16 rounded-full border-2 border-blue-500"
            />}
            <p className='flex-grow text-left strong'>{name ? name : phoneNumber}</p>
          </div>

          {/* {quick send} */}
          <section>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Quick Send</h3>
                    <a href="#" className="text-blue-600 text-sm">See All</a>
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
          
        </main>
        <Navbar/>
    </div>
  )
}

export default Search;