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
});
