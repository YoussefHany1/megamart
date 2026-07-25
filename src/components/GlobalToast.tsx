"use client";

import { Snackbar, Alert } from "@mui/material";
import { useToastStore } from "@/stores/toastStore";

export default function GlobalToast() {
  const { open, message, severity, hideToast } = useToastStore();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    hideToast();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
