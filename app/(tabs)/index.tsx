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

export default function HomeScreen() {
  const [items, setItems] = useState([
    { name: "Arroz", quantity: 5 },
    { name: "Feijão", quantity: 3 },
    { name: "Macarrão", quantity: 8 },
    { name: "Açúcar", quantity: 2 },
    { name: "Sal", quantity: 4 },
  ]);

  // Estados para modal de "Adicionar Item"
  const [modalVisible, setModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("1");

  // Estados para modal de "Editar Item"
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editItemName, setEditItemName] = useState("");
  const [editItemQuantity, setEditItemQuantity] = useState("1");

  // Funções de incremento e decremento
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

  // Função para abrir modal de "Adicionar Item"
  const handleAddItem = () => {
    const newItem = {
      name: newItemName || "Novo Item",
      quantity: parseInt(newItemQuantity) || 1,
    };
    setItems([...items, newItem]);
    // Limpa os campos e fecha o modal
    setNewItemName("");
    setNewItemQuantity("1");
    setModalVisible(false);
  };

  // Função para remover item do array
  const handleRemoveItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    setEditModalVisible(false);
  };

  // Função para abrir modal de "Editar Item"
  const openEditModal = (index: number) => {
    setEditingIndex(index);
    setEditItemName(items[index].name);
    setEditItemQuantity(items[index].quantity.toString());
    setEditModalVisible(true);
  };

  // Função para salvar alterações no item editado
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
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header fixo */}
      <View
        style={{
          borderBottomColor: "lightgray",
          borderBottomWidth: 1,
          padding: 10,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("@/assets/images/logo.png")}
          style={{ width: 50, height: 50 }}
        />
        <ThemedText
          style={{
            fontSize: 20,
            color: "#505050",
            fontWeight: "bold",
          }}
        >
          Mommy's Stock HUB
        </ThemedText>
      </View>

      {/* Modal de Adicionar Item */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: "80%",
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}
            >
              Novo Item
            </Text>
            <TextInput
              placeholder="Nome do item"
              value={newItemName}
              onChangeText={setNewItemName}
              style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                marginBottom: 10,
                padding: 8,
              }}
            />
            <TextInput
              placeholder="Quantidade"
              value={newItemQuantity}
              onChangeText={setNewItemQuantity}
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                marginBottom: 10,
                padding: 8,
              }}
            />
            <TouchableOpacity
              onPress={handleAddItem}
              style={{
                backgroundColor: "#4CAF50",
                padding: 10,
                borderRadius: 5,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Adicionar
              </Text>
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
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: "80%",
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}
            >
              Editar Item
            </Text>
            <TextInput
              placeholder="Nome do item"
              value={editItemName}
              onChangeText={setEditItemName}
              style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                marginBottom: 10,
                padding: 8,
              }}
            />
            <TextInput
              placeholder="Quantidade"
              value={editItemQuantity}
              onChangeText={setEditItemQuantity}
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                marginBottom: 10,
                padding: 8,
              }}
            />
            <TouchableOpacity
              onPress={handleSaveEdit}
              style={{
                backgroundColor: "#2196F3",
                padding: 10,
                borderRadius: 5,
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                editingIndex !== null && handleRemoveItem(editingIndex)
              }
              style={{
                backgroundColor: "#F44336",
                padding: 10,
                borderRadius: 5,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Excluir
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Lista de itens */}
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 20,
        }}
      >
        {/* Exemplo de search box */}
        <View style={{ width: "90%" }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: "lightgray",
              borderRadius: 5,
              padding: 10,
            }}
          >
            <ThemedText style={{ color: "#505050" }}>Pesquisar...</ThemedText>
          </View>
        </View>

        {/* Botão para abrir modal de Adicionar Item */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            backgroundColor: "#0033cc",
            width: "90%",
            padding: 10,
            margin: 10,
            borderRadius: 8,
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <ThemedText style={{ color: "white", fontWeight: "bold" }}>
            Adicionar Item
          </ThemedText>
        </TouchableOpacity>

        <View style={{ width: "90%" }}>
          <ThemedText
            style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
          >
            Lista de Itens
          </ThemedText>
          {items.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => openEditModal(index)}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "lightgray",
                paddingVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ThemedText>{item.name}</ThemedText>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <ThemedText>estoque: {item.quantity}</ThemedText>

                <View
                  style={{
                    backgroundColor: "#4CAF50",
                    borderRadius: 5,
                    paddingHorizontal: 4,
                    paddingVertical: 0,
                  }}
                >
                  <Button
                    title="+"
                    onPress={() => incrementQuantity(index)}
                    color="#FFFFFF"
                  />
                </View>
                <View
                  style={{
                    backgroundColor: "#F44336",
                    borderRadius: 5,
                    paddingHorizontal: 4,
                    paddingVertical: 0,
                  }}
                >
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
