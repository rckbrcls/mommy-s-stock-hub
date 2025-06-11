import React, { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useInventory } from "@/features/inventory/contexts/InventoryContext";
import EditItemPage from "@/features/inventory/components/EditItemPage";

export default function EditItemScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { items, updateItem, removeItem } = useInventory();

  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("1");
  const [itemCategory, setItemCategory] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemLocation, setItemLocation] = useState("");
  const [itemCreatedAt, setItemCreatedAt] = useState("");
  const [itemLastRemovedAt, setItemLastRemovedAt] = useState("");

  useEffect(() => {
    if (id) {
      const item = items.find((item) => item.id === id);
      if (item) {
        setItemName(item.name);
        setItemQuantity(item.quantity.toString());
        setItemCategory(item.category || "");
        setItemPrice(item.price?.toString() || "");
        setItemLocation(item.location || "");
        setItemCreatedAt(item.customCreatedAt || "");
        setItemLastRemovedAt(item.lastRemovedAt || "");
      }
    }
  }, [id, items]);

  const handleSave = async () => {
    if (id) {
      const updatedItem = {
        id,
        name: itemName,
        quantity: parseInt(itemQuantity) || 0,
        category: itemCategory,
        price: parseFloat(itemPrice) || 0,
        location: itemLocation,
        customCreatedAt: itemCreatedAt,
        lastRemovedAt: itemLastRemovedAt,
      };
      await updateItem(id, updatedItem);
      router.back();
    }
  };

  const handleDelete = async () => {
    if (id) {
      await removeItem(id);
      router.back();
    }
  };

  return (
    <EditItemPage
      onClose={() => router.back()}
      itemName={itemName}
      setItemName={setItemName}
      itemQuantity={itemQuantity}
      setItemQuantity={setItemQuantity}
      itemCategory={itemCategory}
      setItemCategory={setItemCategory}
      itemPrice={itemPrice}
      setItemPrice={setItemPrice}
      itemLocation={itemLocation}
      setItemLocation={setItemLocation}
      itemCreatedAt={itemCreatedAt}
      setItemCreatedAt={setItemCreatedAt}
      itemLastRemovedAt={itemLastRemovedAt}
      setItemLastRemovedAt={setItemLastRemovedAt}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );
}
