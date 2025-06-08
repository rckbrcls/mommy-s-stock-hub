import React, { createContext, useContext, useState, ReactNode } from "react";

export type TextSize = "small" | "medium" | "large";

const defaultFontSizes = {
  small: 0.85,
  medium: 1,
  large: 1.25,
};

interface TextSizeContextProps {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  fontScale: number;
}

const TextSizeContext = createContext<TextSizeContextProps | undefined>(
  undefined
);

export function TextSizeProvider({ children }: { children: ReactNode }) {
  const [textSize, setTextSize] = useState<TextSize>("medium");
  const fontScale = defaultFontSizes[textSize];

  return (
    <TextSizeContext.Provider value={{ textSize, setTextSize, fontScale }}>
      {children}
    </TextSizeContext.Provider>
  );
}

export function useTextSize() {
  const context = useContext(TextSizeContext);
  if (!context)
    throw new Error("useTextSize must be used within a TextSizeProvider");
  return context;
}
