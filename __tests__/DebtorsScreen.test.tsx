import React from "react";
import { render } from "@testing-library/react-native";
import DebtorsScreen from "../app/(tabs)/debtors";

jest.mock("@/features/debtors/contexts/DebtorContext", () =>
  require("../__mocks__/DebtorContextMock")
);
jest.mock("@/features/settings/contexts/ThemeContext", () =>
  require("../__mocks__/ThemeProviderMock")
);
jest.mock("@/features/settings/contexts/TextSizeContext", () =>
  require("../__mocks__/TextSizeContextMock")
);

describe("DebtorsScreen", () => {
  it("renders debtors list and search bar", () => {
    const { getByPlaceholderText } = render(<DebtorsScreen />);
    expect(getByPlaceholderText("Pesquisar devedores...")).toBeTruthy();
  });

  it("should render debtors list", () => {
    const { getByText } = render(<DebtorsScreen />);
    expect(getByText(/Devedores/i)).toBeTruthy();
  });

  it("should show empty message when no debtors", () => {
    const { getByText } = render(<DebtorsScreen />);
    expect(getByText(/Nenhum devedor encontrado/i)).toBeTruthy();
  });

  it("should have visible title and search input", () => {
    const { getByText, getByPlaceholderText } = render(<DebtorsScreen />);
    expect(getByText("Devedores")).toBeTruthy();
    expect(getByPlaceholderText("Pesquisar devedores...")).toBeTruthy();
  });
});
