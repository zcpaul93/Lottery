import { useLotteryContract } from "./useLotteryContract"
import { useState } from "react"

export const useRemainingTicket = () => {
    const [remainingTicket, setRemainingTicket] = useState(0)
    const lotteryContract = useLotteryContract()
    
    const getRemainingTicket = async () => {
        if(!lotteryContract) return
        const data = await lotteryContract.RemainingTickets()
        setRemainingTicket(data)
    }
    

     getRemainingTicket()
    
    return remainingTicket

}

