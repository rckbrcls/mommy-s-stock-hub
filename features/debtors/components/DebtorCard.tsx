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
    startDate?: string;
    dueDate?: string;
    paidDate?: string;
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
      <ThemedText style={styles.debtorStatus}>
        Início: {debtor.startDate ? debtor.startDate.substring(0, 10) : "-"}
      </ThemedText>
      <ThemedText style={styles.debtorStatus}>
        Prazo: {debtor.dueDate ? debtor.dueDate.substring(0, 10) : "-"}
      </ThemedText>
      {debtor.status === "paid" && (
        <ThemedText style={styles.debtorStatus}>
          Pago em: {debtor.paidDate ? debtor.paidDate.substring(0, 10) : "-"}
        </ThemedText>
      )}
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
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    padding: 16,
  },
  debtorInfo: { flex: 1 },
  debtorName: { fontSize: 16, fontWeight: "600" },
  debtorAmount: { fontSize: 14, marginVertical: 4 },
  debtorStatus: { fontSize: 14, fontWeight: "bold" },
  statusOpen: { color: "#FF6347" },
  statusPaid: { color: "#32CD32" },
  actions: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
    width: "48%",
  },
  markPaidButton: { backgroundColor: "#A3D977" },
  deleteButton: { backgroundColor: "#FF6347" },
  actionButtonText: { color: "#fff", fontWeight: "600", fontSize: 14 },
});
