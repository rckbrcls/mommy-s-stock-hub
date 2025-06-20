import React from "react";
import { Card } from "@/components/Card";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, StyleSheet } from "react-native";
import { useThemeColor } from "@/features/settings/hooks/useThemeColor";

interface SearchBarDebtorsProps {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
}

export const SearchBarDebtors: React.FC<SearchBarDebtorsProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const textColor = useThemeColor({ light: "#222", dark: "#999" }, "text");
  return (
    <Card style={styles.card}>
      <Ionicons
        name="search"
        size={20}
        color={textColor}
        style={{ marginRight: 8 }}
      />
      <TextInput
        style={[styles.input, { color: textColor }]}
        placeholder="Pesquisar devedores..."
        placeholderTextColor={textColor}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
  },
  input: {
    backgroundColor: "transparent",
    flex: 1,
  },
});
