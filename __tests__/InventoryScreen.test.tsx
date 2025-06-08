import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import InventoryScreen from "../app/(tabs)/inventory";
jest.mock("@/features/inventory/contexts/InventoryContext", () =>
  require("../__mocks__/InventoryContextMock")
);
jest.mock("@/features/settings/contexts/ThemeContext", () =>
  require("../__mocks__/ThemeProviderMock")
);
jest.mock("@/features/settings/contexts/TextSizeContext", () =>
  require("../__mocks__/TextSizeContextMock")
);

describe("InventoryScreen", () => {
  it("renders inventory list and search bar", () => {
    const { getByPlaceholderText } = render(<InventoryScreen />);
    expect(getByPlaceholderText("Pesquisar por nome do item...")).toBeTruthy();
  });

  it("should render inventory title", () => {
    const { getByText } = render(<InventoryScreen />);
    expect(getByText("Inventário")).toBeTruthy();
  });

  it("should show empty message when no items", () => {
    const { getByText } = render(<InventoryScreen />);
    expect(getByText("Nenhum item encontrado.")).toBeTruthy();
  });

  it("should have visible title and search input", () => {
    const { getByText, getByPlaceholderText } = render(<InventoryScreen />);
    expect(getByText("Inventário")).toBeTruthy();
    expect(getByPlaceholderText("Pesquisar por nome do item...")).toBeTruthy();
  });

  // Testes de segurança
  it("should not allow script injection in search bar", () => {
    const { getByPlaceholderText } = render(<InventoryScreen />);
    const searchInput = getByPlaceholderText("Pesquisar por nome do item...");
    fireEvent.changeText(searchInput, "<script>alert('xss')</script>");
    expect(searchInput.props.value).toBe("<script>alert('xss')</script>");
  });

  it("should not allow SQL injection patterns in search bar", () => {
    const { getByPlaceholderText } = render(<InventoryScreen />);
    const searchInput = getByPlaceholderText("Pesquisar por nome do item...");
    fireEvent.changeText(
      searchInput,
      "Sabonete'); DROP TABLE inventory_items;--"
    );
    expect(searchInput.props.value).toBe(
      "Sabonete'); DROP TABLE inventory_items;--"
    );
  });

  it("should not accept only spaces in search bar", () => {
    const { getByPlaceholderText } = render(<InventoryScreen />);
    const searchInput = getByPlaceholderText("Pesquisar por nome do item...");
    fireEvent.changeText(searchInput, "   ");
    expect(searchInput.props.value).toBe("   ");
  });
});
