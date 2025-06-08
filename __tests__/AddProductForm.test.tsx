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
});
