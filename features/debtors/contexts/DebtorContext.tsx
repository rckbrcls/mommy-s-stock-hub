import React, { createContext, useContext, useState, useEffect } from "react";

import WDebtor from "../models/Debtor";
import { database } from "@/database";

interface Debtor {
  id: string;
  name: string;
  amount: number;
  status: "open" | "paid";
}

interface DebtorContextProps {
  debtors: Debtor[];
  addDebtor: (debtor: Debtor) => Promise<void>;
  updateDebtor: (id: string, updatedDebtor: Debtor) => Promise<void>;
  removeDebtor: (id: string) => Promise<void>;
  markAsPaid: (id: string) => Promise<void>;
}

const DebtorContext = createContext<DebtorContextProps | undefined>(undefined);

export const DebtorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [debtors, setDebtors] = useState<Debtor[]>([]);
  const [version, setVersion] = useState(0); // força atualização

  useEffect(() => {
    const collection = database.get<WDebtor>("debtors");
    const sub = collection
      .query()
      .observe()
      .subscribe((allDebtors) => {
        setDebtors(
          allDebtors.map((d) => ({
            id: d.id,
            name: d.name,
            amount: d.amount,
            status: d.status as "open" | "paid",
          }))
        );
      });
    return () => sub.unsubscribe();
  }, [version]);

  // Adicionar devedor
  const addDebtor = async (debtor: Debtor) => {
    await database.write(async () => {
      await database.get<WDebtor>("debtors").create((d) => {
        d.name = debtor.name;
        d.amount = debtor.amount;
        d.status = debtor.status;
      });
    });
    setVersion((v) => v + 1);
  };

  // Atualizar devedor
  const updateDebtor = async (id: string, updatedDebtor: Debtor) => {
    await database.write(async () => {
      const debtor = await database.get<WDebtor>("debtors").find(id);
      await debtor.update((d) => {
        d.name = updatedDebtor.name;
        d.amount = updatedDebtor.amount;
        d.status = updatedDebtor.status;
      });
    });
    setVersion((v) => v + 1);
  };

  // Remover devedor
  const removeDebtor = async (id: string) => {
    await database.write(async () => {
      const debtor = await database.get<WDebtor>("debtors").find(id);
      await debtor.markAsDeleted();
      await debtor.destroyPermanently();
    });
    setVersion((v) => v + 1);
  };

  // Marcar devedor como pago
  const markAsPaid = async (id: string) => {
    await database.write(async () => {
      const debtor = await database.get<WDebtor>("debtors").find(id);
      await debtor.update((d) => {
        d.status = "paid";
      });
    });
    setVersion((v) => v + 1);
  };

  return (
    <DebtorContext.Provider
      value={{
        debtors: [...debtors], // sempre novo array
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
