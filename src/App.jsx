import './App.css'
import { useEffect, useState } from 'react'
import { Web3Auth } from '@web3auth/web3auth'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import {
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
} from '@web3auth/base'
import { Web3AuthCore } from '@web3auth/core'
import Sequence from './Sequence'

function App() {
  let [web3auth, setWeb3auth] = useState(null)
  let [Adabpter, setAdapter] = useState(null)
  let [provider, setProvider] = useState(null)
  let googleId =
    '500233635859-c27c0f0bijd7gijsctbp494nnb7kjo09.apps.googleusercontent.com'
  let clientId =
    'BGZiLz25YMNk3VJ9Xdr-QR1-i1dwNkSYKugOEdVJQa4PZOah1keYiOwMLRLYeLJyQr8Os6wlE4Wmn_rlgYFqkrw'

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3AuthCore({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: '0x1',
            rpcTarget:
              'https://mainnet.infura.io/v3/776218ac4734478c90191dde8cae483c',
            blockExplorer: 'https://etherscan.io/',
            ticker: 'ETH',
            tickerName: 'Ethereum',
          },
        })

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            network: 'testnet',
            uxMode: 'popup',
            loginConfig: {
              google: {
                name: 'Custom Google Auth Login',
                verifier: 'smash testing',
                typeOfLogin: 'google',
                clientId: googleId,
              },
            },
          },
        })
        web3auth.configureAdapter(openloginAdapter)
        setWeb3auth(web3auth)

        await web3auth.init()
        if (web3auth.provider) {
          setProvider(web3auth.provider)
        }
      } catch (error) {
        console.error(error)
      }
    }

    init()
  }, [])

  const login = async () => {
    if (!web3auth) {
      // uiConsole('web3auth not initialized yet')
      return
    }
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: 'google',
      },
    )
    setProvider(web3authProvider)
    // uiConsole('Logged in Successfully!')
  }

  const logout = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet')
      return
    }
    let res = await web3auth.logout()
    console.log(res)
    // await web3auths.logout();
    setProvider(null)
  }
  const handleCheck = async () => {
    console.log(await web3auth.getUserInfo())
  }

  return (
    <div className="App">
      <h1>Hello</h1>
      <button onClick={handleCheck}>check</button>
      <button onClick={login}>login via web3auth</button>
      <button onClick={logout}>logout</button>
      <br /><br />
      <Sequence />
    </div>
  )
}

export default App
