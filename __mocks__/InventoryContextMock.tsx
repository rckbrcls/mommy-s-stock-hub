import React from 'react';

export const InventoryContext = React.createContext({
  items: [],
  addItem: jest.fn(),
  updateItem: jest.fn(),
  removeItem: jest.fn(),
  incrementQuantity: jest.fn(),
  decrementQuantity: jest.fn(),
});

export const InventoryProvider = ({ children }: { children: React.ReactNode }) => (
  <InventoryContext.Provider value={{
    items: [],
    addItem: jest.fn(),
    updateItem: jest.fn(),
    removeItem: jest.fn(),
    incrementQuantity: jest.fn(),
    decrementQuantity: jest.fn(),
  }}>
    {children}
  </InventoryContext.Provider>
);

export const useInventory = () => React.useContext(InventoryContext);
