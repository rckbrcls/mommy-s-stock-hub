import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Card } from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "expo-router";
import { StyleSheet } from "react-native";
import { useLowStockNotification } from "../hooks/useLowStockNotification";

interface Item {
  id: string;
  name: string;
  quantity: number;
}

interface LowStockListProps {
  lowStock: Item[];
}

export const LowStockList: React.FC<LowStockListProps> = ({ lowStock }) => {
  const navigation = useNavigation();
  useLowStockNotification(lowStock);
  return (
    <Card style={styles.lowStockSection}>
      <ThemedText style={styles.sectionTitle}>
        Produtos com baixo estoque:
      </ThemedText>
      {lowStock.length > 0 ? (
        <ThemedView style={styles.lowStockContainer}>
          {lowStock.slice(0, 4).map((item) => (
            <Card key={item.id} style={styles.lowStockCard}>
              <ThemedText style={styles.lowStockName}>{item.name}</ThemedText>
              <ThemedText style={styles.lowStockQuantity}>
                Qtd: {item.quantity}
              </ThemedText>
            </Card>
          ))}
        </ThemedView>
      ) : (
        <ThemedText style={styles.emptyList}>
          Nenhum produto em falta por enquanto.
        </ThemedText>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("inventory" as never)}
      >
        <ThemedText style={styles.buttonText}>Ver Estoque</ThemedText>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  lowStockSection: {
    marginBottom: 24,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
    marginTop: 4,
  },
  lowStockContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  lowStockCard: {
    flexBasis: "48%",
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  lowStockName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  lowStockQuantity: {
    fontSize: 14,
    textAlign: "center",
  },
  emptyList: {
    fontSize: 14,
    marginTop: 8,
    fontStyle: "italic",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#F5A689",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});
