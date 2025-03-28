import React, { createContext, useState, useContext } from "react";

const WalletContext = createContext(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      // Simulate a connection delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock wallet connection
      const mockAddress = "0x" + Math.random().toString(16).slice(2, 12);
      const mockBalance = parseFloat((Math.random() * 10).toFixed(4));

      setWallet(mockAddress);
      setBalance(mockBalance);
      setIsConnecting(false);

      // Store in local storage for persistence
      localStorage.setItem("walletAddress", mockAddress);
      localStorage.setItem("walletBalance", mockBalance.toString());

      console.log("Wallet connected:", mockAddress);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    setBalance(0);
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("walletBalance");
    console.log("Wallet disconnected");
  };

  // Check if wallet is already connected (from localStorage)
  React.useEffect(() => {
    const storedAddress = localStorage.getItem("walletAddress");
    const storedBalance = localStorage.getItem("walletBalance");

    if (storedAddress) {
      setWallet(storedAddress);
      setBalance(storedBalance ? parseFloat(storedBalance) : 0);
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{ wallet, balance, connectWallet, disconnectWallet, isConnecting }}
    >
      {children}
    </WalletContext.Provider>
  );
};
