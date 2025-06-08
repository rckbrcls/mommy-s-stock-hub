// MommyStockHub/screens/DebtorsScreen.tsx

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/features/settings/hooks/useThemeColor";
import { ThemedView } from "@/components/ThemedView";
import { SortOptions } from "@/features/inventory/components/SortOptions";
import { StatusFilter } from "@/features/debtors/components/StatusFilter";
import { DebtorCard } from "@/features/debtors/components/DebtorCard";
import { useDebtors } from "@/features/debtors/contexts/DebtorContext";
import { SearchBarDebtors } from "@/features/debtors/components/SearchBarDebtors";

export default function DebtorsScreen() {
  const { debtors, removeDebtor, markAsPaid } = useDebtors(); // Usando o contexto de devedores
  const [searchQuery, setSearchQuery] = useState(""); // Estado para a barra de pesquisa
  const [sortType, setSortType] = useState<"amountAsc" | "amountDesc" | "">(""); // Ordenação
  const [statusFilter, setStatusFilter] = useState<"open" | "paid" | "">(""); // Filtro de status
  const textColor = useThemeColor({ light: "#222", dark: "#999" }, "text");

  // Filtrar devedores com base no nome, status e ordenação
  const filteredDebtors = debtors
    .filter((debtor) =>
      debtor.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((debtor) => (statusFilter ? debtor.status === statusFilter : true))
    .sort((a, b) => {
      if (sortType === "amountAsc") {
        return a.amount - b.amount;
      } else if (sortType === "amountDesc") {
        return b.amount - a.amount;
      }
      return 0;
    });

  // Marcar como pago
  const handleMarkAsPaid = async (debtorId: string) => {
    await markAsPaid(debtorId);
  };

  // Excluir devedor
  const handleDelete = async (debtorId: string) => {
    Alert.alert(
      "Excluir Devedor",
      "Tem certeza que deseja excluir este devedor?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await removeDebtor(debtorId);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <ThemedView style={styles.header}>
              <ThemedText type="title">Devedores</ThemedText>
            </ThemedView>

            {/* Barra de Pesquisa */}
            <SearchBarDebtors
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            {/* Filtro de Status e Opções de Ordenação */}
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1 }}>
                <StatusFilter
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                />
              </View>
              <View style={{ flex: 1 }}>
                <SortOptions sortType={sortType} setSortType={setSortType} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={{ flex: 1 }}>
          <FlatList
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            style={{ flex: 1 }}
            data={filteredDebtors}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 16 }}
            ListEmptyComponent={
              <ThemedText style={styles.emptyList}>
                Nenhum devedor encontrado.
              </ThemedText>
            }
            renderItem={({ item }) => (
              <DebtorCard
                debtor={item}
                onMarkAsPaid={handleMarkAsPaid}
                onDelete={handleDelete}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "transparent",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  searchBar: {
    backgroundColor: "transparent",
  },
  filterContainer: {
    marginBottom: 10,
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
  },
  modalOptionText: {
    fontSize: 16,
  },
  mainButton: {
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#A3D977",
  },
  exitButton: {
    backgroundColor: "#808080",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
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
});
