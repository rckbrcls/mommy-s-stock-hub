// MommyStockHub/screens/AddProductScreen.tsx

import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";

export default function AddProductScreen() {
  const navigation = useNavigation();

  // Estados para armazenar valores do formulário
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [barcode, setBarcode] = useState("");

  // Função de validação simples
  const validateForm = (): boolean => {
    if (!name.trim()) {
      Alert.alert("Atenção", "Informe o nome do produto.");
      return false;
    }
    if (!quantity.trim()) {
      Alert.alert("Atenção", "Informe a quantidade.");
      return false;
    }
    return true;
  };

  // Função para salvar os dados (mock)
  const handleSave = async () => {
    if (!validateForm()) return;

    Alert.alert("Sucesso", `Produto "${name}" adicionado!`);
    setName("");
    setCategory("");
    setQuantity("");
    setPrice("");
    setBarcode("");
    navigation.goBack();
  };

  // Função para abrir a tela de barcode (se tiver)
  const openBarcodeScanner = () => {
    Alert.alert(
      "Scanner",
      "Funcionalidade de leitura de código de barras aqui..."
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
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

          <Text style={styles.label}>Código de Barras (opcional)</Text>
          <View style={styles.barcodeContainer}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              value={barcode}
              onChangeText={setBarcode}
              placeholder="Ex: 123456789"
            />
            <TouchableOpacity
              onPress={openBarcodeScanner}
              style={styles.scanButton}
            >
              <Text style={styles.scanButtonText}>Scan</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa", // Fundo claro
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
  barcodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  scanButton: {
    backgroundColor: "#ff9900",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  scanButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#1E90FF",
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
