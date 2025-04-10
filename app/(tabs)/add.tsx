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
        id: Date.now(),
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
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            )}
            style={styles.suggestionsContainer}
            keyboardShouldPersistTaps="handled" // Permitir interação com o dropdown
          />
        )}

        <Text style={styles.label}>Quantidade</Text>
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

        <Text style={styles.label}>Preço (opcional)</Text>
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
          <Text style={styles.saveButtonText}>Salvar Produto</Text>
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
        id: Date.now(),
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
        <Text style={styles.title}>Adicionar Devedor</Text>

        <Text style={styles.label}>Nome do Devedor</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ex: Cliente A"
        />

        <Text style={styles.label}>Valor Devido</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={handleAmountChange}
          placeholder="Ex: R$ 100,00"
          keyboardType="numeric"
        />

        <TouchableOpacity onPress={handleSaveDebtor} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Salvar Devedor</Text>
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

      {activeTab === "product" && <AddProductScreen />}
      {activeTab === "debtor" && <AddDebtorScreen />}
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
