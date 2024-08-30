import React, { createContext, useState, useEffect } from 'react';

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState(() => {
    return localStorage.getItem('account') || null;
  });

  useEffect(() => {
    if (account) {
      localStorage.setItem('account', account);
    } else {
      localStorage.removeItem('account');
    }
  }, [account]);

  const handleLogout = () => {
    setAccount(null);
  };

  return (
    <AccountContext.Provider value={{ account, setAccount, handleLogout }}>
      {children}
    </AccountContext.Provider>
  );
};
