import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputFeild from "../components/InputFeild";
import { Shield, Currency, CheckCircle } from "lucide-react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useCookies } from "react-cookie";
import SuccessIconPath from "../assets/money.mp4";
import paisa from "../assets/paisa.mp3"

function Send() {
  const { state } = useLocation();
  // const phoneNumber = state.phoneNumber
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (cookies) {
      if (!cookies.token) {
        return navigate("/login");
      }
    } else {
      return navigate("/login");
    }
  }, [cookies, setCookie]);

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 4000);

    return () => clearTimeout(animationTimer);
  }, []);

  const [errors, setErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  const [amount, setAmount] = useState();
  const [pin, setPin] = useState();

  const handleChangeAmount = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    setAmount(inputValue);
  };
  const handleChangePin = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "").slice(0, 4);
    setPin(inputValue);
  };

  useEffect(() => {
    setAmount(amount);
    setPin(pin);
  }, [amount, pin, errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous states
    setErrors(null);
    setTransactionSuccess(false);

    // Start loading
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/send`,
        {
          phoneNumber: state.phoneNumber,
          amount,
          pin,
        },
        { withCredentials: true }
      );
      if (!response.data.success) {
        // setErrors(response.data.message)
        throw new Error(response.data.message);
      }
      setTransactionSuccess(true);
    } catch (err) {
      setErrors(err);
      setTransactionSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (transactionSuccess) {
    const audio = new Audio(paisa);
    audio.play()
      return (
          <>
        <Header />
        <div className="h-full flex items-center justify-center">
            <div>
                <div className="flex items-center justify-center">
                
                <video
                    width="120"
                    height="120"
                    autoPlay={true}
                    loop={true}
                    muted
                    >
                    <source src={SuccessIconPath} type="video/webm" />
                    Your browser does not support the video tag.
                </video>
                
                </div>
                <p className="text-center">Payment Successfull</p>
                <p className="text-center mt-10"><a href="/home" className="text-center text-blue-600">Home</a></p>
                
            </div>
          {/* <img src={SuccessIconPath} width={300} height={300}/> */}
        </div>
        <Navbar />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow overflow-auto pt-16 pb-20 px-4 space-y-6">
        <div>
          <div className="flex flex-col items-center space-y-2 cursor-pointer">
            <img
              src={state.avatar}
              alt={state.name}
              className="w-16 h-16 rounded-full border-2 border-blue-500"
            />
            <p className="text-sm font-medium">{state.name}</p>
          </div>
        </div>
        {errors && (
          <div
            className={`bg-red-100 border border-red-400 text-red-700 ${
              errors.message ? "px-4 py-3" : "hidden"
            } rounded relative mb-4`}
            role="alert"
          >
            <span className="block sm:inline">{errors.message}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <InputFeild
            type="Number"
            name="amount"
            id="amount"
            value={amount}
            onChange={handleChangeAmount}
            placeHolder=""
            error={null}
            icon={Currency}
            lable="Amount"
          />
          <InputFeild
            type="Number"
            name="pin"
            id="pin"
            value={pin}
            onChange={handleChangePin}
            placeHolder="Enter your 4-digit pin"
            error={null}
            icon={Shield}
            lable="Pin"
            maxLength="4"
          />
          {!isLoading && (
            <button
              type="submit"
              className={`w-full text-white py-3 rounded-lg transition duration-300 ${
                amount && pin && pin.length == 4
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }bg-blue-600 hover:bg-blue-700`}
            >
              Send
            </button>
          )}
        </form>
      </main>
      <Navbar />
    </>
  );
}

export default Send;
