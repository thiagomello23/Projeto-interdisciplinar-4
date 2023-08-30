import { create } from "zustand"

interface Store {
  modal: boolean;
  modalData: modalData;
  setModal: (bool: boolean) => void;
  setModalData: (mData: modalData) => void;
}

type modalData = {
  processo: string;
  valor: string|number;
}

export const useStore = create<Store>()((set => ({
  modal: false,
  modalData: {processo: "", valor: ""},
  setModal: (bool: boolean) => set(() => ({modal: bool})),
  setModalData: (mData: modalData) => set(() => ({modalData: mData}))
})))