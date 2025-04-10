// MommyStockHub/screens/DebtorsScreen.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useDebtors } from "@/contexts/DebtorContext"; // Importando o contexto de devedores

export default function DebtorsScreen() {
  const { debtors, removeDebtor, markAsPaid } = useDebtors(); // Usando o contexto de devedores
  const [searchQuery, setSearchQuery] = useState(""); // Estado para a barra de pesquisa

  // Filtrar devedores com base no nome
  const filteredDebtors = debtors.filter((debtor) =>
    debtor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Marcar como pago
  const handleMarkAsPaid = async (debtorId: number) => {
    const index = debtors.findIndex((d) => d.id === debtorId);
    if (index !== -1) {
      await markAsPaid(index);
    }
  };

  // Excluir devedor
  const handleDelete = async (debtorId: number) => {
    Alert.alert(
      "Excluir Devedor",
      "Tem certeza que deseja excluir este devedor?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            const index = debtors.findIndex((d) => d.id === debtorId);
            if (index !== -1) {
              await removeDebtor(index);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Devedores</Text>

        {/* Barra de Pesquisa */}
        <TextInput
          style={styles.searchBar}
          placeholder="Pesquisar devedores..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <FlatList
          data={filteredDebtors}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyList}>Nenhum devedor encontrado.</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.debtorCard}>
              <View style={styles.debtorInfo}>
                <Text style={styles.debtorName}>{item.name}</Text>
                <Text style={styles.debtorAmount}>
                  Valor: R$ {item?.amount?.toFixed(2)}
                </Text>
                <Text
                  style={[
                    styles.debtorStatus,
                    item.status === "open"
                      ? styles.statusOpen
                      : styles.statusPaid,
                  ]}
                >
                  {item.status === "open" ? "Em Aberto" : "Pago"}
                </Text>
                <Text style={styles.debtorAmount}>
                  Valor: R$ {item?.amount?.toFixed(2)}
                </Text>
              </View>
              <View style={styles.actions}>
                {item.status === "open" && (
                  <TouchableOpacity
                    style={[styles.actionButton, styles.markPaidButton]}
                    onPress={() => handleMarkAsPaid(item.id)}
                  >
                    <Text style={styles.actionButtonText}>Marcar Pago</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.actionButtonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  listContainer: {
    paddingBottom: 16,
  },
  emptyList: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
    fontSize: 16,
    fontStyle: "italic",
  },
  debtorCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  debtorInfo: {
    flex: 1,
  },
  debtorName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  debtorAmount: {
    fontSize: 14,
    marginVertical: 4,
    color: "#555",
  },
  debtorStatus: {
    fontSize: 14,
    fontWeight: "bold",
  },
  statusOpen: {
    color: "#FF6347", // Vermelho para "Em Aberto"
  },
  statusPaid: {
    color: "#32CD32", // Verde para "Pago"
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  markPaidButton: {
    backgroundColor: "#A3D977",
  },
  deleteButton: {
    backgroundColor: "#FF6347",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
