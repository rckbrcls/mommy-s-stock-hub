import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { ThemedInput } from "@/components/ThemedInput";
import { useThemeColor } from "@/features/settings/hooks/useThemeColor";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  onConfirm?: (date: Date) => void;
}

export const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  placeholder = "AAAA-MM-DD",
  label,
  onConfirm,
}) => {
  const textColor = useThemeColor({ light: "#222", dark: "#999" }, "text");
  const [pickerVisible, setPickerVisible] = React.useState(false);
  if (Platform.OS === "web") {
    return (
      <input
        style={{
          padding: 10,
          borderWidth: 1,
          borderStyle: "solid",
          maxWidth: "100%",
          color: textColor,
          background: useThemeColor(
            { light: "#fff", dark: "#222" },
            "background"
          ),
          borderColor: useThemeColor(
            { light: "#DDD", dark: "#444" },
            "borderColor"
          ),
          outline: "none",
          fontSize: 16,
          borderRadius: 8,
          boxShadow: "1px 2px 3px 0px rgba(0,0,0,0.1)",
          marginBottom: 8,
        }}
        placeholder={placeholder}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  return (
    <>
      <TouchableOpacity onPress={() => setPickerVisible(true)}>
        <ThemedInput
          placeholderTextColor={textColor}
          value={value}
          placeholder={placeholder}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={pickerVisible}
        mode="date"
        onConfirm={(date) => {
          onConfirm
            ? onConfirm(date)
            : onChange(date.toISOString().slice(0, 16));
          setPickerVisible(false);
        }}
        onCancel={() => setPickerVisible(false)}
      />
    </>
  );
};
