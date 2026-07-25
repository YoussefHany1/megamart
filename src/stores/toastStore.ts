import { create } from "zustand";

type Severity = "success" | "error" | "warning" | "info";

type ToastState = {
  open: boolean;
  message: string;
  severity: Severity;
  showToast: (message: string, severity?: Severity) => void;
  hideToast: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
  open: false,
  message: "",
  severity: "success",
  showToast: (message, severity = "success") =>
    set({ open: true, message, severity }),
  hideToast: () => set({ open: false }),
}));
