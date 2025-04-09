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
} from "react-native";

type Debtor = {
  id: string;
  name: string;
  amount: number;
  status: "open" | "paid";
};

export default function DebtorsScreen() {
  const [debtors, setDebtors] = useState<Debtor[]>([
    { id: "1", name: "Cliente A", amount: 100, status: "open" },
    { id: "2", name: "Cliente B", amount: 200, status: "paid" },
  ]);

  // Marcar como pago
  const handleMarkAsPaid = (debtorId: string) => {
    setDebtors((prev) =>
      prev.map((d) => (d.id === debtorId ? { ...d, status: "paid" } : d))
    );
  };

  // Excluir devedor
  const handleDelete = (debtorId: string) => {
    Alert.alert(
      "Excluir Devedor",
      "Tem certeza que deseja excluir este devedor?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            setDebtors((prev) => prev.filter((d) => d.id !== debtorId));
          },
        },
      ]
    );
  };

  // Navegar para tela de adicionar devedor
  const handleAddDebtor = () => {
    Alert.alert(
      "Adicionar Devedor",
      "Navegar para tela ou abrir modal de cadastro."
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Devedores</Text>

        <FlatList
          data={debtors}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyList}>
              Nenhum devedor cadastrado no momento.
            </Text>
          }
          renderItem={({ item }) => (
            <View style={styles.debtorCard}>
              <View style={styles.debtorInfo}>
                <Text style={styles.debtorName}>{item.name}</Text>
                <Text style={styles.debtorAmount}>
                  Valor: R$ {item.amount.toFixed(2)}
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

        <TouchableOpacity style={styles.addButton} onPress={handleAddDebtor}>
          <Text style={styles.addButtonText}>Adicionar Devedor</Text>
        </TouchableOpacity>
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
  addButton: {
    backgroundColor: "#F5A689",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});
