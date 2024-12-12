import { Route, Routes } from "react-router-dom";
import {HomePage, Register, Login, Send, History} from './pages/Index'


export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md h-[90vh] relative flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/Home" element={<HomePage/>} />
            <Route path="/Register" element={<Register/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/Send" element={<Send/>} />
            <Route path="/History" element={<History/>} />
          </Routes>
      </div>
    </div>
  )
}
