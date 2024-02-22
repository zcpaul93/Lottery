import React from 'react'
import store from '../store'
import { setAccount, setAddress, setSigner } from '../store/slicers/data'

interface Props {
    title: string
    isActive?: boolean
}

function NavButton({title, isActive} : Props) {

  const disconnect = () => {
     store.dispatch(setAddress(null)) 
     store.dispatch(setAccount(null)) 
     store.dispatch(setSigner(null)) 
  }

  return (
    <button 
    onClick={disconnect}
    className= {`${
        isActive && "bg-[#036756]"
    }
    hover:bg-[#036756] 
    text-white py-2 px-4 rounded font-bold}`}>
        {title}
    </button>
  )
}

export default NavButton