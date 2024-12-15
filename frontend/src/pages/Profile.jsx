import React,{useState, useEffect} from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
function Profile() {
    const navigate = useNavigate()
    const avatar = "https://api.dicebear.com/8.x/avataaars/svg?seed=john"
    const [user, setUser] = useState(null);
    const getDetails = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/profile`, {
          withCredentials: true,
        });
        
        if(!data.success){
            navigate("/login")
            setUser(null);
        }
        setUser(data.user);
      
    };

    const [cookies, setCookie] = useCookies(['token'])

    useEffect(() => {
        if(cookies){
            if(!cookies.token){
                return navigate("/login")
            }
            else{
                getDetails();
            }
        }
        else{
            return navigate("/login")
        }
    }, [cookies, setCookie]);

  return (
    <>
        <Header/>
        <main className="flex-grow overflow-auto pt-16 pb-20 px-4 space-y-6">
        <div className="flex flex-col items-center space-y-2 cursor-pointer">
                <img 
                    src={avatar} 
                    alt={user && user.name} 
                    className="w-16 h-16 rounded-full border-2 border-blue-500"
                />
                <p className="text-sm font-medium">{user && user.name}</p>
            </div>
        </main>
        <Navbar/>
    </>
  )
}

export default Profile