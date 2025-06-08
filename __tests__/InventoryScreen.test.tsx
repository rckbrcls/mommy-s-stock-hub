import React from "react";
import { render } from "@testing-library/react-native";
import InventoryScreen from "../app/(tabs)/inventory";
jest.mock("@/features/inventory/contexts/InventoryContext", () => require("../__mocks__/InventoryContextMock"));
jest.mock("@/features/settings/contexts/ThemeContext", () => require("../__mocks__/ThemeProviderMock"));
jest.mock("@/features/settings/contexts/TextSizeContext", () => require("../__mocks__/TextSizeContextMock"));

describe("InventoryScreen", () => {
  it("renders inventory list and search bar", () => {
    const { getByPlaceholderText } = render(<InventoryScreen />);
    expect(getByPlaceholderText("Pesquisar por nome do item...")).toBeTruthy();
  });
});
