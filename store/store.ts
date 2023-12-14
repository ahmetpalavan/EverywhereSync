import { create } from "zustand";

interface AppState {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (isOpen: boolean) => void;

  isRenameModalOpen: boolean;
  setIsRenameModalOpen: (isOpen: boolean) => void;

  fileId: string | null;
  setFileId: (id: string) => void;

  filename: string;
  setFilename: (filename: string) => void;
}

export const useStore = create<AppState>((set) => ({
  isDeleteModalOpen: false,
  setIsDeleteModalOpen: (isOpen) => set({ isDeleteModalOpen: isOpen }),

  isRenameModalOpen: false,
  setIsRenameModalOpen: (isOpen) => set({ isRenameModalOpen: isOpen }),

  fileId: null,
  setFileId: (id) => set({ fileId: id }),

  filename: "",
  setFilename: (filename) => set({ filename }),
}));
