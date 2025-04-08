import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import {
  StyleSheet,
  View,
  Image,
  Button,
  Modal,
  TextInput,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import React, { useState } from "react";

// Cor principal (inspirada no ícone)
const MAIN_COLOR = "#4D9FFF";
const CANCEL_COLOR = "#FF364E";
// Caso queira um leve fundo azulado na tela inteira,
// substitua por algo como "#EAF3FF" ou outro tom claro.
const BACKGROUND_COLOR = "#FFFFFF";

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
    <SafeAreaView
      style={[styles.container, { backgroundColor: BACKGROUND_COLOR }]}
    >
      {/* Header com cor de fundo (MAIN_COLOR) */}
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.headerLogo}
        />
        <ThemedText style={styles.headerTitle}>Mommy's Stock HUB</ThemedText>
      </View>

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
        style={[styles.mainButton, { marginVertical: 10, width: "90%" }]}
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
            <ThemedText style={styles.listItemText}>{item.name}</ThemedText>
            <View style={styles.actionsContainer}>
              <ThemedText style={styles.listItemText}>
                estoque: {item.quantity}
              </ThemedText>

              {/* Botão + */}
              <View style={[styles.plusButton, { marginLeft: 5 }]}>
                <Button
                  title="+"
                  onPress={() => incrementQuantity(index)}
                  color="#FFFFFF"
                />
              </View>

              {/* Botão - */}
              <View style={[styles.minusButton, { marginLeft: 5 }]}>
                <Button
                  title="-"
                  onPress={() => decrementQuantity(index)}
                  color="#FFFFFF"
                />
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
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
    width: "80%",
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    color: MAIN_COLOR,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: MAIN_COLOR,
    borderRadius: 5,
    marginBottom: 10,
    padding: 8,
  },

  // Botão principal (Adicionar, Salvar, Excluir, Sair)
  mainButton: {
    backgroundColor: MAIN_COLOR,
    padding: 10,
    borderRadius: 5,
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
  },

  // Área de busca
  searchContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
  },
  searchBox: {
    borderWidth: 1,
    borderColor: MAIN_COLOR,
    borderRadius: 5,
    padding: 10,
  },
  searchPlaceholder: {
    color: "#555555",
  },

  // Lista
  listContainer: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
    gap: 10,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: MAIN_COLOR,
    marginBottom: 10,
  },
  listItem: {
    borderWidth: 1,
    borderColor: MAIN_COLOR,
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
    borderRadius: 5,
  },
  minusButton: {
    backgroundColor: CANCEL_COLOR,
    borderRadius: 5,
  },
});
