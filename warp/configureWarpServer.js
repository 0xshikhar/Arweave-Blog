import { WarpFactory } from "warp-contracts"
import fs from 'fs'

const envirornment = process.env.WARPENV || 'testnet'
let warp

if (envirornment === 'testnet') {
    warp = WarpFactory.forTestnet()
}
else if (envirornment === 'mainnet') {
    warp = WarpFactory.forMainnet()
}
else {
    throw Error('enviornnent is not configured...')
}

async function configureWallet() {
    try {
        if (envirornment === 'testnet') {
            // checking if there is a local test wallet and if not we are going to create a local test wallet
            try {
                return JSON.parse(fs.readFileSync('../testwallet.json', 'utf-8'))
            }
            catch (err) {
                const { jwk } = await warp.generateWallet() // to dynamically generate the wallet
                fs.writeFileSync('../testwallet.json', JSON.stringify(jwk))
                return jwk
            }
        }
        else {
            return JSON.parse(fs.readFileSync('../wallet.json', 'utf-8'))
        }
    }
    catch (err) {
        console.log("Error configuring wallet: ", err)
    }
}

export {
    configureWallet,
    warp
}