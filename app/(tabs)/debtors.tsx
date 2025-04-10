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
  Modal,
} from "react-native";
import { useDebtors } from "@/contexts/DebtorContext"; // Importando o contexto de devedores

const SortOptions = ({
  sortType,
  setSortType,
}: {
  sortType: "amountAsc" | "amountDesc" | "";
  setSortType: (type: "amountAsc" | "amountDesc" | "") => void;
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectSort = (type: "amountAsc" | "amountDesc" | "") => {
    setSortType(type);
    setModalVisible(false);
  };

  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.categoryButtonText}>
          {sortType === "amountAsc"
            ? "Menos Devendo"
            : sortType === "amountDesc"
            ? "Mais Devendo"
            : "Ordenar"}
        </Text>
      </TouchableOpacity>

      {/* Modal para exibir as opções de ordenação */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Ordenar por:</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleSelectSort("amountAsc")}
            >
              <Text style={styles.modalOptionText}>Menos Devendo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleSelectSort("amountDesc")}
            >
              <Text style={styles.modalOptionText}>Mais Devendo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.mainButton, styles.exitButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const StatusFilter = ({
  statusFilter,
  setStatusFilter,
}: {
  statusFilter: "open" | "paid" | "";
  setStatusFilter: (status: "open" | "paid" | "") => void;
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectStatus = (status: "open" | "paid" | "") => {
    setStatusFilter(status);
    setModalVisible(false);
  };

  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.categoryButtonText}>
          {statusFilter === "open"
            ? "Em Aberto"
            : statusFilter === "paid"
            ? "Pagos"
            : "Filtrar Status"}
        </Text>
      </TouchableOpacity>

      {/* Modal para exibir as opções de status */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filtrar por Status:</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleSelectStatus("open")}
            >
              <Text style={styles.modalOptionText}>Em Aberto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleSelectStatus("paid")}
            >
              <Text style={styles.modalOptionText}>Pagos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleSelectStatus("")}
            >
              <Text style={styles.modalOptionText}>Todos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.mainButton, styles.exitButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default function DebtorsScreen() {
  const { debtors, removeDebtor, markAsPaid } = useDebtors(); // Usando o contexto de devedores
  const [searchQuery, setSearchQuery] = useState(""); // Estado para a barra de pesquisa
  const [sortType, setSortType] = useState<"amountAsc" | "amountDesc" | "">(""); // Ordenação
  const [statusFilter, setStatusFilter] = useState<"open" | "paid" | "">(""); // Filtro de status

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

        <FlatList
          data={filteredDebtors}
          keyExtractor={(item) => item.id.toString()} // Usar o id como chave
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
    color: "#333",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  modalOptionText: {
    fontSize: 16,
    color: "#333",
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
