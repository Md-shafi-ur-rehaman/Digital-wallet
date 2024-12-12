
import React from 'react';
import { User, Mail, Phone, Lock, Shield } from 'lucide-react';

function InputFeild(props) {
  return (
    <div className="mb-4">
            <label htmlFor={props.name} className="block text-gray-700 mb-2">
              {props.lable}
            </label>
            <div className="flex items-center border rounded-lg">
              {<props.icon className="ml-3 text-gray-500"/>}
              <input
                type={props.type}
                id={props.id}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                placeholder= {props.placeHolder}
                maxLength={props.maxLength}
                className="w-full p-2 pl-2 rounded-lg focus:outline-none"
              />
            </div>
            {props.error && (
              <p className="text-red-500 text-sm mt-1">{props.error}</p>
            )}
          </div>
  )
}

export default InputFeild