import { useProvider } from "./useProvider"
import { setAccount, setSigner, setAddress} from "../store/slicers/data"
import { batch } from "react-redux"

export const useConnect = (dispatch) => {
    const connect = async () => {
       
        const provider = useProvider()
        // await provider
        // .send("eth_requestAccounts", [])
        // .then((accounts) =>  dispatch(setAccount(accounts[0])))
        // .catch((err) => console.log(err))
       const accounts = await provider
        .send("eth_requestAccounts", [])
        
        if(!accounts) return

        const signer = provider.getSigner()
        const address = signer.getAddress()

        signer.getAddress().then((address) => {
            batch(() => {
                dispatch(setAccount(accounts[0]))
                dispatch(setSigner(signer))
                dispatch(setAddress(address))
            })
        })
   }

   connect()
}