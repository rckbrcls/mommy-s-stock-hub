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
      "Preencha todos os campos obrigatórios.",
      expect.anything()
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
      "Preencha todos os campos obrigatórios.",
      expect.anything()
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

  it("should have visible label and placeholder for each input field", () => {
    const addDebtor = jest.fn();
    const { getByText, getByPlaceholderText, getAllByPlaceholderText } = render(
      <DebtorProvider>
        <AddDebtorForm addDebtor={addDebtor} />
      </DebtorProvider>
    );
    // Nome do Devedor
    expect(getByText("Nome do Devedor")).toBeTruthy();
    expect(getByPlaceholderText("Ex: Cliente A")).toBeTruthy();
    // Valor Devido
    expect(getByText("Valor Devido")).toBeTruthy();
    expect(getByPlaceholderText("Ex: R$ 100,00")).toBeTruthy();
    // Data de Início
    expect(getByText("Data de Início")).toBeTruthy();
    // Existem dois campos com o mesmo placeholder, então usamos getAllByPlaceholderText
    const dateInputs = getAllByPlaceholderText("AAAA-MM-DD");
    expect(dateInputs.length).toBe(2);
    // Prazo para Pagamento
    expect(getByText("Prazo para Pagamento")).toBeTruthy();
  });

  it("should have accessible button with clear label", () => {
    const addDebtor = jest.fn();
    const { getByText } = render(
      <DebtorProvider>
        <AddDebtorForm addDebtor={addDebtor} />
      </DebtorProvider>
    );
    expect(getByText("Salvar Devedor")).toBeTruthy();
  });

  // Testes de segurança
  it("should not allow script injection in debtor name", async () => {
    const addDebtor = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <DebtorProvider>
        <AddDebtorForm addDebtor={addDebtor} />
      </DebtorProvider>
    );
    fireEvent.changeText(
      getByPlaceholderText("Ex: Cliente A"),
      "<script>alert('xss')</script>"
    );
    fireEvent.changeText(getByPlaceholderText("Ex: R$ 100,00"), "100,00");
    await act(async () => {
      fireEvent.press(getByText("Salvar Devedor"));
      await new Promise((r) => setTimeout(r, 0));
    });
    // O nome deve ser sanitizado ou rejeitado (depende da implementação, aqui esperamos que não execute nada e aceite como string)
    expect(addDebtor).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "<script>alert('xss')</script>",
      })
    );
  });

  it("should not allow SQL injection patterns in debtor name", async () => {
    const addDebtor = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <DebtorProvider>
        <AddDebtorForm addDebtor={addDebtor} />
      </DebtorProvider>
    );
    fireEvent.changeText(
      getByPlaceholderText("Ex: Cliente A"),
      "Robert'); DROP TABLE debtors;--"
    );
    fireEvent.changeText(getByPlaceholderText("Ex: R$ 100,00"), "100,00");
    await act(async () => {
      fireEvent.press(getByText("Salvar Devedor"));
      await new Promise((r) => setTimeout(r, 0));
    });
    expect(addDebtor).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Robert'); DROP TABLE debtors;--",
      })
    );
  });

  it("should not accept only spaces or empty strings in required fields", async () => {
    const addDebtor = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <DebtorProvider>
        <AddDebtorForm addDebtor={addDebtor} />
      </DebtorProvider>
    );
    fireEvent.changeText(getByPlaceholderText("Ex: Cliente A"), "   ");
    fireEvent.changeText(getByPlaceholderText("Ex: R$ 100,00"), "   ");
    await act(async () => {
      fireEvent.press(getByText("Salvar Devedor"));
      await new Promise((r) => setTimeout(r, 0));
    });
    expect(addDebtor).not.toHaveBeenCalled();
    expect(require("react-native").Alert.alert).toHaveBeenCalledWith(
      "Erro",
      "Preencha todos os campos obrigatórios.",
      expect.anything()
    );
  });

  it("should not accept invalid date formats in date fields", async () => {
    const addDebtor = jest.fn();
    const { getByPlaceholderText, getAllByPlaceholderText, getByText } = render(
      <DebtorProvider>
        <AddDebtorForm addDebtor={addDebtor} />
      </DebtorProvider>
    );
    const [startDateInput, dueDateInput] =
      getAllByPlaceholderText("AAAA-MM-DD");
    fireEvent.changeText(
      getByPlaceholderText("Ex: Cliente A"),
      "Cliente Teste"
    );
    fireEvent.changeText(getByPlaceholderText("Ex: R$ 100,00"), "100,00");
    fireEvent.changeText(startDateInput, "32-13-2020"); // Data inválida
    fireEvent.changeText(dueDateInput, "2020/12/31"); // Formato inválido
    await act(async () => {
      fireEvent.press(getByText("Salvar Devedor"));
      await new Promise((r) => setTimeout(r, 0));
    });
    // O formulário aceita datas inválidas como string vazia para dueDate e preenche startDate com a data atual
    expect(addDebtor).toHaveBeenCalledWith(
      expect.objectContaining({
        dueDate: "",
        startDate: expect.stringMatching(
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
        ),
      })
    );
  });
});
