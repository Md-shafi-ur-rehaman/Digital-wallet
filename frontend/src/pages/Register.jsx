import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Phone, Lock, Shield } from 'lucide-react';
import InputFeild from '../components/InputFeild';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';



// API Client Configuration
const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Registration Component
const Register = () => {
  const [cookies, setCookie] = useCookies(['token'])

  useEffect(() => {
    if(cookies){
      if(!cookies.token){
        return navigate("/register")
      }
    }
    else{
      return navigate("/register")
    }
  }, [cookies, setCookie]);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    pin: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Special handling for PIN (only digits)
    if (name === 'pin') {
      const numericValue = value.replace(/\D/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: numericValue.slice(0, 4)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
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

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Phone number validation
    const phoneRegex = /^[+]?[\d\s()-]{10,15}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // PIN validation
    if (!formData.pin) {
      newErrors.pin = 'PIN is required';
    } else if (formData.pin.length !== 4) {
      newErrors.pin = 'PIN must be 4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset previous states
    setApiError(null);
    setRegistrationSuccess(false);

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Start loading
    setIsLoading(true);

    try {

      // Send registration request
      const response = await apiClient.post('/register', {
        name: formData.name,
        email: formData.email,
        phoneNumber: parseInt(formData.phoneNumber),
        password: formData.password,
        pin: parseInt(formData.pin)
      },
      {withCredentials:true}
      );
      // Handle successful registration
      setRegistrationSuccess(true);
      
      // Optional: Store user token
      // if (response.data.token) {
      //   localStorage.setItem('userToken', response.data.token);
      // }

      // Reset form
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        pin: ''
      });

      // Optional: You might want to redirect or show a success message
      alert('Registration Successful!');
      navigate('/');

    } catch (error) {
      // Handle registration errors
      if (error.response) {
        // Server responded with an error
        setApiError(error.response.data.message || 'Registration failed');
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
    <div className="bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          User Registration
        </h2>
        
        {/* API Error Message */}
        {apiError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{apiError}</span>
          </div>
        )}

        {/* Registration Success Message */}
        {registrationSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">Registration Successful!</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>

          < InputFeild name="name"
                       type="text"  
                       id="name" 
                       value={formData.name} 
                       onChange={handleChange} 
                       placeHolder='Enter your full name' 
                       icon={User} 
                       error={errors.name}
                       lable="Full name"
          />
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

          <InputFeild type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeHolder="Enter your phone number"
                      error={errors.phoneNumber}
                      icon={Phone}
                      lable="Phone Number"
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
          
          <InputFeild name="pin"
                      type="text"
                      id="pin"
                      value={formData.pin}
                      onChange={handleChange}
                      placeHolder="Enter 4-digit PIN"
                      error={errors.pin}
                      icon={Shield}
                      lable="4-Digit PIN"
                      maxLength="4"
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
            {isLoading ? 'Registering...' : 'Register'}
          </button>
          <p>Already have an Account? <Link to='/login' className="text-blue-600">Login here</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;