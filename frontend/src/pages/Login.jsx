import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Phone, Lock, Shield } from 'lucide-react';
import InputFeild from '../components/InputFeild';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';



// API Client Configuration
const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Registration Component
const Login = () => {
  const [cookies, setCookie] = useCookies(['token'])

  useEffect(() => {
    if(cookies){
      if(!cookies.token){
        return navigate("/login")
      }
    }
    else{
      return navigate("/login")
    }
  }, [cookies, setCookie]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset previous states
    setApiError(null);
    setLoginSuccess(false);

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Start loading
    setIsLoading(true);

    try {

      // Send registration request
      const response = await apiClient.post('/login', {
        email: formData.email,
        password: formData.password,
      },
      {withCredentials:true}
      );
      // Handle successful registration
      setLoginSuccess(true);
      
      // Optional: Store user token
      // if (response.data.token) {
      //   localStorage.setItem('userToken', response.data.token);
      // }

      // Reset form
      setFormData({
        email: '',
        password: '',
      });

      // Optional: You might want to redirect or show a success message
      alert('Login Successful!');
      return navigate('/home');

    } catch (error) {
      // Handle registration errors
      if (error.response) {
        // Server responded with an error
        setApiError(error.response.data.message || 'Login failed');
      } else if (error.request) {
        // No response received
        setApiError('No response from server. Please check your internet connection.');
      } else {
        // Error setting up the request
        setApiError('An unexpected error occurred');
      }
    } finally {
      // Stop loading
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-0 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Login
        </h2>
        
        {/* API Error Message */}
        {apiError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{apiError}</span>
          </div>
        )}

        {/* Registration Success Message */}
        {loginSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">login Successful!</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>

          <InputFeild type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeHolder="Enter your email"
                      error={errors.email}
                      icon={Mail}
                      lable="Email address"
          />

          <InputFeild type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeHolder="Create a strong password"
                      error={errors.password}
                      icon={Lock}
                      lable="Password"
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white py-3 rounded-lg transition duration-300 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'logining...' : 'login'}
          </button>
          <p>Dont have an Account? <Link to='/register' className='text-blue-600'>Register here</Link></p>

        </form>
      </div>
    </div>
  );
};

export default Login;