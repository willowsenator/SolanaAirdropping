import * as solana from "@solana/web3.js"
const wallet = new solana.Keypair()
const getWalletBalance = async () =>{
    try {
        const connection = new solana.Connection(solana.clusterApiUrl("devnet"), "confirmed")
        const walletBalance = await connection.getBalance(wallet.publicKey)
        console.log(`Wallet balance is ${walletBalance}`)
    }
    catch (err){
        console.error(err)
    }
}

const airDropSol = async () => {
    try{
        const connection = new solana.Connection(solana.clusterApiUrl("devnet"), "confirmed")
        const airDropSignature = await connection.requestAirdrop(wallet.publicKey, 2 * solana.LAMPORTS_PER_SOL)
        await connection.confirmTransaction(airDropSignature)
    }
    catch(err){
        console.error(err)
    }
}

const main = async () =>{
    await getWalletBalance()
    await airDropSol()
    await getWalletBalance()
}

main()