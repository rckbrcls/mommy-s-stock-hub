// components/ConfirmDialog.tsx
import { Alert } from "react-native";

/**
 * Exibe um diálogo de confirmação multiplataforma.
 * No web usa window.confirm, no mobile usa Alert.alert.
 * @param title Título do diálogo
 * @param message Mensagem do diálogo
 * @param onConfirm Função chamada se o usuário confirmar
 * @param confirmText Texto do botão de confirmação (opcional)
 * @param cancelText Texto do botão de cancelar (opcional)
 * @param confirmStyle Estilo do botão de confirmação (opcional)
 */
export function confirmDialog({
  title,
  message,
  onConfirm,
  confirmText = "OK",
  cancelText = "Cancelar",
  confirmStyle = "default",
}: {
  title: string;
  message: string;
  onConfirm: () => void | Promise<void>;
  confirmText?: string;
  cancelText?: string;
  confirmStyle?: "default" | "destructive" | "cancel";
}) {
  if (typeof window !== "undefined" && window.confirm) {
    // Web
    if (window.confirm(message)) {
      onConfirm();
    }
  } else {
    // Mobile
    Alert.alert(title, message, [
      { text: cancelText, style: "cancel" },
      {
        text: confirmText,
        style: confirmStyle,
        onPress: onConfirm,
      },
    ]);
  }
}

/**
 * Exibe um alerta simples multiplataforma.
 * @param title Título do alerta
 * @param message Mensagem do alerta
 * @param buttonText Texto do botão (opcional)
 * @param onClose Função chamada ao fechar (opcional)
 */
export function showAlert({
  title,
  message,
  buttonText = "OK",
  onClose,
}: {
  title: string;
  message: string;
  buttonText?: string;
  onClose?: () => void;
}) {
  if (typeof window !== "undefined" && window.alert) {
    window.alert(message);
    if (onClose) onClose();
  } else {
    Alert.alert(title, message, [{ text: buttonText, onPress: onClose }]);
  }
}
