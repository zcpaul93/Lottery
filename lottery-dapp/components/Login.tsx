import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useConnect } from '../hooks/useConnect'
import { useProvider } from '../hooks/useProvider'


interface Props {
    dispatch: Dispatch<AnyAction>
}

function Login({dispatch}: Props) {
    
  
    
    return (
    <div className="bg-[#091B1B] min-h-screen flex flex-col 
    items-center justify-center">
        <div className="flex flex-col items-center mb-10">
            <img
            className="rounded-full h-56 w-56 mb-10" 
            src="https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png" alt="" />
            <h1 className="text-6xl text-white font-bold">
                THE ZCPAUL DRAW
            </h1>
            <h2 className="text-whisste">
                Get Started By Logging in with your MetaMask 
            </h2>
            <button className="bg-white px-8 py-5 mt-10 rounded-lg shadow-lg 
                font-bold" 
                onClick={() => useConnect(dispatch)}> 
                Login with Metamask
            </button>
        </div>
    </div>
  )
}

export default Login