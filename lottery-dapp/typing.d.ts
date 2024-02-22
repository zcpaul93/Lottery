 import { ExternalProvider } from "@ethersproject/providers"
import { AnyAction } from "@reduxjs/toolkit"
import { Dispatch } from "react"

declare global {
    interface Window {
        ethereum?: ExternalProvider
    }
    
}