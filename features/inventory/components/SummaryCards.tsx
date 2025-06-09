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
      <ThemedText style={styles.summaryLabel}>Produtos</ThemedText>
      <ThemedText style={styles.summaryValue}>{totalProducts}</ThemedText>
    </Card>
    <Card style={styles.summaryCard}>
      <ThemedText style={styles.summaryLabel}>Categorias</ThemedText>
      <ThemedText style={styles.summaryValue}>{totalCategories}</ThemedText>
    </Card>
    <Card style={styles.summaryCard}>
      <ThemedText style={styles.summaryLabel}>Em Falta</ThemedText>
      <ThemedText style={styles.summaryValue}>{lowStockCount}</ThemedText>
    </Card>
  </View>
);

const styles = StyleSheet.create({
  summaryContainer: {
    display: "flex",
    gap: 4,
    justifyContent: "space-between",
  },
  summaryCard: {
    flex: 1,
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
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
