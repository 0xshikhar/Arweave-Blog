import { WarpFactory } from "warp-contracts";
import { transactionId } from "./transactionid";
import wallet from './testwallet.json'

const envirornment = process.env.NEXT_PUBLIC_WARPENV || 'testnet'
let warp
let contract

async function getContract() {
    if (environment == 'testnet') {
        warp = WarpFactory.forTestnet()
        contract = warp.contract(transactionId).connect(wallet) // connecting wallet to contract to make a txn
    }
    else if (environment == 'mainnet') {
        warp = WarpFactory.forMainnet()
        contract = warp.contract(transactionId).connect(wallet)

    }
    else {
        throw new Error('Environment configured improperly...')
    }
}

export { getContract }

