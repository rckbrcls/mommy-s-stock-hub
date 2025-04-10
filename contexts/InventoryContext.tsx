import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  category?: string;
  price?: number;
}

interface InventoryContextProps {
  items: InventoryItem[];
  addItem: (item: InventoryItem) => Promise<void>;
  updateItem: (id: string, updatedItem: InventoryItem) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  incrementQuantity: (id: string) => Promise<void>;
  decrementQuantity: (id: string) => Promise<void>;
}

const InventoryContext = createContext<InventoryContextProps | undefined>(
  undefined
);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  // Carregar itens do AsyncStorage ao montar o contexto
  useEffect(() => {
    const loadItems = async () => {
      const storedItems = await AsyncStorage.getItem("inventory");
      setItems(storedItems ? JSON.parse(storedItems) : []);
    };
    loadItems();
  }, []);

  // Salvar itens no AsyncStorage
  const saveItemsToStorage = async (newItems: InventoryItem[]) => {
    setItems(newItems);
    await AsyncStorage.setItem("inventory", JSON.stringify(newItems));
  };

  // Adicionar item
  const addItem = async (item: InventoryItem) => {
    const updatedItems = [...items, item];
    await saveItemsToStorage(updatedItems);
  };

  // Atualizar item
  const updateItem = async (id: string, updatedItem: InventoryItem) => {
    const updatedItems = items.map((item) =>
      item.id === id ? updatedItem : item
    );
    await saveItemsToStorage(updatedItems);
  };

  // Remover item
  const removeItem = async (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    await saveItemsToStorage(updatedItems);
  };

  // Incrementar quantidade
  const incrementQuantity = async (id: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    await saveItemsToStorage(updatedItems);
  };

  // Decrementar quantidade
  const decrementQuantity = async (id: string) => {
    const updatedItems = items.map((item) =>
      item.id === id && item.quantity > 0
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    await saveItemsToStorage(updatedItems);
  };

  return (
    <InventoryContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        removeItem,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
};
