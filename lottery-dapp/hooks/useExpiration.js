import { useLotteryContract } from "./useLotteryContract"
import { useState } from "react"

export const useExpiration = () => {
    const [expiration, setExpiration] = useState(0)
    const lotteryContract = useLotteryContract()
    
    const getExpiration = async () => {
        if(!lotteryContract) return
        const data = await lotteryContract.expiration()
        setExpiration(data)
    }
    
    getExpiration()
   
    return expiration
}

