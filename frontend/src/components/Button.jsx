import React from 'react'

function Button(props) {
    console.log("lo ",props.isLoading);
    
  return (
    <>
        <button
                type="submit"
                // disabled={!props.isLodaing}
                className={`w-full text-black py-3 rounded-lg transition duration-300 
                     ${ props.isLoading ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed' }
                    `}
            >
                Send
                {/* {isLoading ? 'logining...' : 'login'} */}
        </button>
    </>
  )
}

export default Button