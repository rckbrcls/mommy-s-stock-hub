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

import React from "react";
import { AddProductForm } from "@/features/add/components/AddProductForm";
import { InventoryProvider } from "../__mocks__/InventoryContextMock";
import { render, fireEvent, act } from "@testing-library/react-native";

describe("AddProductForm", () => {
  beforeAll(() => {
    jest
      .spyOn(require("react-native").Alert, "alert")
      .mockImplementation(jest.fn());
  });

  it("should show error if required fields are empty", async () => {
    const addItem = jest.fn();
    const items: any[] = [];
    const { getByText } = render(
      <InventoryProvider>
        <AddProductForm addItem={addItem} items={items} />
      </InventoryProvider>
    );
    fireEvent.press(getByText("Salvar Produto"));
    expect(require("react-native").Alert.alert).toHaveBeenCalledWith(
      "Erro",
      "Preencha todos os campos obrigatórios."
    );
  });
  it("should call addItem with correct data when all fields are filled and Salvar Produto is pressed", async () => {
    const addItem = jest.fn();
    const items: any[] = [];
    const { getByPlaceholderText, getByText } = render(
      <InventoryProvider>
        <AddProductForm addItem={addItem} items={items} />
      </InventoryProvider>
    );
    fireEvent.changeText(getByPlaceholderText("Ex: Sabonete"), "Sabonete");
    fireEvent.changeText(getByPlaceholderText("Ex: Higiene"), "Higiene");
    fireEvent.changeText(getByPlaceholderText("Ex: 10"), "5");
    fireEvent.changeText(getByPlaceholderText("Ex: R$ 5,99"), "7,99");
    fireEvent.changeText(
      getByPlaceholderText("Ex: Prateleira 2"),
      "Prateleira 2"
    );
    await act(async () => {
      fireEvent.press(getByText("Salvar Produto"));
      await new Promise((r) => setTimeout(r, 0)); // aguarda promessas internas
    });
    expect(addItem).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Sabonete",
        category: "Higiene",
        quantity: 5,
        price: 7.99,
        location: "Prateleira 2",
      })
    );
  });
  it("should add product with price 0 if price is invalid or empty", async () => {
    const addItem = jest.fn();
    const items: any[] = [];
    const { getByPlaceholderText, getByText } = render(
      <InventoryProvider>
        <AddProductForm addItem={addItem} items={items} />
      </InventoryProvider>
    );
    fireEvent.changeText(getByPlaceholderText("Ex: Sabonete"), "Sabonete");
    fireEvent.changeText(getByPlaceholderText("Ex: Higiene"), "Higiene");
    fireEvent.changeText(getByPlaceholderText("Ex: 10"), "5");
    fireEvent.changeText(getByPlaceholderText("Ex: R$ 5,99"), "abc"); // preço inválido
    fireEvent.changeText(
      getByPlaceholderText("Ex: Prateleira 2"),
      "Prateleira 2"
    );
    await act(async () => {
      fireEvent.press(getByText("Salvar Produto"));
      await new Promise((r) => setTimeout(r, 0));
    });
    expect(addItem).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Sabonete",
        category: "Higiene",
        quantity: 5,
        price: 0,
        location: "Prateleira 2",
      })
    );
  });

  it("should clear fields after successful add", async () => {
    const addItem = jest.fn();
    const items: any[] = [];
    const { getByPlaceholderText, getByText } = render(
      <InventoryProvider>
        <AddProductForm addItem={addItem} items={items} />
      </InventoryProvider>
    );
    fireEvent.changeText(getByPlaceholderText("Ex: Sabonete"), "Sabonete");
    fireEvent.changeText(getByPlaceholderText("Ex: Higiene"), "Higiene");
    fireEvent.changeText(getByPlaceholderText("Ex: 10"), "5");
    fireEvent.changeText(getByPlaceholderText("Ex: R$ 5,99"), "7,99");
    fireEvent.changeText(
      getByPlaceholderText("Ex: Prateleira 2"),
      "Prateleira 2"
    );
    await act(async () => {
      fireEvent.press(getByText("Salvar Produto"));
      await new Promise((r) => setTimeout(r, 0));
    });
    expect(getByPlaceholderText("Ex: Sabonete").props.value).toBe("");
    expect(getByPlaceholderText("Ex: Higiene").props.value).toBe("");
    expect(getByPlaceholderText("Ex: 10").props.value).toBe("");
    expect(getByPlaceholderText("Ex: R$ 5,99").props.value).toBe("");
    expect(getByPlaceholderText("Ex: Prateleira 2").props.value).toBe("");
  });
  it("should have visible label and placeholder for each input field", () => {
    const addItem = jest.fn();
    const items: any[] = [];
    const { getByText, getByPlaceholderText } = render(
      <InventoryProvider>
        <AddProductForm addItem={addItem} items={items} />
      </InventoryProvider>
    );
    // Nome do Produto
    expect(getByText("Nome do Produto")).toBeTruthy();
    expect(getByPlaceholderText("Ex: Sabonete")).toBeTruthy();
    // Categoria
    expect(getByText("Categoria")).toBeTruthy();
    expect(getByPlaceholderText("Ex: Higiene")).toBeTruthy();
    // Quantidade
    expect(getByText("Quantidade")).toBeTruthy();
    expect(getByPlaceholderText("Ex: 10")).toBeTruthy();
    // Preço
    expect(getByText("Preço (opcional)")).toBeTruthy();
    expect(getByPlaceholderText("Ex: R$ 5,99")).toBeTruthy();
    // Localização
    expect(getByText("Localização (opcional)")).toBeTruthy();
    expect(getByPlaceholderText("Ex: Prateleira 2")).toBeTruthy();
  });

  it("should have accessible button with clear label", () => {
    const addItem = jest.fn();
    const items: any[] = [];
    const { getByText } = render(
      <InventoryProvider>
        <AddProductForm addItem={addItem} items={items} />
      </InventoryProvider>
    );
    expect(getByText("Salvar Produto")).toBeTruthy();
  });
});
