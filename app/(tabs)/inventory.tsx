import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useInventory } from "@/contexts/InventoryContext";

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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
              <SortOptions sortType={sortType} setSortType={setSortType} />
            </View>
          </View>
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
        <ItemList
          items={filteredItems}
          onEdit={(id) => openEditModal(id)}
          onIncrement={(id) => incrementQuantity(id)}
          onDecrement={(id) => decrementQuantity(id)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// Subcomponents
const Header = () => (
  <ThemedView style={styles.header}>
    <ThemedText type="title">Inventário</ThemedText>
  </ThemedView>
);

const SearchBar = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
}) => (
  <TextInput
    style={styles.searchBar}
    placeholder="Pesquisar por nome do item..."
    value={searchQuery}
    onChangeText={setSearchQuery}
  />
);

const CategoryFilter = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}: {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setModalVisible(false);
  };

  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.categoryButtonText}>
          {selectedCategory || "Todas as Categorias"}
        </Text>
      </TouchableOpacity>

      {/* Modal para exibir as categorias */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Selecione uma Categoria</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleSelectCategory("")}
            >
              <Text style={styles.modalOptionText}>Todas as Categorias</Text>
            </TouchableOpacity>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalOption}
                onPress={() => handleSelectCategory(category)}
              >
                <Text style={styles.modalOptionText}>{category}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.mainButton, styles.exitButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const SortOptions = ({
  sortType,
  setSortType,
}: {
  sortType: "priceAsc" | "priceDesc" | "quantityAsc" | "quantityDesc" | "";
  setSortType: (
    type: "priceAsc" | "priceDesc" | "quantityAsc" | "quantityDesc" | ""
  ) => void;
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectSort = (
    type: "priceAsc" | "priceDesc" | "quantityAsc" | "quantityDesc" | ""
  ) => {
    setSortType(type);
    setModalVisible(false);
  };

  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.categoryButtonText}>
          {sortType === "priceAsc"
            ? "Menor Preço"
            : sortType === "priceDesc"
            ? "Maior Preço"
            : sortType === "quantityAsc"
            ? "Menor Quantidade"
            : sortType === "quantityDesc"
            ? "Maior Quantidade"
            : "Selecione"}
        </Text>
      </TouchableOpacity>

      {/* Modal para exibir as opções de ordenação */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Ordenar por:</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleSelectSort("priceAsc")}
            >
              <Text style={styles.modalOptionText}>Menor Preço</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleSelectSort("priceDesc")}
            >
              <Text style={styles.modalOptionText}>Maior Preço</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleSelectSort("quantityAsc")}
            >
              <Text style={styles.modalOptionText}>Menor Quantidade</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleSelectSort("quantityDesc")}
            >
              <Text style={styles.modalOptionText}>Maior Quantidade</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.mainButton, styles.exitButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const EditItemModal = ({
  visible,
  onClose,
  itemName,
  setItemName,
  itemQuantity,
  setItemQuantity,
  itemCategory,
  setItemCategory,
  itemPrice,
  setItemPrice,
  onSave,
  onDelete,
}: {
  visible: boolean;
  onClose: () => void;
  itemName: string;
  setItemName: (text: string) => void;
  itemQuantity: string;
  setItemQuantity: (text: string) => void;
  itemCategory: string;
  setItemCategory: (text: string) => void;
  itemPrice: string;
  setItemPrice: (text: string) => void;
  onSave: () => void;
  onDelete: () => void;
}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <ThemedView style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Editar Item</Text>

        <ThemedText style={styles.modalLabel}>Nome do Item</ThemedText>
        <TextInput
          placeholder="Nome do item"
          value={itemName}
          onChangeText={setItemName}
          style={styles.modalInput}
        />

        <ThemedText style={styles.modalLabel}>Quantidade</ThemedText>
        <TextInput
          placeholder="Quantidade"
          value={itemQuantity}
          onChangeText={setItemQuantity}
          keyboardType="numeric"
          style={styles.modalInput}
        />

        <ThemedText style={styles.modalLabel}>Categoria</ThemedText>
        <TextInput
          placeholder="Categoria"
          value={itemCategory}
          onChangeText={setItemCategory}
          style={styles.modalInput}
        />

        <ThemedText style={styles.modalLabel}>Preço</ThemedText>
        <TextInput
          placeholder="Preço"
          value={itemPrice}
          onChangeText={setItemPrice}
          keyboardType="decimal-pad"
          style={styles.modalInput}
        />

        <TouchableOpacity style={styles.mainButton} onPress={onSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.mainButton, styles.deleteButton]}
          onPress={onDelete}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.mainButton, styles.exitButton]}
          onPress={onClose}
        >
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </ThemedView>
    </View>
  </Modal>
);

const ItemList = ({
  items,
  onEdit,
  onIncrement,
  onDecrement,
}: {
  items: {
    id: string; // Adicionar id aqui
    name: string;
    quantity: number;
    category?: string;
    price?: number;
  }[];
  onEdit: (id: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}) => (
  <View style={styles.listContainer}>
    <ThemedText style={styles.listTitle}>Lista de Itens</ThemedText>
    {items.map((item) => (
      <Pressable
        key={item.id} // Usar id como chave
        onPress={() => onEdit(item.id)}
      >
        <ThemedView style={styles.listItem}>
          <View style={styles.listItemDetails}>
            <ThemedText style={styles.listItemTexBold}>{item.name}</ThemedText>
            <ThemedText>
              Quantidade:{" "}
              <ThemedText style={styles.listItemTexBold}>
                {item.quantity}
              </ThemedText>
            </ThemedText>
            {item.category && (
              <ThemedText>
                Categoria:{" "}
                <ThemedText style={styles.listItemTexBold}>
                  {item.category}
                </ThemedText>
              </ThemedText>
            )}
            {item.price !== undefined && (
              <ThemedText>
                Preço:{" "}
                <ThemedText style={styles.listItemTexBold}>
                  R$ {item.price.toFixed(2)}
                </ThemedText>
              </ThemedText>
            )}
          </View>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.plusButton}
              onPress={() => onIncrement(item.id)}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.minusButton}
              onPress={() => onDecrement(item.id)}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </Pressable>
    ))}
  </View>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 60,
    gap: 10,
  },
  header: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "transparent",
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
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
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingBottom: 10,
  },
  listItem: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 5,
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
  filterLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
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
    color: "#333",
    fontSize: 16,
  },
  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  modalOptionText: {
    fontSize: 16,
    color: "#333",
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
});
