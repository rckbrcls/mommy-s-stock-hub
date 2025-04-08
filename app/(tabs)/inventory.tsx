import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import {
  StyleSheet,
  View,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { ThemedView } from "@/components/ThemedView";

// Cor principal (inspirada no ícone)
const MAIN_COLOR = "#4D9FFF";
const CANCEL_COLOR = "#FF364E";

export default function InventoryScreen() {
  const [items, setItems] = useState([
    { name: "Arroz", quantity: 5 },
    { name: "Feijão", quantity: 3 },
    { name: "Macarrão", quantity: 8 },
    { name: "Açúcar", quantity: 2 },
    { name: "Sal", quantity: 4 },
  ]);

  // Modal de "Adicionar Item"
  const [modalVisible, setModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("1");

  // Modal de "Editar Item"
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editItemName, setEditItemName] = useState("");
  const [editItemQuantity, setEditItemQuantity] = useState("1");

  // Incremento e decremento
  const incrementQuantity = (index: number) => {
    const updatedItems = [...items];
    updatedItems[index].quantity += 1;
    setItems(updatedItems);
  };

  const decrementQuantity = (index: number) => {
    const updatedItems = [...items];
    if (updatedItems[index].quantity > 0) {
      updatedItems[index].quantity -= 1;
      setItems(updatedItems);
    }
  };

  // Adicionar item
  const handleAddItem = () => {
    const newItem = {
      name: newItemName || "Novo Item",
      quantity: parseInt(newItemQuantity) || 1,
    };
    setItems([...items, newItem]);
    setNewItemName("");
    setNewItemQuantity("1");
    setModalVisible(false);
  };

  // Remover item
  const handleRemoveItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    setEditModalVisible(false);
  };

  // Abrir modal de edição
  const openEditModal = (index: number) => {
    setEditingIndex(index);
    setEditItemName(items[index].name);
    setEditItemQuantity(items[index].quantity.toString());
    setEditModalVisible(true);
  };

  // Salvar edição
  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editingIndex] = {
        name: editItemName,
        quantity: parseInt(editItemQuantity) || 0,
      };
      setItems(updatedItems);
      setEditModalVisible(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView
        style={{
          flexDirection: "row",
          gap: 8,
        }}
      >
        <ThemedText type="title">Iventário</ThemedText>
      </ThemedView>
      {/* Modal de Adicionar Item */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Novo Item</Text>
            <TextInput
              placeholder="Nome do item"
              value={newItemName}
              onChangeText={setNewItemName}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Quantidade"
              value={newItemQuantity}
              onChangeText={setNewItemQuantity}
              keyboardType="numeric"
              style={styles.modalInput}
            />

            {/* Botão Adicionar */}
            <TouchableOpacity style={styles.mainButton} onPress={handleAddItem}>
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>

            {/* Botão Sair (sem ação adicional) */}
            <TouchableOpacity
              style={[styles.mainButton, { backgroundColor: CANCEL_COLOR }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Editar Item */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar Item</Text>
            <TextInput
              placeholder="Nome do item"
              value={editItemName}
              onChangeText={setEditItemName}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Quantidade"
              value={editItemQuantity}
              onChangeText={setEditItemQuantity}
              keyboardType="numeric"
              style={styles.modalInput}
            />

            {/* Botão Salvar */}
            <TouchableOpacity
              style={styles.mainButton}
              onPress={handleSaveEdit}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

            {/* Botão Excluir */}
            <TouchableOpacity
              style={styles.mainButton}
              onPress={() =>
                editingIndex !== null && handleRemoveItem(editingIndex)
              }
            >
              <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>

            {/* Botão Sair (sem ação adicional) */}
            <TouchableOpacity
              style={[styles.mainButton, { backgroundColor: CANCEL_COLOR }]}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Área de busca */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <ThemedText style={styles.searchPlaceholder}>Pesquisar...</ThemedText>
        </View>
      </View>

      {/* Botão de Adicionar Item */}
      <TouchableOpacity
        style={[styles.mainButton, { width: "100%" }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Adicionar Item</Text>
      </TouchableOpacity>

      {/* Lista de Itens */}
      <View style={styles.listContainer}>
        <ThemedText style={styles.listTitle}>Lista de Itens</ThemedText>
        {items.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => openEditModal(index)}
            style={styles.listItem}
          >
            <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
              <ThemedText style={styles.listItemTexBold}>
                {item.name}
              </ThemedText>
              <ThemedText style={styles.listItemText}>
                quantidade:{" "}
                <ThemedText style={styles.listItemTexBold}>
                  {item.quantity}
                </ThemedText>
              </ThemedText>
            </View>
            <View style={styles.actionsContainer}>
              {/* Botão + */}
              <TouchableOpacity
                style={[styles.plusButton, { marginLeft: 5 }]}
                onPress={() => incrementQuantity(index)}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>

              {/* Botão - */}
              <TouchableOpacity
                style={[styles.minusButton, { marginLeft: 5 }]}
                onPress={() => decrementQuantity(index)}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        ))}
      </View>
    </ParallaxScrollView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: MAIN_COLOR, // Fundo do cabeçalho
  },
  headerLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF", // Texto branco no cabeçalho
  },

  // Modal Genérico
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
  modalInput: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#202020",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  // Botão principal (Adicionar, Salvar, Excluir, Sair)
  mainButton: {
    backgroundColor: MAIN_COLOR,
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 5,
    width: "100%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },

  // Área de busca
  searchContainer: {
    width: "100%",
    alignSelf: "center",
    marginTop: 15,
  },
  searchBox: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#202020",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#FFFFFF",
  },
  searchPlaceholder: {
    color: "#555555",
  },

  // Lista
  listContainer: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
    gap: 10,
    paddingBottom: 20,
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
    shadowColor: "#202020",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#FFFFFF",
    marginBottom: 5,
    width: "100%",
    alignSelf: "center",
    position: "relative",
    zIndex: 1,
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
  },

  // Botões de + e -
  plusButton: {
    backgroundColor: MAIN_COLOR,
    borderRadius: 200,
    width: 35,
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  minusButton: {
    backgroundColor: CANCEL_COLOR,
    borderRadius: 200,
    width: 35,
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
