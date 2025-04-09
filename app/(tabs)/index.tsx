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
          <Text style={[styles.title, { flexShrink: 1, textAlign: "left" }]}>
            Bem-vindo(a) ao Mommy Stock Hub!
          </Text>
        </View>

        {/* Seção de resumo */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{totalProducts}</Text>
            <Text style={styles.summaryLabel}>Produtos</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{totalCategories}</Text>
            <Text style={styles.summaryLabel}>Categorias</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{lowStock.length}</Text>
            <Text style={styles.summaryLabel}>Em Falta</Text>
          </View>
        </View>

        {/* Lista de produtos com baixo estoque */}
        <View style={styles.lowStockSection}>
          <Text style={styles.sectionTitle}>
            📉 Produtos com baixo estoque:
          </Text>
          {lowStock.length > 0 ? (
            <View style={styles.lowStockContainer}>
              {lowStock.map((item) => (
                <View key={item.id} style={styles.lowStockCard}>
                  <Text style={styles.lowStockName}>{item.name}</Text>
                  <Text style={styles.lowStockQuantity}>
                    Qtd: {item.quantity}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyList}>
              Nenhum produto em falta por enquanto.
            </Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("inventory" as never)}
          >
            <Text style={styles.buttonText}>Ver Estoque</Text>
          </TouchableOpacity>
        </View>

        {/* Resumo de devedores */}
        <View style={styles.lowStockSection}>
          <Text style={styles.sectionTitle}>💰 Maiores Devedores:</Text>
          {topDebtors.length > 0 ? (
            <View style={styles.lowStockContainer}>
              {topDebtors.map((debtor) => (
                <View key={debtor.id} style={styles.lowStockCard}>
                  <Text style={styles.lowStockName}>{debtor.name}</Text>
                  <Text style={styles.lowStockQuantity}>
                    Valor: R$ {debtor.amount.toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyList}>
              Nenhum devedor pendente no momento.
            </Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("debtors" as never)}
          >
            <Text style={styles.buttonText}>Ver Devedores</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F5A689",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  lowStockSection: {
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F5A689",
    marginBottom: 12,
    textAlign: "center",
  },
  lowStockContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  lowStockCard: {
    flexBasis: "48%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lowStockName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  lowStockQuantity: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  emptyList: {
    fontSize: 14,
    color: "#999",
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
