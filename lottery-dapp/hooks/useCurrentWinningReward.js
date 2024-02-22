import { useLotteryContract } from "./useLotteryContract"
import { useState } from "react"
import { ethers } from "ethers"

export const useCurrentWinningReward = () => {
    const [currentWinningReward, setCurrentWinningReward] = useState(0)
    const lotteryContract = useLotteryContract()

    const getCurrentWinningReward = async () => {
        if(!lotteryContract) return
        const data = await lotteryContract.CurrentWinningReward()
        setCurrentWinningReward(data)
    }
    
    getCurrentWinningReward()
    
    return currentWinningReward

}

