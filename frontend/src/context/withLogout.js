import React, { useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../context/AccountContext';

const withLogout = (WrappedComponent) => {
  return (props) => {
    const { setAccount } = useContext(AccountContext);
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
      console.log('handleLogout called');
      setAccount(null);
      console.log('Account set to null');
      navigate('/');
    }, [setAccount, navigate]);

    return <WrappedComponent {...props} onLogout={handleLogout} />;
  };
};

export default withLogout;