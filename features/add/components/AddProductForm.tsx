import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  StyleSheet,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useThemeColor } from "@/features/settings/hooks/useThemeColor";
import { ThemedInput } from "@/components/ThemedInput";
import { v4 as uuidv4 } from "uuid";
import { useCategorySuggestions } from "@/features/add/hooks/useCategorySuggestions";
import {
  formatCurrencyInput,
  parseCurrency,
} from "@/features/inventory/hooks/useCurrencyHelpers";

interface AddProductFormProps {
  addItem: (item: any) => Promise<void>;
  items: any[];
}

export const AddProductForm: React.FC<AddProductFormProps> = ({
  addItem,
  items,
}) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number | null>(null);
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const textColor = useThemeColor({ light: "#222", dark: "#999" }, "text");

  const {
    category,
    setCategory,
    filteredCategories,
    handleCategoryChange,
    handleSelectCategory,
    allCategories,
  } = useCategorySuggestions(items);

  const handleSaveProduct = async () => {
    if (!name.trim() || quantity === null) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }
    const productExists = items.some(
      (item) => item.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (productExists) {
      Alert.alert("Erro", `O produto "${name}" já existe no inventário.`);
      return;
    }
    const newProduct = {
      id: uuidv4(),
      name,
      category,
      quantity,
      price: parseCurrency(price),
      location: location || undefined,
    };
    await addItem(newProduct);
    Alert.alert("Sucesso", `Produto "${name}" adicionado!`);
    setName("");
    setCategory("");
    setQuantity(null);
    setPrice("");
    setLocation("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View>
          <ThemedText style={styles.label}>Nome do Produto</ThemedText>
          <ThemedInput
            value={name}
            onChangeText={setName}
            placeholder="Ex: Sabonete"
          />
        </View>
        <View>
          <ThemedText style={styles.label}>Categoria</ThemedText>
          <ThemedInput
            placeholderTextColor={textColor}
            value={category}
            onChangeText={handleCategoryChange}
            placeholder="Ex: Higiene"
          />
          {filteredCategories.length > 0 && (
            <FlatList
              data={filteredCategories}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectCategory(item)}>
                  <Card style={styles.suggestionCard}>
                    <ThemedText style={styles.suggestionText}>
                      {item}
                    </ThemedText>
                  </Card>
                </TouchableOpacity>
              )}
              style={styles.suggestionsContainer}
              keyboardShouldPersistTaps="handled"
            />
          )}
        </View>
        <View>
          <ThemedText style={styles.label}>Quantidade</ThemedText>
          <ThemedInput
            placeholderTextColor={textColor}
            value={quantity !== null ? quantity.toString() : ""}
            onChangeText={(value) => {
              const numericValue = value.replace(/[^0-9]/g, "");
              setQuantity(numericValue ? parseInt(numericValue, 10) : null);
            }}
            placeholder="Ex: 10"
            keyboardType="numeric"
          />
        </View>
        <View>
          <ThemedText style={styles.label}>Preço (opcional)</ThemedText>
          <ThemedInput
            placeholderTextColor={textColor}
            value={price}
            onChangeText={(value) => setPrice(formatCurrencyInput(value))}
            placeholder="Ex: R$ 5,99"
            keyboardType="numeric"
          />
        </View>
        <View>
          <ThemedText style={styles.label}>Localização (opcional)</ThemedText>
          <ThemedInput
            placeholderTextColor={textColor}
            value={location}
            onChangeText={setLocation}
            placeholder="Ex: Prateleira 2"
          />
        </View>
        <TouchableOpacity onPress={handleSaveProduct} style={styles.saveButton}>
          <ThemedText style={styles.saveButtonText}>Salvar Produto</ThemedText>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, gap: 10 },
  label: { marginBottom: 8, fontSize: 16, fontWeight: "500" },
  saveButton: {
    backgroundColor: "#F5A689",
    paddingVertical: 10,
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
    borderWidth: 1,
    borderRadius: 8,
    marginTop: -8,
    marginBottom: 16,
    zIndex: 1,
  },
  suggestionCard: {
    marginBottom: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },
  suggestionText: { fontSize: 16 },
});
