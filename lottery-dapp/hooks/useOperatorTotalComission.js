import { useLotteryContract } from "./useLotteryContract"
import { useState } from "react"

export const useOperatorTotalCommission = () => {
    const [operatorTotalCommission, setOperatorTotalCommission] = useState(0)
    const lotteryContract = useLotteryContract()
    
    const getOperatorTotalCommission = async () => {
        if(!lotteryContract) return
        const data = await lotteryContract.operatorTotalComission()
        setOperatorTotalCommission(data)
    }
    
    getOperatorTotalCommission()
    
    return operatorTotalCommission
}
