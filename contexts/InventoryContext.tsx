import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  category?: string;
  price?: number;
}

interface InventoryContextProps {
  items: InventoryItem[];
  addItem: (item: InventoryItem) => Promise<void>;
  updateItem: (index: number, updatedItem: InventoryItem) => Promise<void>;
  removeItem: (index: number) => Promise<void>;
  incrementQuantity: (index: number) => Promise<void>;
  decrementQuantity: (index: number) => Promise<void>;
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
  const updateItem = async (index: number, updatedItem: InventoryItem) => {
    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    await saveItemsToStorage(updatedItems);
  };

  // Remover item
  const removeItem = async (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    await saveItemsToStorage(updatedItems);
  };

  // Incrementar quantidade
  const incrementQuantity = async (index: number) => {
    const updatedItems = [...items];
    updatedItems[index].quantity += 1;
    await saveItemsToStorage(updatedItems);
  };

  // Decrementar quantidade
  const decrementQuantity = async (index: number) => {
    const updatedItems = [...items];
    if (updatedItems[index].quantity > 0) {
      updatedItems[index].quantity -= 1;
      await saveItemsToStorage(updatedItems);
    }
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
