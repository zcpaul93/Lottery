import { useLotteryContract } from "./useLotteryContract"
import { useState } from "react"

export const useTicketCommission = () => {
    const [ticketCommission, setTicketCommission] = useState(0)
    const lotteryContract = useLotteryContract()
    
    const getTicketCommission = async () => {
        if(!lotteryContract) return
        const data = await lotteryContract.ticketCommission()
        setTicketCommission(data)
    }
    
    getTicketCommission()
    
    return ticketCommission
}

