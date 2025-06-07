import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useInventory } from "@/contexts/InventoryContext";
import { CategoryFilter } from "@/components/CategoryFilter";
import { InventorySortOptions } from "@/components/InventorySortOptions";
import { EditItemModal } from "@/components/EditItemModal";
import { InventoryItemCard } from "@/components/InventoryItemCard";
import { SearchBar } from "@/components/SearchBar";

// Main Component
export default function InventoryScreen() {
  const {
    items,
    updateItem,
    removeItem,
    incrementQuantity,
    decrementQuantity,
  } = useInventory();

  // State
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState<string | null>(null);
  const [editItemName, setEditItemName] = useState("");
  const [editItemQuantity, setEditItemQuantity] = useState("1");
  const [editItemCategory, setEditItemCategory] = useState("");
  const [editItemPrice, setEditItemPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedCategory, setSelectedCategory] = useState(""); // Valor inicial vazio
  const [sortType, setSortType] = useState<
    "priceAsc" | "priceDesc" | "quantityAsc" | "quantityDesc" | ""
  >(""); // State for sorting

  // Extract unique categories
  const categories = Array.from(
    new Set(
      items
        .map((item) => item.category)
        .filter((category): category is string => category !== undefined)
    )
  );

  // Handlers
  const openEditModal = (id: string) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      setEditingIndex(id); // Agora armazenamos o id
      setEditItemName(item.name);
      setEditItemQuantity(item.quantity.toString());
      setEditItemCategory(item.category || "");
      setEditItemPrice(item.price?.toString() || "");
      setEditModalVisible(true);
    }
  };

  const handleSaveEdit = async () => {
    if (editingIndex !== null) {
      const updatedItem = {
        id: editingIndex, // Usar o id armazenado
        name: editItemName,
        quantity: parseInt(editItemQuantity) || 0,
        category: editItemCategory,
        price: parseFloat(editItemPrice) || 0,
      };
      await updateItem(editingIndex, updatedItem);
      setEditModalVisible(false);
    }
  };

  // Filtered and sorted items
  const filteredItems = items
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((item) =>
      selectedCategory ? item.category === selectedCategory : true
    )
    .sort((a, b) => {
      if (sortType === "priceAsc") {
        return (a.price || 0) - (b.price || 0);
      } else if (sortType === "priceDesc") {
        return (b.price || 0) - (a.price || 0);
      } else if (sortType === "quantityAsc") {
        return a.quantity - b.quantity;
      } else if (sortType === "quantityDesc") {
        return b.quantity - a.quantity;
      }
      return 0;
    });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <ThemedView style={styles.header}>
              <ThemedText type="title">Inventário</ThemedText>
            </ThemedView>
            <View>
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />

              <View style={{ flexDirection: "row", gap: 6 }}>
                <View style={{ flex: 1 }}>
                  <CategoryFilter
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    categories={categories}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <InventorySortOptions
                    sortType={sortType}
                    setSortType={setSortType}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ flex: 1 }}>
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <InventoryItemCard
                item={item}
                onEdit={openEditModal}
                onIncrement={incrementQuantity}
                onDecrement={decrementQuantity}
              />
            )}
            ListEmptyComponent={
              <ThemedText style={styles.emptyList}>
                Nenhum item encontrado.
              </ThemedText>
            }
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 16 }}
          />
        </View>
        <EditItemModal
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          itemName={editItemName}
          setItemName={setEditItemName}
          itemQuantity={editItemQuantity}
          setItemQuantity={setEditItemQuantity}
          itemCategory={editItemCategory}
          setItemCategory={setEditItemCategory}
          itemPrice={editItemPrice}
          setItemPrice={setEditItemPrice}
          onSave={handleSaveEdit}
          onDelete={() => {
            if (editingIndex !== null) removeItem(editingIndex);
            setEditModalVisible(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "transparent",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  searchBar: {
    backgroundColor: "transparent",
  },
  filterContainer: {
    marginBottom: 10,
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
  },
  modalOptionText: {
    fontSize: 16,
  },
  mainButton: {
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#A3D977",
  },
  exitButton: {
    backgroundColor: "#808080",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: 16,
  },
  emptyList: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
    fontSize: 16,
    fontStyle: "italic",
  },
});
