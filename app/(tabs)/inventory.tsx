import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Text,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useInventory } from "@/contexts/InventoryContext";
import { Card } from "@/components/Card";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { ThemedInput } from "@/components/ThemedInput";
import { CategoryFilter } from "@/components/CategoryFilter";
import { InventorySortOptions } from "@/components/InventorySortOptions";
import { EditItemModal } from "@/components/EditItemModal";
import { InventoryItemCard } from "@/components/InventoryItemCard";
import { SearchBar } from "@/components/SearchBar";

// Constants
const MAIN_COLOR = "#F5A689";
const CANCEL_COLOR = "#FF364E";

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
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.fixedSection}>
          <Header />
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
      <View style={styles.listWrapper}>
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
    </SafeAreaView>
  );
}

// Subcomponents
const Header = () => (
  <ThemedView style={styles.header}>
    <ThemedText type="title">Inventário</ThemedText>
  </ThemedView>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // scrollContainer: {
  //   padding: 20,
  //   paddingBottom: 60,
  //   gap: 10,
  // },
  header: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "transparent",
  },
  searchBar: {
    backgroundColor: "transparent",
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
    color: MAIN_COLOR,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
  },
  mainButton: {
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#A3D977",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#FF364E",
  },
  exitButton: {
    backgroundColor: "#808080",
    marginTop: 20,
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
    gap: 10,
  },

  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemDetails: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  listItemTexBold: {
    fontWeight: "bold",
  },

  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  plusButton: {
    backgroundColor: "#A3D977",
    borderRadius: 200,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  minusButton: {
    backgroundColor: CANCEL_COLOR,
    borderRadius: 200,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  filterContainer: {
    marginBottom: 5,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  modalOptionText: {
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    marginBottom: 10, // Adicione margem para evitar sobreposição
  },
  picker: {
    height: 50, // Ajuste a altura para garantir visibilidade
    width: "100%",
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  sortButton: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#EEE",
  },
  sortButtonActive: {
    backgroundColor: MAIN_COLOR,
  },
  sortButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  emptyList: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#999",
  },
  fixedSection: {
    padding: 20,
    gap: 10,
  },
  listWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
});
