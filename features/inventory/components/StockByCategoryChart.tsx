import React from "react";
import { Card } from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { BarChart } from "react-native-chart-kit";
import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

interface StockByCategoryChartProps {
  stockByCategory: {
    labels: string[];
    datasets: { data: number[] }[];
  };
  backgroundColor: string;
  color: string;
}

export const StockByCategoryChart: React.FC<StockByCategoryChartProps> = ({
  stockByCategory,
  backgroundColor,
  color,
}) => (
  <Card>
    <ThemedText type="subtitle" style={styles.sectionTitle}>
      Estoque por Categoria
    </ThemedText>
    {stockByCategory.datasets[0].data.length > 0 ? (
      <BarChart
        data={{
          labels: stockByCategory.labels.slice(0, 6),
          datasets: [
            {
              data: stockByCategory.datasets[0].data.slice(0, 6),
            },
          ],
        }}
        width={screenWidth - 64}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          decimalPlaces: 0,
          backgroundColor: "transparent",
          backgroundGradientFrom: backgroundColor,
          backgroundGradientTo: backgroundColor,
          color: (opacity = 1) => `rgba(245, 166, 137, ${opacity})`,
          labelColor: (opacity = 1) => color,
          style: { borderRadius: 16 },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        style={styles.chart}
      />
    ) : (
      <ThemedText style={styles.emptyList}>
        Nenhum dado disponível para o gráfico.
      </ThemedText>
    )}
  </Card>
);

const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 24,
    marginTop: 4,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
  emptyList: {
    fontSize: 14,
    marginTop: 8,
    fontStyle: "italic",
    textAlign: "center",
  },
});
