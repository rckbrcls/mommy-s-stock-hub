jest.mock("@/features/settings/contexts/ThemeContext", () => {
  const React = require("react");
  return {
    ThemeProvider: (props: { children: React.ReactNode }) => (
      <React.Fragment>{props.children}</React.Fragment>
    ),
    useTheme: () => ({ isDarkTheme: false, toggleTheme: () => {} }),
  };
});
jest.mock("@/features/settings/contexts/TextSizeContext", () =>
  require("../__mocks__/TextSizeContextMock")
);

import { AddDebtorForm } from "@/features/add/components/AddDebtorForm";
import { DebtorProvider } from "../__mocks__/DebtorContextMock";
import { render, fireEvent, act } from "@testing-library/react-native";

describe("AddDebtorForm", () => {
  beforeAll(() => {
    jest
      .spyOn(require("react-native").Alert, "alert")
      .mockImplementation(jest.fn());
  });

  it("should show error if required fields are empty", async () => {
    const addDebtor = jest.fn();
    const { getByText } = render(
      <DebtorProvider>
        <AddDebtorForm addDebtor={addDebtor} />
      </DebtorProvider>
    );
    fireEvent.press(getByText("Salvar Devedor"));
    expect(require("react-native").Alert.alert).toHaveBeenCalledWith(
      "Erro",
      "Preencha todos os campos obrigatórios."
    );
  });

  it("should call addDebtor with correct data when all fields are filled and Salvar Devedor is pressed", async () => {
    const addDebtor = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <DebtorProvider>
        <AddDebtorForm addDebtor={addDebtor} />
      </DebtorProvider>
    );
    fireEvent.changeText(
      getByPlaceholderText("Ex: Cliente A"),
      "Cliente Teste"
    );
    fireEvent.changeText(getByPlaceholderText("Ex: R$ 100,00"), "150,00");
    await act(async () => {
      fireEvent.press(getByText("Salvar Devedor"));
      await new Promise((r) => setTimeout(r, 0));
    });
    expect(addDebtor).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Cliente Teste",
        amount: 150,
        status: "open",
      })
    );
  });

  it("should show error and not call addDebtor if amount is invalid or empty", async () => {
    const addDebtor = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <DebtorProvider>
        <AddDebtorForm addDebtor={addDebtor} />
      </DebtorProvider>
    );
    fireEvent.changeText(
      getByPlaceholderText("Ex: Cliente A"),
      "Cliente Teste"
    );
    fireEvent.changeText(getByPlaceholderText("Ex: R$ 100,00"), "abc");
    await act(async () => {
      fireEvent.press(getByText("Salvar Devedor"));
      await new Promise((r) => setTimeout(r, 0));
    });
    expect(addDebtor).not.toHaveBeenCalled();
    expect(require("react-native").Alert.alert).toHaveBeenCalledWith(
      "Erro",
      "Preencha todos os campos obrigatórios."
    );
  });

  it("should clear fields after successful add", async () => {
    const addDebtor = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <DebtorProvider>
        <AddDebtorForm addDebtor={addDebtor} />
      </DebtorProvider>
    );
    fireEvent.changeText(
      getByPlaceholderText("Ex: Cliente A"),
      "Cliente Teste"
    );
    fireEvent.changeText(getByPlaceholderText("Ex: R$ 100,00"), "150,00");
    await act(async () => {
      fireEvent.press(getByText("Salvar Devedor"));
      await new Promise((r) => setTimeout(r, 0));
    });
    expect(getByPlaceholderText("Ex: Cliente A").props.value).toBe("");
    expect(getByPlaceholderText("Ex: R$ 100,00").props.value).toBe("");
  });
});
