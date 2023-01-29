import { configureWallet, warp } from "./configureWarpServer.js";
import { transactionId } from "../transactionid.js"
import {v4 as uuid} from 'uuid'

async function createPost(){
    let wallet = await configureWallet()
    const contract = warp.contract(transactionId).connect(wallet)  // create a instance of contract

    await contract.writeInteraction({
        function: "createPost",
        post: {
            title: "Hi, this is my first post",
            content: "First post content",
            id: uuid()
        }
    })
}

createPost()