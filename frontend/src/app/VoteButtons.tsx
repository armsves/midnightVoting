"use client";
import { useCallback } from "react";
import { findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { Contract } from "@midnight-ntwrk/dapp-connector-api";

export default function VoteButtons({ ayePercent, nayPercent }: { ayePercent: number, nayPercent: number }) {
  // Pie chart calculations
  const r = 60;
  const c = 2 * Math.PI * r;
  const ayeStroke = (ayePercent / 100) * c;
  const nayStroke = (nayPercent / 100) * c;

  // Handler for the Aye button
  const handleAye = useCallback(async () => {
    const walletName = "mnLace";
    const counterContractAddress = "02009ac84db13e92c943391e9038ad94c3aa3978503023e9294cd0ed347124b54b35";
    try {
      // @ts-expect-error: window.midnight is injected by wallet extension
      const api = await window.midnight?.[walletName]?.enable();
      const contract = new Contract(counterContractAddress, api);
      const result = await contract.increment();
      console.log(result);
    } catch (error) {
      console.log('an error occurred', error);
    }
  }, []);

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '2rem'}}>
        <svg width="150" height="150" viewBox="0 0 150 150">
          {/* Nay (red) */}
          <circle
            r={r}
            cx="75"
            cy="75"
            fill="transparent"
            stroke="#e74c3c"
            strokeWidth="30"
            strokeDasharray={`${nayStroke} ${c}`}
            strokeDashoffset={0}
          />
          {/* Aye (green) */}
          <circle
            r={r}
            cx="75"
            cy="75"
            fill="transparent"
            stroke="#43e97b"
            strokeWidth="30"
            strokeDasharray={`${ayeStroke} ${c}`}
            strokeDashoffset={-nayStroke}
          />
        </svg>
        <div style={{display: 'flex', gap: '2rem', fontWeight: 700, fontSize: '1.4rem'}}>
          <span style={{color: '#43e97b'}}>Aye: {ayePercent}%</span>
          <span style={{color: '#e74c3c'}}>Nay: {nayPercent}%</span>
        </div>
      </div>
      <div className="vote-buttons">
        <button className="vote-button yes-button" onClick={handleAye}>Aye</button>
        <button className="vote-button no-button">Nay</button>
      </div>
    </>
  );
} 