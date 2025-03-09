import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Web3StackOverflowABI from '../contract/BlockOverflow.json';
import { toast } from 'react-toastify';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error('Please install MetaMask!');
      return;
    }

    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, Web3StackOverflowABI, signer);
      
      setProvider(provider);
      setSigner(signer);
      setContract(contract);
      setAccount(await signer.getAddress());
      toast.success('Wallet connected!');
    } catch (error) {
      console.error(error);
      toast.error('Wallet connection failed');
    }
    setLoading(false);
  };

  return (
    <WalletContext.Provider value={{ account, provider, signer, contract, connectWallet, loading }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}