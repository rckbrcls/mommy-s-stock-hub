import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  Image,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { CategoryFilter } from "@/features/add/components/CategoryFilter";
import { InventorySortOptions } from "@/features/inventory/components/InventorySortOptions";
import { InventoryItemCard } from "@/features/inventory/components/InventoryItemCard";
import { SearchBarInventory } from "@/features/inventory/components/SearchBarInventory";
import { useInventory } from "@/features/inventory/contexts/InventoryContext";
import { useRouter } from "expo-router";

// Main Component
export default function InventoryScreen() {
  const {
    items,
    updateItem,
    removeItem,
    incrementQuantity,
    decrementQuantity,
  } = useInventory();
  const router = useRouter();

  // State
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
  // Remove todos os setEdit* e setEditingIndex do openEditModal, pois agora a tela de edição cuida do estado
  const openEditModal = (id: string) => {
    router.push({ pathname: "/edit-item", params: { id } });
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
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[styles.container, { paddingBottom: 0 }]}>
          <ThemedView style={styles.header}>
            <ThemedText type="title">Inventário</ThemedText>
          </ThemedView>

          <SearchBarInventory
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <View style={{ flexDirection: "row", gap: 10 }}>
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

          <FlatList
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            data={filteredItems}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            contentContainerStyle={{ paddingBottom: 32 }}
            ListEmptyComponent={
              <Image
                source={require("../../assets/images/no-data.png")}
                style={{ width: 100, height: 150, alignSelf: "center" }}
              />
            }
            renderItem={({ item }) => (
              <InventoryItemCard
                item={item}
                onEdit={openEditModal}
                onIncrement={incrementQuantity}
                onDecrement={decrementQuantity}
              />
            )}
          />
        </View>
      </TouchableWithoutFeedback>
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
