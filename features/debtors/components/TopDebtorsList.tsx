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
  startDate?: string;
  dueDate?: string;
  paidDate?: string;
  status?: string;
}

interface TopDebtorsListProps {
  topDebtors: Debtor[];
}

export const TopDebtorsList: React.FC<TopDebtorsListProps> = ({
  topDebtors,
}) => {
  const navigation = useNavigation();
  return (
    <Card>
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        Maiores Devedores:
      </ThemedText>
      {topDebtors.length > 0 ? (
        <ThemedView style={styles.lowStockContainer}>
          {topDebtors.slice(0, 4).map((debtor) => (
            <Card key={debtor.id} style={styles.lowStockCard}>
              <ThemedText style={styles.lowStockName}>{debtor.name}</ThemedText>
              <View style={styles.lowStockContainer}>
                <Card style={styles.lowStockInfoCard}>
                  <ThemedText style={styles.lowStockInfoTitle}>
                    Valor:
                  </ThemedText>
                  <ThemedText style={styles.lowStockInfoDescription}>
                    {debtor.amount.toFixed(2)}
                  </ThemedText>
                </Card>
                <Card style={styles.lowStockInfoCard}>
                  <ThemedText style={styles.lowStockInfoTitle}>
                    Início:
                  </ThemedText>
                  <ThemedText style={styles.lowStockInfoDescription}>
                    {debtor.startDate ? debtor.startDate.substring(0, 10) : "-"}
                  </ThemedText>
                </Card>
                <Card style={styles.lowStockInfoCard}>
                  <ThemedText style={styles.lowStockInfoTitle}>
                    Prazo:
                  </ThemedText>
                  <ThemedText style={styles.lowStockInfoDescription}>
                    {debtor.dueDate ? debtor.dueDate.substring(0, 10) : "-"}
                  </ThemedText>
                </Card>
              </View>
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
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 24,
    marginTop: 4,
  },
  lowStockContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  lowStockCard: {
    flexBasis: "100%",
    padding: 16,
    marginBottom: 12,
    alignItems: "flex-start",
  },
  lowStockInfoCard: {
    flexBasis: "100%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lowStockName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  lowStockInfoTitle: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  lowStockInfoDescription: {
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
