"use client";
import Image from "next/image";
import { useCallback, useState } from "react";

function formatAddress(address: string) {
  if (!address) return "";
  return address.slice(0, 5) + "..." + address.slice(-4);
}

export default function Navbar() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  // Handler for the navbar button
  const handleConnectWallet = useCallback(async () => {
    if (connected) {
      setConnected(false);
      setAddress(null);
      return;
    }
    const walletName = "mnLace";
    try {
      // @ts-expect-error: window.midnight is injected by wallet extension
      const api = await window.midnight?.[walletName]?.enable();
      setConnected(true);
      try {
        const state = await api.state();
        console.log('Wallet state', state);
        setAddress(state.address);
      } catch (error) {
        console.log('an error occurred', error);
      }
    } catch (error) {
      console.log("an error occurred", error);
    }
  }, [connected]);

  return (
    <nav className="navbar">
      <a href="#" className="logo">
        <Image src="/midnight-logo-black.svg" alt="Midnight Logo" width={96} height={96} style={{marginRight: '0.5rem'}} />
      </a>
      <div className="site-name">Midnight Vote</div>
      <button className="nav-button" onClick={handleConnectWallet}>
        {address ? formatAddress(address) : (connected ? "Menu" : "Connect Wallet")}
      </button>
    </nav>
  );
} 