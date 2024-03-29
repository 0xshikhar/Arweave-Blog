// to read from smart contract
import { configureWallet, warp } from "./configureWarpServer.js";
import { transactionId } from "../transactionid.js"

async function read(){
    let wallet = await configureWallet()
    // create a instance of contract
    const contract = warp.contract(transactionId).connect(wallet)
    const {cachedValue} = await contract.readState() //reading the contract state
    console.log('Contract state: ', JSON.stringify(cachedValue))
}

read()