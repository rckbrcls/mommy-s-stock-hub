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
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editItemName, setEditItemName] = useState("");
  const [editItemQuantity, setEditItemQuantity] = useState("1");
  const [editItemCategory, setEditItemCategory] = useState("");
  const [editItemPrice, setEditItemPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Handlers
  const openEditModal = (index: number) => {
    setEditingIndex(index);
    setEditItemName(items[index].name);
    setEditItemQuantity(items[index].quantity.toString());
    setEditItemCategory(items[index].category || "");
    setEditItemPrice(items[index].price?.toString() || "");
    setEditModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (editingIndex !== null) {
      const updatedItem = {
        ...items[editingIndex],
        name: editItemName,
        quantity: parseInt(editItemQuantity) || 0,
        category: editItemCategory,
        price: parseFloat(editItemPrice) || 0,
      };
      await updateItem(editingIndex, updatedItem);
      setEditModalVisible(false);
    }
  };

  // Filtered items based on search query
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
          onEdit={openEditModal}
          onIncrement={incrementQuantity}
          onDecrement={decrementQuantity}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// Subcomponents
const Header = () => (
  <ThemedView style={styles.header}>
    <ThemedText type="title" style={styles.headerText}>
      Inventário
    </ThemedText>
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
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Editar Item</Text>

        <Text style={styles.modalLabel}>Nome do Item</Text>
        <TextInput
          placeholder="Nome do item"
          value={itemName}
          onChangeText={setItemName}
          style={styles.modalInput}
        />

        <Text style={styles.modalLabel}>Quantidade</Text>
        <TextInput
          placeholder="Quantidade"
          value={itemQuantity}
          onChangeText={setItemQuantity}
          keyboardType="numeric"
          style={styles.modalInput}
        />

        <Text style={styles.modalLabel}>Categoria</Text>
        <TextInput
          placeholder="Categoria"
          value={itemCategory}
          onChangeText={setItemCategory}
          style={styles.modalInput}
        />

        <Text style={styles.modalLabel}>Preço</Text>
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
      </View>
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
    name: string;
    quantity: number;
    category?: string;
    price?: number;
  }[];
  onEdit: (index: number) => void;
  onIncrement: (index: number) => void;
  onDecrement: (index: number) => void;
}) => (
  <View style={styles.listContainer}>
    <ThemedText style={styles.listTitle}>Lista de Itens</ThemedText>
    {items.map((item, index) => (
      <Pressable
        key={index}
        onPress={() => onEdit(index)}
        style={styles.listItem}
      >
        <View style={styles.listItemDetails}>
          <ThemedText style={styles.listItemTexBold}>{item.name}</ThemedText>
          <ThemedText style={styles.listItemText}>
            Quantidade:{" "}
            <ThemedText style={styles.listItemTexBold}>
              {item.quantity}
            </ThemedText>
          </ThemedText>
          {item.category && (
            <ThemedText style={styles.listItemText}>
              Categoria:{" "}
              <ThemedText style={styles.listItemTexBold}>
                {item.category}
              </ThemedText>
            </ThemedText>
          )}
          {item.price !== undefined && (
            <ThemedText style={styles.listItemText}>
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
            onPress={() => onIncrement(index)}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.minusButton}
            onPress={() => onDecrement(index)}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
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
    gap: 16,
  },
  header: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "transparent",
  },
  headerText: {
    color: "#202020",
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
    backgroundColor: "#FFFFFF",
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
    color: "#333",
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
    color: "#333333",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingBottom: 10,
  },
  listItem: {
    borderWidth: 1,
    borderColor: "#EEE",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginBottom: 5,
  },
  listItemDetails: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  listItemTexBold: {
    color: "#333333",
    fontWeight: "bold",
  },
  listItemText: {
    color: "#333333",
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
});
