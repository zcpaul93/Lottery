import { useSelector } from "react-redux";
import { ethers } from "ethers"

export const useProvider = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum) 
    return provider;
}