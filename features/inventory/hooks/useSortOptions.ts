import { useState } from "react";

export function useSortOptions<T extends string>(initial: T | "" = "") {
  const [sortType, setSortType] = useState<T | "">(initial);
  const [modalVisible, setModalVisible] = useState(false);

  function openModal() {
    setModalVisible(true);
  }
  function closeModal() {
    setModalVisible(false);
  }
  function selectSort(type: T | "") {
    setSortType(type);
    setModalVisible(false);
  }

  return {
    sortType,
    setSortType,
    modalVisible,
    openModal,
    closeModal,
    selectSort,
  };
}
