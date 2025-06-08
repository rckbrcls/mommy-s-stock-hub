import { useThemeColor } from "@/features/settings/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";
import { StyleSheet, ViewProps } from "react-native";

export const Card = ({ children, style }: ViewProps) => {
  const shadowColor = useThemeColor(
    { light: undefined, dark: undefined },
    "shadowColor"
  );

  const borderColor = useThemeColor(
    { light: undefined, dark: undefined },
    "borderColor"
  );

  return (
    <ThemedView style={[styles.cardStyle, style, { shadowColor, borderColor }]}>
      {children}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 8,
    padding: 16,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 1,
  },
});
