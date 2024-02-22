import { useLotteryContract } from "./useLotteryContract"
import { useState } from "react"

export const useLastWinnerAmount = () => {
    const [lastWinnerAmount, setLastWinnerAmount] = useState(0)
    const lotteryContract = useLotteryContract()
    
    const getLastWinnerAmount = async () => {
        if(!lotteryContract) return
        const data = await lotteryContract.lastWinnerAmount()
        setLastWinnerAmount(data)
    }
    
    getLastWinnerAmount()
    
    return lastWinnerAmount
}
