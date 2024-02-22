import type { NextPage } from 'next'
import { ethers } from "ethers"
import Head from 'next/head'
import Header from '../components/Header'
import { batch, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { LOTTERY_ADDRESS } from '../constants/address'
import { LOTTERY_ABI } from '../constants/abi'
import { setLotteryContract } from '../store/slicers/contracts'
import { setAddress, setProvider, setSigner } from '../store/slicers/data'
import { useAddress } from '../hooks/useAddress'
import Login from '../components/Login'
import { currency } from '../constants'
import Marquee from 'react-fast-marquee'
import { useRemainingTicket } from '../hooks/useRemainingTicket'
import { useCurrentWinningReward } from '../hooks/useCurrentWinningReward'
import { useTicketPrice } from '../hooks/useTicketPrice'
import { useTicketCommission } from '../hooks/useTicketCommission'
import { useExpiration } from '../hooks/useExpiration'
import CountDownTimer from '../components/CountDownTimer'
import { toast } from 'react-hot-toast'
import { useLotteryContract } from '../hooks/useLotteryContract'
import { useSigner } from '../hooks/useSigner'
import { useTickets } from '../hooks/useTickets'
import { useWinnings } from '../hooks/useWinnings'
import { useLastWinner } from '../hooks/useLastWinner'
import { useLastWinnerAmount } from '../hooks/useLastWinnerAmount'
import { useIsLotteryOperator } from '../hooks/useIsLotteryOperator'
import AdminControls from '../components/AdminControls'
import { useProvider } from '../hooks/useProvider'

const Home: NextPage = () => {
  
  const [quantitiy, setQuantitiy] = useState<number>(1)
  const [userTickets, setUserTickets] = useState(0)
  
  const dispatch = useDispatch()
  const address = useAddress()
  const lotteryContract = useLotteryContract()
  const signer = useSigner()
  const isLotteryOperator = useIsLotteryOperator()
  const remainingTicket = useRemainingTicket()
  const currentWinningReward = useCurrentWinningReward()
  const ticketPrice = useTicketPrice()
  const ticketCommission = useTicketCommission()
  const expiration = useExpiration()
  const tickets = useTickets()
  const winnings = useWinnings(address)
  const lastWinner = useLastWinner()
  const lastWinnerAmount = useLastWinnerAmount()

 
  
  
  useEffect(() => {

    if(!window.ethereum) {
      alert("Metamask is not installed!")
      return
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum) 
    const LotteryContract = new ethers.Contract(LOTTERY_ADDRESS, LOTTERY_ABI, provider)

    const signer = provider.getSigner()
    const adresim =  provider.getSigner()._address
    
  if(!adresim) {

    signer.getAddress().then((address) => {
      batch(() => {
        dispatch(setProvider(provider))
        dispatch(setLotteryContract(LotteryContract))
        dispatch(setSigner(signer));
        dispatch(setAddress(address));
      });
    });
  }
   
  }, [])

  useEffect(() => {
     if(!tickets) return

     const totalTickets: string[] = tickets
     const noOfUserTickets = totalTickets.reduce((total, ticketAddress) => (
      ticketAddress === address ? total + 1 : total),0
     )

     setUserTickets(noOfUserTickets)

  }, [tickets, address])
  

  const onBuyTicket = async () => {
    if(!ticketPrice) return

    const notification = toast.loading("Buying your ticket...")
    try {
      const data = ethers.utils.parseEther(
        (
          Number(ethers.utils.formatEther(ticketPrice)) * quantitiy
        ).toString()
      )
      
      const txn = await lotteryContract.connect(signer).BuyTickets({
        value: data
      })

      await txn
      toast.success("Ticket purchased succesfully!", {
        id: notification
      })

    } catch (err) {
      console.log("contract call failure")
      
    }
  }

  const onWithdrawWinnings = async () => {
    const notification = toast.loading("Withdrawing winnings...")
    
    try {
      const txn = await lotteryContract.connect(signer).WithdrawWinnings()
      await txn
      
      toast.success("Winnings withdrawn succesfully!", {
        id: notification,
      })
    } catch (err) {
      toast.error("Whoops somethings went wrong!", {
        id: notification,
      })
    }

  }

   if(!address) return <Login dispatch={dispatch}/>
  return (
    <div className="bg-[#091B18] min-h-screen flex flex-col">
      <Head>
        <title>Lottery</title>
      </Head>
      
      <div className="flex-1">
      <Header/>
      
      <Marquee className="bg-[#0A1F1C] p-5 mb-5" gradient={false}
      speed={100}>
        <div className="flex space-x-2 mx-10">
          <h4 className="text-white font-bold">
            Last Winner: {lastWinner?.toString()}
          </h4>
          <h4 className="text-white font-bold">
            Previous winnigs:{" "}
            {lastWinnerAmount && 
              ethers.utils.formatEther(lastWinnerAmount?.toString())
            }
          </h4>
        </div>
      </Marquee>
      
      {isLotteryOperator === address && (
        <div className="flex justify-center">
          <AdminControls />
        </div>
      )}

      {winnings > 0 && (
        <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5">
          <button 
          onClick={onWithdrawWinnings}
          className="p-5 bg-gradient-to-b from-orange-500 
          to-emerald-600 animate-pulse text-center rounded-xl w-full">
            <p className="font-bold">Winner winner!</p>
            <p>
              Total Winnigs: {ethers.utils.formatEther(winnings.toString())}
              {" "}
              {currency}
            </p>
            <br />
            <p className="font-semibold">Click here to withdraw</p>
          </button>
        </div>
      )}

      {/* The Next Draw box */}
      <div className="space-y-5 md:space-y-0 md:space-x-5 md:flex md:flex-row 
      items-start justify-center">
      
        <div className="stats-container">
          <h1 className="text-5xl text-white font-semibold text-center">
            The Next Draw
          </h1>
          <div className="flex justify-between p-2 space-x-2">
            <div className="stats">
              <h2 className="text-sm">Total Pool</h2>
              <p>{currentWinningReward && 
                  ethers.utils.formatEther(currentWinningReward?.toString()
                  )} {" "} 
                  {currency}
                </p>

            </div>
            <div className="stats">
              <h2 className="text-sm">Tickets Remaining</h2>
              <p className="text-xl">{remainingTicket?.toString()}</p>
            </div>
          </div>

          {/* Countdown timer */}
          <div className="mt-5 mb-3">
            <CountDownTimer />
          </div>

        </div>

        <div className="stats-container space-y-2">
          <div className="stats-container">
            <div className="flex justify-between items-center text-white pb-2">
              <h2>Price per ticket &nbsp;</h2>
              <p>{ticketPrice && 
                  ethers.utils.formatEther(ticketPrice?.toString()
                  )} {" "} 
                  {currency}
                </p>
            </div>

            <div className="flex text-white items-center space-x-2 
            bg-[#091B18] border-[#004337] border p-4">
              <p>TICKETS</p>  
              <input 
              className="flex w-full bg-transparent text-right outline-none" 
              type="number"
              min={1}
              max={10}
              value={quantitiy}
              onChange={(e) => setQuantitiy(Number(e.target.value))} 
              />
            </div>

            <div className="space-y-2 mt-5">
              <div className="flex items-center justify-between text-emerald-300
              text-sm italic font-extrabold">
                <p>Total cost tickets</p>
                <p>
                  {ticketPrice && 
                   Number(ethers.utils.formatEther(ticketPrice.toString()))
                   * quantitiy} {" "} 
                   {currency}
                </p>
              </div>

              <div className="flex items-center justify-between text-emerald-300
              text-xs italic">
                <p>Service fees</p>
                <p>{ticketCommission && 
                  ethers.utils.formatEther(ticketCommission?.toString()
                  )} {" "} 
                  {currency}
                </p>
              </div>

              <div className="flex items-center justify-between text-emerald-300
              text-xs italic">
                <p>+ Network Fees</p>
                <p>TBC</p>
              </div>

            </div>
            
            <button 
            onClick={onBuyTicket}
            disabled = {
              expiration?.toString() < Date.now().toString()
              || remainingTicket === 0
            }
            className="mt-5 w-full bg-gradient-to-br from-orange-500 to-emerald-600
            px-10 py-5 rounded-md text-white shadow-xl disabled:from-gray-600 disabled:to-gray-600
            disabled:text-gray-100 disabled:cursor-not-allowed">
              Buy tickets {quantitiy} tickets for {" "}
              {ticketPrice && 
                Number(ethers.utils.formatEther(ticketPrice.toString())) 
                * quantitiy}{" "}
                {currency}
            </button>
          </div>

          {userTickets > 0 && (
            <div className="stats">
              <p className="text-lg mb-2">You have {userTickets} Tickets in this draw</p>

              <div className="flex max-w-sm flex-wrap gap-x-2 gap-y-2">
                {Array(userTickets)
                  .fill("")
                  .map((_, index) => (
                    <p className="text-emerald-300 h-20 w-12
                    bg-emerald-500/30 rounded-lg flex flex-shrink-0
                    items-center justify-center text-xs italic" 
                    key={index}>
                      {index + 1 }
                    </p>
                  ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* The price per ticket box */}
      </div>

    </div>
  )


}

export default Home
