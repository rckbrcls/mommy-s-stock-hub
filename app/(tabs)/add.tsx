// MommyStockHub/screens/AddTabScreen.tsx

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView, // Importar o componente
} from "react-native";
// Importando o contexto de devedores
import "react-native-get-random-values";
import { ThemedText } from "@/components/ThemedText";
import { AddProductForm } from "@/features/add/components/AddProductForm";
import { AddDebtorForm } from "@/features/add/components/AddDebtorForm";
import { useDebtors } from "@/features/debtors/contexts/DebtorContext";
import { useInventory } from "@/features/inventory/contexts/InventoryContext";

export default function AddTabScreen() {
  const [activeTab, setActiveTab] = useState<"product" | "debtor">("product");
  const { addItem, items } = useInventory(); // Obter os itens do inventário
  const { addDebtor } = useDebtors(); // Usando o contexto de devedores

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

      {activeTab === "product" && (
        <AddProductForm addItem={addItem} items={items} />
      )}
      {activeTab === "debtor" && <AddDebtorForm addDebtor={addDebtor} />}
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
    gap: 10,
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
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  suggestionText: {
    fontSize: 16,
  },
});
