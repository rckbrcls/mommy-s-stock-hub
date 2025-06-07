import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Card } from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "expo-router";
import { StyleSheet } from "react-native";

interface Debtor {
  id: string;
  name: string;
  amount: number;
}

interface TopDebtorsListProps {
  topDebtors: Debtor[];
}

export const TopDebtorsList: React.FC<TopDebtorsListProps> = ({
  topDebtors,
}) => {
  const navigation = useNavigation();
  return (
    <Card style={styles.lowStockSection}>
      <ThemedText style={styles.sectionTitle}>Maiores Devedores:</ThemedText>
      {topDebtors.length > 0 ? (
        <ThemedView style={styles.lowStockContainer}>
          {topDebtors.slice(0, 4).map((debtor) => (
            <Card key={debtor.id} style={styles.lowStockCard}>
              <ThemedText style={styles.lowStockName}>{debtor.name}</ThemedText>
              <ThemedText style={styles.lowStockQuantity}>
                Valor: R$ {debtor.amount.toFixed(2)}
              </ThemedText>
            </Card>
          ))}
        </ThemedView>
      ) : (
        <ThemedText style={styles.emptyList}>
          Nenhum devedor pendente no momento.
        </ThemedText>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("debtors" as never)}
      >
        <ThemedText style={styles.buttonText}>Ver Devedores</ThemedText>
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
