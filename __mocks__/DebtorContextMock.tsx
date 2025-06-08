import React from 'react';

export const DebtorContext = React.createContext({
  debtors: [],
  addDebtor: jest.fn(),
  updateDebtor: jest.fn(),
  removeDebtor: jest.fn(),
  markAsPaid: jest.fn(),
});

export const DebtorProvider = ({ children }: { children: React.ReactNode }) => (
  <DebtorContext.Provider value={{
    debtors: [],
    addDebtor: jest.fn(),
    updateDebtor: jest.fn(),
    removeDebtor: jest.fn(),
    markAsPaid: jest.fn(),
  }}>
    {children}
  </DebtorContext.Provider>
);

export const useDebtors = () => React.useContext(DebtorContext);
