import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";
import { StyleSheet, ViewProps } from "react-native";

export const Card = ({ children, style }: ViewProps) => {
  const shadowColor = useThemeColor(
    { light: undefined, dark: undefined },
    "shadowColor"
  );

  return (
    <ThemedView style={[styles.cardStyle, style, { shadowColor }]}>
      {children}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 8,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.01,
    shadowRadius: 4,
    elevation: 5,
  },
});
