import React, { createContext, useContext, useState, useEffect } from "react";
import { database } from "../database";
import InventoryItemModel from "../database/InventoryItem";

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
  const [version, setVersion] = useState(0); // força atualização

  useEffect(() => {
    const collection = database.get<InventoryItemModel>("inventory_items");
    const sub = collection
      .query()
      .observe()
      .subscribe((allItems) => {
        setItems(
          allItems.map((i) => ({
            id: i.id,
            name: i.name,
            quantity: i.quantity,
            category: i.category,
            price: i.price,
          }))
        );
      });
    return () => sub.unsubscribe();
  }, [version]);

  // Adicionar item
  const addItem = async (item: InventoryItem) => {
    await database.write(async () => {
      await database.get<InventoryItemModel>("inventory_items").create((i) => {
        i.name = item.name;
        i.quantity = item.quantity;
        if (item.category) i.category = item.category;
        if (item.price !== undefined) i.price = item.price;
      });
    });
    setVersion((v) => v + 1);
  };

  // Atualizar item
  const updateItem = async (id: string, updatedItem: InventoryItem) => {
    await database.write(async () => {
      const item = await database
        .get<InventoryItemModel>("inventory_items")
        .find(id);
      await item.update((i) => {
        i.name = updatedItem.name;
        i.quantity = updatedItem.quantity;
        i.category = updatedItem.category;
        i.price = updatedItem.price;
      });
    });
    setVersion((v) => v + 1);
  };

  // Remover item
  const removeItem = async (id: string) => {
    await database.write(async () => {
      const item = await database
        .get<InventoryItemModel>("inventory_items")
        .find(id);
      await item.markAsDeleted();
      await item.destroyPermanently();
    });
    setVersion((v) => v + 1);
  };

  // Incrementar quantidade
  const incrementQuantity = async (id: string) => {
    await database.write(async () => {
      const item = await database
        .get<InventoryItemModel>("inventory_items")
        .find(id);
      await item.update((i) => {
        i.quantity = i.quantity + 1;
      });
    });
    setVersion((v) => v + 1);
  };

  // Decrementar quantidade
  const decrementQuantity = async (id: string) => {
    await database.write(async () => {
      const item = await database
        .get<InventoryItemModel>("inventory_items")
        .find(id);
      if (item.quantity > 0) {
        await item.update((i) => {
          i.quantity = i.quantity - 1;
        });
      }
    });
    setVersion((v) => v + 1);
  };

  return (
    <InventoryContext.Provider
      value={{
        items: [...items], // sempre novo array
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
