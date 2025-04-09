import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
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
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { useInventory } from "@/contexts/InventoryContext";

// Cor principal (inspirada no ícone)
const MAIN_COLOR = "#F5A689";
const CANCEL_COLOR = "#FF364E";

export default function InventoryScreen() {
  const {
    items,
    updateItem,
    removeItem,
    incrementQuantity,
    decrementQuantity,
  } = useInventory();

  // Modal de "Editar Item"
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editItemName, setEditItemName] = useState("");
  const [editItemQuantity, setEditItemQuantity] = useState("1");

  // Abrir modal de edição
  const openEditModal = (index: number) => {
    setEditingIndex(index);
    setEditItemName(items[index].name);
    setEditItemQuantity(items[index].quantity.toString());
    setEditModalVisible(true);
  };

  // Salvar edição
  const handleSaveEdit = async () => {
    if (editingIndex !== null) {
      const updatedItem = {
        ...items[editingIndex],
        name: editItemName,
        quantity: parseInt(editItemQuantity) || 0,
      };
      await updateItem(editingIndex, updatedItem);
      setEditModalVisible(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          gap: 16,
        }}
      >
        <ThemedView
          style={{
            flexDirection: "row",
            gap: 8,
            backgroundColor: "transparent",
          }}
        >
          <ThemedText type="title" style={{ color: "#202020" }}>
            Inventário
          </ThemedText>
        </ThemedView>

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
                onPress={() => {
                  handleSaveEdit();
                  setEditModalVisible(false); // Fecha o modal
                }}
              >
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>

              {/* Botão Excluir */}
              <TouchableOpacity
                style={[styles.mainButton, styles.deleteButton]}
                onPress={() => {
                  if (editingIndex !== null) {
                    removeItem(editingIndex);
                  }
                  setEditModalVisible(false); // Fecha o modal
                }}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>

              {/* Botão Sair */}
              <TouchableOpacity
                style={[styles.mainButton, styles.exitButton]}
                onPress={() => setEditModalVisible(false)} // Fecha o modal
              >
                <Text style={styles.buttonText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Lista de Itens */}
        <View style={styles.listContainer}>
          <ThemedText style={styles.listTitle}>Lista de Itens</ThemedText>
          {items.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => openEditModal(index)}
              style={styles.listItem}
            >
              <View
                style={{ flexDirection: "column", alignItems: "flex-start" }}
              >
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
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
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
  mainButton: {
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 10,
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
    backgroundColor: "#A3D977",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
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
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
    gap: 10,
    paddingBottom: 40,
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
  plusButton: {
    backgroundColor: "#A3D977",
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
