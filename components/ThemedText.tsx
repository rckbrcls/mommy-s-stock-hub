import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/features/settings/hooks/useThemeColor";
import { useTextSize } from "@/features/settings/contexts/TextSizeContext";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const { fontScale } = useTextSize();

  return (
    <Text
      style={[
        { color },
        type === "default"
          ? {
              ...styles.default,
              fontSize: styles.default.fontSize * fontScale,
              lineHeight: styles.default.lineHeight * fontScale,
            }
          : undefined,
        type === "title"
          ? {
              ...styles.title,
              fontSize: styles.title.fontSize * fontScale,
              lineHeight: styles.title.lineHeight * fontScale,
            }
          : undefined,
        type === "defaultSemiBold"
          ? {
              ...styles.defaultSemiBold,
              fontSize: styles.defaultSemiBold.fontSize * fontScale,
              lineHeight: styles.defaultSemiBold.lineHeight * fontScale,
            }
          : undefined,
        type === "subtitle"
          ? {
              ...styles.subtitle,
              fontSize: styles.subtitle.fontSize * fontScale,
              lineHeight: styles.subtitle.lineHeight * fontScale,
            }
          : undefined,
        type === "link"
          ? {
              ...styles.link,
              fontSize: styles.link.fontSize * fontScale,
              lineHeight: styles.link.lineHeight * fontScale,
            }
          : undefined,
        ...(Array.isArray(style)
          ? style.map((s) =>
              s && typeof s === "object"
                ? Object.fromEntries(
                    Object.entries(s).filter(
                      ([k]) => k !== "fontSize" && k !== "lineHeight"
                    )
                  )
                : s
            )
          : style && typeof style === "object"
          ? [
              Object.fromEntries(
                Object.entries(style).filter(
                  ([k]) => k !== "fontSize" && k !== "lineHeight"
                )
              ),
            ]
          : style
          ? [style]
          : []),
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 28,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
