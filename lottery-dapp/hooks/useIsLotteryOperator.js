import { useLotteryContract } from "./useLotteryContract"
import { useState } from "react"
import { useSigner } from "./useSigner"

export const useIsLotteryOperator = () => {
    const [isLotteryOperator, setIsLotteryOperator] = useState()
    const lotteryContract = useLotteryContract()
    const signer = useSigner()
    
    const getIsLotteryOperator = async () => {
        if(!lotteryContract) return
        const data = await lotteryContract.connect(signer).lotteryOperator()
 
        setIsLotteryOperator(data)
    }
    getIsLotteryOperator()
    
    return isLotteryOperator
}
