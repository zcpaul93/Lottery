import { useLotteryContract } from "./useLotteryContract"
import { useState } from "react"
import { useAddress } from "./useAddress"
import { ethers } from "ethers"

export const useWinnings = (address) => {
    const [winnings, setWinnings] = useState(0)
    const lotteryContract = useLotteryContract()
    
    const getWinnings = async () => {
        if(!lotteryContract) return
        console.log(address);
        const data = await lotteryContract.getWinningsForAddress(address)

        setWinnings(data)
    }
    
    getWinnings()
    
    return winnings
}
