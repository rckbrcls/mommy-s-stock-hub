import React from "react";
import { Card } from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { PieChart } from "react-native-chart-kit";
import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

interface DebtorsPieChartProps {
  debtorsData: any[];
}

export const DebtorsPieChart: React.FC<DebtorsPieChartProps> = ({
  debtorsData,
}) => (
  <Card style={styles.chartContainer}>
    <ThemedText style={styles.sectionTitle}>
      Distribuição dos Devedores
    </ThemedText>
    {debtorsData.length > 0 ? (
      <PieChart
        data={debtorsData}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(245, 166, 137, ${opacity})`,
        }}
        accessor={"amount"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        absolute
      />
    ) : (
      <ThemedText style={styles.emptyList}>
        Nenhum dado disponível para o gráfico.
      </ThemedText>
    )}
  </Card>
);

const styles = StyleSheet.create({
  chartContainer: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
    marginTop: 4,
  },
  emptyList: {
    fontSize: 14,
    marginTop: 8,
    fontStyle: "italic",
    textAlign: "center",
  },
});
