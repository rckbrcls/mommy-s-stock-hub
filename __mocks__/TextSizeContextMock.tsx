import React from "react";

export const TextSizeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;

export const useTextSize = () => ({
  textSize: "medium",
  setTextSize: () => {},
  fontScale: 1,
});
