import React from "react";
import { View } from "react-native";
import { Card } from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet } from "react-native";

interface SummaryCardsProps {
  totalProducts: number;
  totalCategories: number;
  lowStockCount: number;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalProducts,
  totalCategories,
  lowStockCount,
}) => (
  <View style={styles.summaryContainer}>
    <Card style={styles.summaryCard}>
      <ThemedText style={styles.summaryValue}>{totalProducts}</ThemedText>
      <ThemedText style={styles.summaryLabel}>Produtos</ThemedText>
    </Card>
    <Card style={styles.summaryCard}>
      <ThemedText style={styles.summaryValue}>{totalCategories}</ThemedText>
      <ThemedText style={styles.summaryLabel}>Categorias</ThemedText>
    </Card>
    <Card style={styles.summaryCard}>
      <ThemedText style={styles.summaryValue}>{lowStockCount}</ThemedText>
      <ThemedText style={styles.summaryLabel}>Em Falta</ThemedText>
    </Card>
  </View>
);

const styles = StyleSheet.create({
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F5A689",
  },
  summaryLabel: {
    fontSize: 14,
  },
});
