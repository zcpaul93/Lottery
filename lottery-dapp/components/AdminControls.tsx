import { ArrowPathIcon, ArrowUturnDownIcon, CurrencyDollarIcon, StarIcon } from '@heroicons/react/24/solid'
import { ethers } from 'ethers'
import React from 'react'
import { toast } from 'react-hot-toast'
import { currency } from '../constants'
import { useLotteryContract } from '../hooks/useLotteryContract'
import { useOperatorTotalCommission } from '../hooks/useOperatorTotalComission'
import { useSigner } from '../hooks/useSigner'

function AdminControls() {

  const lotteryContract = useLotteryContract()
  const signer = useSigner()
  const operatorTotalCommission = useOperatorTotalCommission()

  const onDrawWinner = async () => {
    const notification = toast.loading("Pickup a Luck Winner...")

    try {
        const txn = await lotteryContract.connect(signer).DrawWinnerTicket()
        await txn

        toast.success("A Winner has been selected", {
            id: notification
        })
    } catch (err) {
        toast.error("Whoops something went wrong!", {
            id: notification
        })
    }
  }

  const onWithdrawCommission = async () => {
    const notification = toast.loading("Withdraw commission...")

    try {
        const txn = await lotteryContract.connect(signer).WithdrawCommission()
        await txn

        toast.success("Your commission has been withdraw successfully!", {
            id: notification
        })
    } catch (err) {
        toast.error("Whoops something went wrong!", {
            id: notification
        })
    }
  }

  const onRestartDraw = async () => {
    const notification = toast.loading("Restarting draw...")

    try {
        const txn = await lotteryContract.connect(signer).restartDraw()
        await txn

        toast.success("Draw restarted successfully!", {
            id: notification
        })
    } catch (err) {
        toast.error("Whoops something went wrong!", {
            id: notification
        })
    }
  }

  const onRefundAll = async () => {
    const notification = toast.loading("Refunding all...")

    try {
        const txn = await lotteryContract.connect(signer).RefundAll()
        await txn

        toast.success("All refunded successfully!", {
            id: notification
        })
    } catch (err) {
        toast.error("Whoops something went wrong!", {
            id: notification
        })
    }
  }
  

  return (
    <div className="text-white text-center px-5 py-3 rounded-md
    border-emerald-300/20 border">
        <h2 className="font-bold">Admin Controls</h2>
        <p className="mb-5">
            Total Commission to be withdrawn: {" "}
            {operatorTotalCommission && 
                ethers.utils.formatEther(operatorTotalCommission?.toString())}
            {" "}
            {currency} 
        </p>

        <div className="flex flex-col space-y-2 md:flex-row 
        md:space-y-0 md:space-x-2">
            <button onClick={onDrawWinner}
             className="admin-button">
                <StarIcon className="h-6 mx-auto mb-2" />
                Draw Winner
            </button>
            <button onClick={onWithdrawCommission} 
            className="admin-button">
                <CurrencyDollarIcon className="h-6 mx-auto mb-2" />
                Withdraw Comission
            </button>
            <button onClick={onRestartDraw} 
            className="admin-button">
                <ArrowPathIcon className="h-6 mx-auto mb-2" />
                Restart Draw
            </button>
            <button onClick={onRefundAll} 
            className="admin-button">
                <ArrowUturnDownIcon className="h-6 mx-auto mb-2" />
                Refund All
            </button>
        </div>
    </div>
  )
}

export default AdminControls