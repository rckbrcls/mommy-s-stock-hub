import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Card } from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";

interface DebtorCardProps {
  debtor: {
    id: string;
    name: string;
    amount: number;
    status: "open" | "paid";
  };
  onMarkAsPaid: (id: string) => void;
  onDelete: (id: string) => void;
}

export const DebtorCard: React.FC<DebtorCardProps> = ({
  debtor,
  onMarkAsPaid,
  onDelete,
}) => (
  <Card style={styles.debtorCard}>
    <View style={styles.debtorInfo}>
      <ThemedText style={styles.debtorName}>{debtor.name}</ThemedText>
      <ThemedText style={styles.debtorAmount}>
        Valor: R$ {debtor.amount.toFixed(2)}
      </ThemedText>
      <ThemedText
        style={[
          styles.debtorStatus,
          debtor.status === "open" ? styles.statusOpen : styles.statusPaid,
        ]}
      >
        {debtor.status === "open" ? "Em Aberto" : "Pago"}
      </ThemedText>
    </View>
    <View style={styles.actions}>
      {debtor.status === "open" && (
        <TouchableOpacity
          style={[styles.actionButton, styles.markPaidButton]}
          onPress={() => onMarkAsPaid(debtor.id)}
        >
          <ThemedText style={styles.actionButtonText}>Marcar Pago</ThemedText>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteButton]}
        onPress={() => onDelete(debtor.id)}
      >
        <ThemedText style={styles.actionButtonText}>Excluir</ThemedText>
      </TouchableOpacity>
    </View>
  </Card>
);

const styles = StyleSheet.create({
  debtorCard: {
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  debtorInfo: { flex: 1 },
  debtorName: { fontSize: 16, fontWeight: "600" },
  debtorAmount: { fontSize: 14, marginVertical: 4 },
  debtorStatus: { fontSize: 14, fontWeight: "bold" },
  statusOpen: { color: "#FF6347" },
  statusPaid: { color: "#32CD32" },
  actions: { flexDirection: "row" },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  markPaidButton: { backgroundColor: "#A3D977" },
  deleteButton: { backgroundColor: "#FF6347" },
  actionButtonText: { color: "#fff", fontWeight: "600", fontSize: 14 },
});
