import { configureWallet, warp } from './configureWarpServer.js'
import fs from 'fs'

async function deploy() {
    const wallet = await configureWallet()
    const state = fs.readFileSync('state.json', 'utf-8')
    const contractsource = fs.readFileSync('contract.js', 'utf-8')

    const { contractTxId } = await warp.createContract.deploy({
        wallet,
        initState: state,
        src: contractsource,
    })

    fs.writeFileSync('../transactionid.js', `export const transactionId = "${contractTxId}"`)
    const contract = warp.contract(contractTxId).connect(wallet)

    // initialize function to write our first interaction to the contract 
    await contract.writeInteraction({
        function: 'initialize' // calling initialize function
    })

    // to get idea of how current state looks like
    const { cachedValue } = await contract.readState()

    console.log('Contract state:', cachedValue)
    console.log('contractTxId:', contractTxId)

}

deploy()