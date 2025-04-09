import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Debtor {
  id: number;
  name: string;
  amount: number;
  status: "open" | "paid";
}

interface DebtorContextProps {
  debtors: Debtor[];
  addDebtor: (debtor: Debtor) => Promise<void>;
  updateDebtor: (index: number, updatedDebtor: Debtor) => Promise<void>;
  removeDebtor: (index: number) => Promise<void>;
  markAsPaid: (index: number) => Promise<void>;
}

const DebtorContext = createContext<DebtorContextProps | undefined>(undefined);

export const DebtorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [debtors, setDebtors] = useState<Debtor[]>([]);

  // Carregar devedores do AsyncStorage ao montar o contexto
  useEffect(() => {
    const loadDebtors = async () => {
      const storedDebtors = await AsyncStorage.getItem("debtors");
      setDebtors(storedDebtors ? JSON.parse(storedDebtors) : []);
    };
    loadDebtors();
  }, []);

  // Salvar devedores no AsyncStorage
  const saveDebtorsToStorage = async (newDebtors: Debtor[]) => {
    setDebtors(newDebtors);
    await AsyncStorage.setItem("debtors", JSON.stringify(newDebtors));
  };

  // Adicionar devedor
  const addDebtor = async (debtor: Debtor) => {
    const updatedDebtors = [...debtors, debtor];
    await saveDebtorsToStorage(updatedDebtors);
  };

  // Atualizar devedor
  const updateDebtor = async (index: number, updatedDebtor: Debtor) => {
    const updatedDebtors = [...debtors];
    updatedDebtors[index] = updatedDebtor;
    await saveDebtorsToStorage(updatedDebtors);
  };

  // Remover devedor
  const removeDebtor = async (index: number) => {
    const updatedDebtors = [...debtors];
    updatedDebtors.splice(index, 1);
    await saveDebtorsToStorage(updatedDebtors);
  };

  // Marcar devedor como pago
  const markAsPaid = async (index: number) => {
    const updatedDebtors = [...debtors];
    updatedDebtors[index].status = "paid";
    await saveDebtorsToStorage(updatedDebtors);
  };

  return (
    <DebtorContext.Provider
      value={{
        debtors,
        addDebtor,
        updateDebtor,
        removeDebtor,
        markAsPaid,
      }}
    >
      {children}
    </DebtorContext.Provider>
  );
};

export const useDebtors = () => {
  const context = useContext(DebtorContext);
  if (!context) {
    throw new Error("useDebtors must be used within a DebtorProvider");
  }
  return context;
};
