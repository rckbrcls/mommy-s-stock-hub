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
  FlatList, // Importar FlatList
  KeyboardAvoidingView, // Importar KeyboardAvoidingView
  Platform,
} from "react-native";
import { useInventory } from "@/contexts/InventoryContext";
import { useDebtors } from "@/contexts/DebtorContext"; // Importando o contexto de devedores
import { v4 as uuidv4 } from "uuid";
import { ThemedText } from "@/components/ThemedText";

export default function AddTabScreen() {
  const [activeTab, setActiveTab] = useState<"product" | "debtor">("product");
  const { addItem, items } = useInventory(); // Obter os itens do inventário
  const { addDebtor } = useDebtors(); // Usando o contexto de devedores

  // Tela para adicionar produtos
  const AddProductScreen = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState<number | null>(null);
    const [price, setPrice] = useState<string>("");
    const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

    // Extrair categorias únicas do inventário
    const allCategories = Array.from(
      new Set(items.map((item) => item.category || "Sem Categoria"))
    );

    const handleCategoryChange = (value: string) => {
      setCategory(value);

      // Filtrar categorias com base no que o usuário está digitando
      if (value.trim()) {
        const filtered = allCategories.filter((cat) =>
          cat.toLowerCase().startsWith(value.toLowerCase())
        );
        setFilteredCategories(filtered);
      } else {
        setFilteredCategories([]);
      }
    };

    const handleSelectCategory = (selectedCategory: string) => {
      setCategory(selectedCategory);
      setFilteredCategories([]); // Limpar as sugestões após a seleção
    };

    const handleSaveProduct = async () => {
      if (!name.trim() || quantity === null) {
        Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
        return;
      }

      // Verificar se o produto já existe no inventário
      const productExists = items.some(
        (item) => item.name.toLowerCase() === name.trim().toLowerCase()
      );

      if (productExists) {
        Alert.alert("Erro", `O produto "${name}" já existe no inventário.`);
        return;
      }

      const newProduct = {
        id: uuidv4(), // Gerar um id único
        name,
        category,
        quantity,
        price: parseFloat(price.replace("R$", "").replace(",", ".")) || 0,
      };

      await addItem(newProduct);

      Alert.alert("Sucesso", `Produto "${name}" adicionado!`);
      setName("");
      setCategory("");
      setQuantity(null);
      setPrice("");
    };

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ThemedText style={styles.label}>Nome do Produto</ThemedText>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ex: Sabonete"
        />

        <ThemedText style={styles.label}>Categoria</ThemedText>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={handleCategoryChange}
          placeholder="Ex: Higiene"
        />
        {/* Dropdown de sugestões */}
        {filteredCategories.length > 0 && (
          <FlatList
            data={filteredCategories}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSelectCategory(item)}
              >
                <ThemedText style={styles.suggestionText}>{item}</ThemedText>
              </TouchableOpacity>
            )}
            style={styles.suggestionsContainer}
            keyboardShouldPersistTaps="handled" // Permitir interação com o dropdown
          />
        )}

        <ThemedText style={styles.label}>Quantidade</ThemedText>
        <TextInput
          style={styles.input}
          value={quantity !== null ? quantity.toString() : ""}
          onChangeText={(value) => {
            const numericValue = value.replace(/[^0-9]/g, "");
            setQuantity(numericValue ? parseInt(numericValue, 10) : null);
          }}
          placeholder="Ex: 10"
          keyboardType="numeric"
        />

        <ThemedText style={styles.label}>Preço (opcional)</ThemedText>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={(value) => {
            const numericValue = value.replace(/[^0-9]/g, "");
            if (numericValue) {
              const formattedValue = (parseFloat(numericValue) / 100).toFixed(
                2
              );
              setPrice(`R$ ${formattedValue.replace(".", ",")}`);
            } else {
              setPrice("");
            }
          }}
          placeholder="Ex: R$ 5,99"
          keyboardType="numeric"
        />

        <TouchableOpacity onPress={handleSaveProduct} style={styles.saveButton}>
          <ThemedText style={styles.saveButtonText}>Salvar Produto</ThemedText>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  };

  // Tela para adicionar devedores
  const AddDebtorScreen = () => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState<string>("");

    const handleSaveDebtor = async () => {
      if (!name.trim() || !amount.trim()) {
        Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
        return;
      }

      const newDebtor = {
        id: uuidv4(), // Gerar um id único
        name,
        amount: parseFloat(amount.replace("R$", "").replace(",", ".")) || 0,
        status: "open" as "open", // Status inicial como "Em Aberto"
      };

      await addDebtor(newDebtor); // Usando a função do contexto de devedores

      Alert.alert("Sucesso", `Devedor "${name}" adicionado!`);
      setName("");
      setAmount("");
    };

    const handleAmountChange = (value: string) => {
      const numericValue = value.replace(/[^0-9]/g, ""); // Remove caracteres não numéricos
      if (numericValue) {
        const formattedValue = (parseFloat(numericValue) / 100).toFixed(2); // Divide por 100 para formatar como moeda
        setAmount(`R$ ${formattedValue.replace(".", ",")}`);
      } else {
        setAmount("");
      }
    };

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText style={styles.label}>Nome do Devedor</ThemedText>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ex: Cliente A"
        />

        <ThemedText style={styles.label}>Valor Devido</ThemedText>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={handleAmountChange}
          placeholder="Ex: R$ 100,00"
          keyboardType="numeric"
        />

        <TouchableOpacity onPress={handleSaveDebtor} style={styles.saveButton}>
          <ThemedText style={styles.saveButtonText}>Salvar Devedor</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "product" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("product")}
        >
          <ThemedText
            style={[
              styles.tabButtonText,
              activeTab === "product" && styles.activeTabButtonText,
            ]}
          >
            Produto
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "debtor" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("debtor")}
        >
          <ThemedText
            style={[
              styles.tabButtonText,
              activeTab === "debtor" && styles.activeTabButtonText,
            ]}
          >
            Devedor
          </ThemedText>
        </TouchableOpacity>
      </View>

      {activeTab === "product" && <AddProductScreen />}
      {activeTab === "debtor" && <AddDebtorScreen />}
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
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
  },
  activeTabButtonText: {
    color: "#F5A689",
    fontWeight: "bold",
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "500",
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
  suggestionsContainer: {
    maxHeight: 150,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginTop: -8,
    marginBottom: 16,
    zIndex: 1,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  suggestionText: {
    fontSize: 16,
    color: "#333",
  },
});
