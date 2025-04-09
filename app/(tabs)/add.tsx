// MommyStockHub/screens/AddTabScreen.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";

export default function AddTabScreen() {
  const [activeTab, setActiveTab] = useState<"product" | "debtor">("product");

  // Tela para adicionar produtos
  const AddProductScreen = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");

    const handleSaveProduct = () => {
      if (!name.trim() || !quantity.trim()) {
        Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
        return;
      }
      Alert.alert("Sucesso", `Produto "${name}" adicionado!`);
      setName("");
      setCategory("");
      setQuantity("");
      setPrice("");
    };

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Adicionar Produto</Text>

        <Text style={styles.label}>Nome do Produto</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ex: Sabonete"
        />

        <Text style={styles.label}>Categoria</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="Ex: Higiene"
        />

        <Text style={styles.label}>Quantidade</Text>
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
          placeholder="Ex: 10"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Preço (opcional)</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Ex: 5.99"
          keyboardType="decimal-pad"
        />

        <TouchableOpacity onPress={handleSaveProduct} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Salvar Produto</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  // Tela para adicionar devedores
  const AddDebtorScreen = () => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");

    const handleSaveDebtor = () => {
      if (!name.trim() || !amount.trim()) {
        Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
        return;
      }
      Alert.alert("Sucesso", `Devedor "${name}" adicionado!`);
      setName("");
      setAmount("");
    };

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Adicionar Devedor</Text>

        <Text style={styles.label}>Nome do Devedor</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ex: João Silva"
        />

        <Text style={styles.label}>Valor</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholder="Ex: 150.00"
          keyboardType="decimal-pad"
        />

        <TouchableOpacity onPress={handleSaveDebtor} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Salvar Devedor</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Tabs na parte superior */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "product" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("product")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "product" && styles.activeTabButtonText,
            ]}
          >
            Produto
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "debtor" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("debtor")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "debtor" && styles.activeTabButtonText,
            ]}
          >
            Devedor
          </Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo da aba ativa */}
      {activeTab === "product" ? <AddProductScreen /> : <AddDebtorScreen />}
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTabButton: {
    borderBottomWidth: 3,
    borderBottomColor: "#F5A689",
  },
  tabButtonText: {
    fontSize: 16,
    color: "#555",
  },
  activeTabButtonText: {
    color: "#F5A689",
    fontWeight: "bold",
  },
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
  saveButton: {
    backgroundColor: "#F5A689",
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});
