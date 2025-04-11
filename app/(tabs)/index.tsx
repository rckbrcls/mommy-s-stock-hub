// MommyStockHub/screens/HomeScreen.tsx

import { useNavigation } from "expo-router";
import React, { useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useInventory } from "../../contexts/InventoryContext";
import { useDebtors } from "../../contexts/DebtorContext";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { items } = useInventory();
  const { debtors } = useDebtors();

  // Calcular dados dinâmicos
  const totalProducts = items.length;
  const totalCategories = useMemo(() => {
    const categories = new Set(
      items.map((item) => item.category || "Sem Categoria")
    );
    return categories.size;
  }, [items]);
  const lowStock = useMemo(
    () => items.filter((item) => item.quantity < 5),
    [items]
  );

  // Maiores devedores
  const topDebtors = useMemo(() => {
    return debtors
      .filter((debtor) => debtor.status === "open")
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3); // Pegar os 3 maiores devedores
  }, [debtors]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            paddingBottom: 20,
          }}
        >
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ width: 100, height: 100 }}
          />
          <ThemedText
            style={[styles.title, { flexShrink: 1, textAlign: "left" }]}
          >
            Bem-vindo(a) ao Mommy Stock Hub!
          </ThemedText>
        </View>

        {/* Seção de resumo */}
        <View style={styles.summaryContainer}>
          <Card style={styles.summaryCard}>
            <ThemedText style={styles.summaryValue}>{totalProducts}</ThemedText>
            <ThemedText style={styles.summaryLabel}>Produtos</ThemedText>
          </Card>
          <Card style={styles.summaryCard}>
            <ThemedText style={styles.summaryValue}>
              {totalCategories}
            </ThemedText>
            <ThemedText style={styles.summaryLabel}>Categorias</ThemedText>
          </Card>
          <Card style={styles.summaryCard}>
            <ThemedText style={styles.summaryValue}>
              {lowStock.length}
            </ThemedText>
            <ThemedText style={styles.summaryLabel}>Em Falta</ThemedText>
          </Card>
        </View>

        {/* Lista de produtos com baixo estoque */}
        <Card style={styles.lowStockSection}>
          <ThemedText style={styles.sectionTitle}>
            📉 Produtos com baixo estoque:
          </ThemedText>
          {lowStock.length > 0 ? (
            <ThemedView style={styles.lowStockContainer}>
              {lowStock.slice(0, 4).map(
                (
                  item // Limitar a 4 itens
                ) => (
                  <Card key={item.id} style={styles.lowStockCard}>
                    <ThemedText style={styles.lowStockName}>
                      {item.name}
                    </ThemedText>
                    <ThemedText style={styles.lowStockQuantity}>
                      Qtd: {item.quantity}
                    </ThemedText>
                  </Card>
                )
              )}
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

        {/* Resumo de devedores */}
        <Card style={styles.lowStockSection}>
          <ThemedText style={styles.sectionTitle}>
            💰 Maiores Devedores:
          </ThemedText>
          {topDebtors.length > 0 ? (
            <ThemedView style={styles.lowStockContainer}>
              {topDebtors.slice(0, 4).map(
                (
                  debtor // Limitar a 4 itens
                ) => (
                  <Card key={debtor.id} style={styles.lowStockCard}>
                    <ThemedText style={styles.lowStockName}>
                      {debtor.name}
                    </ThemedText>
                    <ThemedText style={styles.lowStockQuantity}>
                      Valor: R$ {debtor?.amount?.toFixed(2)}
                    </ThemedText>
                  </Card>
                )
              )}
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

        {/* Resumo de categorias mais em falta */}
        <Card style={styles.lowStockSection}>
          <ThemedText style={styles.sectionTitle}>
            📂 Categorias Mais em Falta:
          </ThemedText>
          {totalCategories > 0 ? (
            <ThemedView style={styles.lowStockContainer}>
              {Object.entries(
                items.reduce((acc, item) => {
                  const category = item.category || "Sem Categoria";
                  acc[category] = (acc[category] || 0) + item.quantity;
                  return acc;
                }, {} as Record<string, number>)
              )
                .sort((a, b) => a[1] - b[1]) // Ordenar pelas categorias com menos itens
                .slice(0, 4) // Limitar a 4 categorias
                .map(([category, quantity], index) => (
                  <Card key={index} style={styles.lowStockCard}>
                    <ThemedText style={styles.lowStockName}>
                      {category}
                    </ThemedText>
                    <ThemedText style={styles.lowStockQuantity}>
                      Qtd: {quantity}
                    </ThemedText>
                  </Card>
                ))}
            </ThemedView>
          ) : (
            <ThemedText style={styles.emptyList}>
              Nenhuma categoria cadastrada no momento.
            </ThemedText>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("inventory" as never)} // Botão para ir ao estoque
          >
            <ThemedText style={styles.buttonText}>Ver Estoque</ThemedText>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
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
  lowStockSection: {
    marginBottom: 24,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F5A689",
    marginBottom: 24,
    textAlign: "center",
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
  buttonsContainer: {
    marginTop: 24,
  },
  button: {
    backgroundColor: "#F5A689",
    paddingVertical: 14,
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
