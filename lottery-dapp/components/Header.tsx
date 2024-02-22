import React from 'react'
import NavButton from './NavButton'
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid"
import { useAddress } from '../hooks/useAddress' 
import { useDisconnect } from '../hooks/useDisconnect'
import { useProvider } from '../hooks/useProvider'
import { AnyAction, Dispatch } from '@reduxjs/toolkit'

 
function Header() {

    const address = useAddress()
 
  return (
    <header className="grid grid-cols-2 md:grid-cols-5 
    justify-between items-center p-5">
        <div className="flex items-center space-x-2">
            <img className="rounded-full h-20 w-20" 
            src="https://yt3.googleusercontent.com/ytc/AMLnZu9EizMhsxfUWLvwQpVJruHOkvI5qXtEdSp7fuIQYg=s900-c-k-c0x00ffffff-no-rj" alt="" />
            <div>
                <h1 className="text-lg text-white font-bold">
                    ZCPAUL DRAW
                </h1>
                <p className="text-xs text-emerald-500 truncate">
                    User: {address?.substring(0,5)}...
                    {address.substring(address?.length, address.length - 5)}
                </p>
            </div>
        </div>

        <div className="hidden md:col-span-3 md:flex items-center
        justify-center rounded-md">
            <div className="bg-[#0A1F1C] p-4 space-x-2">
                <NavButton isActive title="Buy Ticket" />
                <NavButton title="Logout" />
            </div>
        </div>

        <div className="flex flex-col ml-auto text-right">
            <Bars3BottomRightIcon className="h-8 w-8 mx-auto text-white
            cursor-pointer" />
            <span className="md:hidden">
                <NavButton title="Logout" />
            </span>
        </div>
    </header>
  )
}

export default Header