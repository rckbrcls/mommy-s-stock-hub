import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedInput } from "@/components/ThemedInput";
import { useThemeColor } from "@/features/settings/hooks/useThemeColor";
import { v4 as uuidv4 } from "uuid";
import {
  formatCurrencyInput,
  parseCurrency,
} from "@/features/inventory/hooks/useCurrencyHelpers";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface AddDebtorFormProps {
  addDebtor: (debtor: any) => Promise<void>;
}

export const AddDebtorForm: React.FC<AddDebtorFormProps> = ({ addDebtor }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isDueDatePickerVisible, setDueDatePickerVisible] = useState(false);
  const textColor = useThemeColor({ light: "#222", dark: "#999" }, "text");

  const handleSaveDebtor = async () => {
    if (!name.trim() || !amount.trim()) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }
    const newDebtor = {
      id: uuidv4(),
      name,
      amount: parseCurrency(amount),
      status: "open" as "open",
      startDate: startDate || new Date().toISOString(),
      dueDate,
      paidDate: "",
    };
    await addDebtor(newDebtor);
    Alert.alert("Sucesso", `Devedor "${name}" adicionado!`);
    setName("");
    setAmount("");
    setStartDate("");
    setDueDate("");
  };

  const handleAmountChange = (value: string) => {
    setAmount(formatCurrencyInput(value));
  };

  const handleConfirmStartDate = (date: Date) => {
    setStartDate(date.toISOString().substring(0, 10));
    setStartDatePickerVisible(false);
  };
  const handleConfirmDueDate = (date: Date) => {
    setDueDate(date.toISOString().substring(0, 10));
    setDueDatePickerVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <ThemedText style={styles.label}>Nome do Devedor</ThemedText>
          <ThemedInput
            placeholderTextColor={textColor}
            value={name}
            onChangeText={setName}
            placeholder="Ex: Cliente A"
          />
        </View>
        <View>
          <ThemedText style={styles.label}>Valor Devido</ThemedText>
          <ThemedInput
            placeholderTextColor={textColor}
            value={amount}
            onChangeText={handleAmountChange}
            placeholder="Ex: R$ 100,00"
            keyboardType="numeric"
          />
        </View>
        <View>
          <ThemedText style={styles.label}>Data de Início</ThemedText>
          <TouchableOpacity onPress={() => setStartDatePickerVisible(true)}>
            <ThemedInput
              placeholderTextColor={textColor}
              value={startDate}
              placeholder="AAAA-MM-DD"
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isStartDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmStartDate}
            onCancel={() => setStartDatePickerVisible(false)}
          />
        </View>
        <View>
          <ThemedText style={styles.label}>Prazo para Pagamento</ThemedText>
          <TouchableOpacity onPress={() => setDueDatePickerVisible(true)}>
            <ThemedInput
              placeholderTextColor={textColor}
              value={dueDate}
              placeholder="AAAA-MM-DD"
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDueDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDueDate}
            onCancel={() => setDueDatePickerVisible(false)}
          />
        </View>
        <TouchableOpacity onPress={handleSaveDebtor} style={styles.saveButton}>
          <ThemedText style={styles.saveButtonText}>Salvar Devedor</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, gap: 10 },
  label: { marginBottom: 8, fontSize: 16, fontWeight: "500" },
  saveButton: {
    backgroundColor: "#F5A689",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});
