import React from "react";
import { Card } from "@/components/Card";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
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
        placeholder="Pesquisar por nome do item..."
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
