import React from 'react'
import { sequence } from '0xsequence'
import logo from './logo.svg'
import { useEffect } from 'react'

const Sequence = () => {
  const wallet = sequence.initWallet('testnet')

  const walletGet = sequence.getWallet()

  const getWallet = async () => {
    const connectDetails = await walletGet.connect({
      app: 'My Testing Dapp',
      authorize: true,
      refresh: true,
    //   askForEmail: true,
      //   refresh:true,
      //   // And pass settings if you would like to customize further
      //   settings: {
      //     theme: 'light',
      //     bannerUrl: logo, // 3:1 aspect ratio, 1200x400 works best
      //     // includedPaymentProviders: ['moonpay', 'ramp'],
      //     defaultFundingCurrency: 'matic',
      //     lockFundingCurrencyToDefault: false,
      //     signInOptions:['google','discord'],

      //   },
      //   expiry:3600
      //   keepWalletOpened:true
    })
    let addrs = await walletGet.getAddress()

    console.log('user accepted connect?', connectDetails)
    console.log(
      'users signed connect proof to valid their account address:',
      connectDetails.proof,
      await walletGet.getAddress(),
    )
    

    //    await walletGet.openWallet()
  }

  const handleSignin =async ()=>{
    let signer =  walletGet.getSigner()
    let signin = await signer.signMessage(await walletGet.getAddress())
    console.log(signin)
  }

  useEffect(() => {
    const getUserDetail = async () => {
      console.log(await walletGet.getAuthProvider())
      console.log(await walletGet.getAuthSigner())
    }
    getUserDetail()
  }, [])

  return (
    <div>
      <div>
        <button onClick={getWallet}>login via sequence</button>
        <button onClick={handleSignin}>sign in</button>
      </div>
    </div>
  )
}

export default Sequence
