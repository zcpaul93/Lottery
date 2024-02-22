import { useLotteryContract } from "./useLotteryContract"
import { useState } from "react"

export const useTickets = () => {
    const [tickets, setTickets] = useState([])
    const lotteryContract = useLotteryContract()
    
    const getTickets = async () => {
        if(!lotteryContract) return
        const data = await lotteryContract.getTickets()
        setTickets(data)
    }
    
    getTickets()
    
    return tickets
}
