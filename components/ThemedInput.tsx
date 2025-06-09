import { useThemeColor } from "@/features/settings/hooks/useThemeColor";
import React from "react";
import { StyleSheet, TextInput, TextInputProps, Platform } from "react-native";

interface ThemedInputProps extends TextInputProps {
  placeholder?: string;
}

export const ThemedInput = ({
  style,
  placeholder,
  ...props
}: ThemedInputProps) => {
  const shadowColor = useThemeColor(
    { light: undefined, dark: undefined },
    "shadowColor"
  );

  const borderColor = useThemeColor(
    { light: undefined, dark: undefined },
    "borderColor"
  );

  const backgroundColor = useThemeColor(
    { light: undefined, dark: undefined },
    "background"
  );

  const textColor = useThemeColor({ light: "#222", dark: "#999" }, "text");

  if (Platform.OS === "web") {
    return (
      <input
        style={{
          padding: 10,
          borderWidth: 1,
          borderStyle: "solid",
          maxWidth: "100%",
          color: textColor,
          background: backgroundColor,
          borderColor: borderColor,
          outline: "none",
          fontSize: 16,
          borderRadius: 8,
          boxShadow: "1px 2px 3px 0px rgba(0,0,0,0.1)",
        }}
        placeholder={placeholder}
        onChange={(e) => props.onChangeText?.(e.target.value)}
        value={props.value}
        type="text"
        autoComplete="off"
      />
    );
  }

  return (
    <TextInput
      style={[
        styles.inputStyle,
        style,
        { shadowColor, borderColor, backgroundColor, color: textColor },
      ]}
      placeholderTextColor={textColor}
      placeholder={placeholder}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
});
