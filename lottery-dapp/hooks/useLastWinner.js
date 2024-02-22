import { useLotteryContract } from "./useLotteryContract"
import { useState } from "react"

export const useLastWinner = () => {
    const [lastWinner, setLastWinner] = useState('')
    const lotteryContract = useLotteryContract()
    
    const getLastWinner = async () => {
        if(!lotteryContract) return
        const data = await lotteryContract.lastWinner()
        setLastWinner(data)
    }
    
    getLastWinner()
    
    return lastWinner
}
