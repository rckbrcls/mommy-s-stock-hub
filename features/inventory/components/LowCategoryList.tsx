import React from "react";
import { TouchableOpacity } from "react-native";
import { Card } from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "expo-router";
import { StyleSheet, Image } from "react-native";

interface LowCategoryListProps {
  categories: { [category: string]: number };
}

export const LowCategoryList: React.FC<LowCategoryListProps> = ({
  categories,
}) => {
  const navigation = useNavigation();
  const sortedCategories = Object.entries(categories)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 4);

  return (
    <Card>
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        Categorias Mais em Falta:
      </ThemedText>
      {sortedCategories.length > 0 ? (
        <ThemedView style={styles.lowStockContainer}>
          {sortedCategories.map(([category, quantity], index) => (
            <Card key={index} style={styles.lowStockCard}>
              <ThemedText style={styles.lowStockName}>{category}</ThemedText>
              <ThemedText style={styles.lowStockQuantity}>
                Qtd: {quantity}
              </ThemedText>
            </Card>
          ))}
        </ThemedView>
      ) : (
        <Image
          source={require("../../../assets/images/no-data.png")}
          style={{ width: 100, height: 150, alignSelf: "center" }}
        />
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
  sectionTitle: {
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
