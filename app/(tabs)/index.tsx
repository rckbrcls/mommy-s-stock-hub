// MommyStockHub/screens/HomeScreen.tsx

import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

type Product = {
  id: string;
  name: string;
  quantity: number;
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const [lowStock, setLowStock] = useState<Product[]>([]);

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
            source={require("../../assets/images/logo.png")} // Caminho relativo ao arquivo atual
            style={{ width: 100, height: 100 }}
          />
          <Text style={[styles.title, { flexShrink: 1, textAlign: "left" }]}>
            Bem-vindo(a) ao Mommy Stock Hub!
          </Text>
        </View>
        {/* Seção de resumo */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>50</Text>
            <Text style={styles.summaryLabel}>Produtos</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>5</Text>
            <Text style={styles.summaryLabel}>Categorias</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>3</Text>
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
        </View>

        {/* Botões principais */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("inventory" as never)}
          >
            <Text style={styles.buttonText}>Ver Estoque</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("add" as never)}
          >
            <Text style={styles.buttonText}>Adicionar Produto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("debtors" as never)}
          >
            <Text style={styles.buttonText}>Devedores</Text>
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
    paddingTop: 24,
    paddingBottom: 16,
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
    color: "#1E90FF",
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
    color: "#1E90FF",
    marginBottom: 12,
    textAlign: "center",
  },
  lowStockContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  lowStockCard: {
    flexBasis: "48%", // Dois cards por linha
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
    backgroundColor: "#1E90FF",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 16,
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
