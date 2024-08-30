import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const MetaMaskLogin = ({ setAccount }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [networkError, setNetworkError] = useState('');
  const NETWORK_ID = '0xa045c'; // Open Campus Codex Sepolia Chain ID
  const NETWORK_NAME = 'Open Campus Codex Sepolia';

  useEffect(() => {
    const connectMetaMask = async () => {
      if (window.ethereum) {
        try {
          // Check if a connection is already pending
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            console.log("Account set in MetaMaskLogin:", accounts[0]);
            setIsConnected(true);
          } else {
            const permissionsRequest = await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
            const permissionsAccounts = permissionsRequest[0].caveats[0].value;
            if (permissionsAccounts.length > 0) {
              setAccount(permissionsAccounts[0]);
              setIsConnected(true);
            } else {
              await requestAccounts();
            }
          }
        } catch (error) {
          console.error("MetaMask connection failed:", error);
          if (error.code === -32002) {
            setNetworkError('A MetaMask connection request is already pending. Please complete the request.');
          } else {
            setNetworkError('Failed to connect with MetaMask.');
          }
        }
      } else {
        alert("Please install MetaMask to use this DApp!");
      }
    };

    const requestAccounts = async () => {
      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const currentNetworkId = await window.ethereum.request({ method: 'net_version' });

        if (currentNetworkId !== NETWORK_ID) {
          await switchNetwork();
        }

        setAccount(accounts[0]);
        setIsConnected(true);
        setNetworkError('');
      } catch (error) {
        console.error("MetaMask connection failed:", error);
        if (error.code === -32002) {
          setNetworkError('A MetaMask connection request is already pending. Please complete the request.');
        } else {
          setNetworkError('Failed to connect with MetaMask.');
        }
      }
    };

    const switchNetwork = async () => {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: NETWORK_ID,
            chainName: NETWORK_NAME,
            nativeCurrency: {
              name: "EDU",
              symbol: "EDU",
              decimals: 18
            },
            rpcUrls: ['https://open-campus-codex-sepolia.drpc.org'],
            blockExplorerUrls: ['https://opencampus-codex.blockscout.com']
          }],
        });
        setNetworkError('');
      } catch (error) {
        console.error("Failed to switch network:", error);
        if (error.code === -32603) {
          setNetworkError(`Failed to switch to ${NETWORK_NAME}. Please switch manually.`);
        } else {
          setNetworkError(error.message || 'An unknown error occurred while switching networks.');
        }
      }
    };

    connectMetaMask();

    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });

    window.ethereum.on('accountsChanged', () => {
      connectMetaMask();
    });
  }, [setAccount]);

  return (
    <div>
      {networkError ? (
        <p>{networkError}</p>
      ) : isConnected ? (
        <p>Connected to MetaMask</p>
      ) : (
        <p>Connecting to MetaMask...</p>
      )}
    </div>
  );
};

export default MetaMaskLogin;
