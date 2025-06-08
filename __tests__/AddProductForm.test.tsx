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
import { render, fireEvent } from "@testing-library/react-native";

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
});
