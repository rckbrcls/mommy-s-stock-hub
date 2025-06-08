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
import { render, fireEvent } from "@testing-library/react-native";

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
});
