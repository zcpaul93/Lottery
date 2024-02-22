import { useLotteryContract } from "./useLotteryContract"
import { useState } from "react"
import { ethers } from "ethers"

export const useTicketPrice = () => {
    const [ticketPrice, setTicketPrice] = useState(0)
    const lotteryContract = useLotteryContract()
    
    const getTicketPrice = async () => {
        if(!lotteryContract) return
        const data = await lotteryContract.ticketPrice()
        setTicketPrice(data)
    }
    
    getTicketPrice()
    
    return ticketPrice
}

