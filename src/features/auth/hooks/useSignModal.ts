import { useState, useEffect } from "react";

export function useSignModal(show: boolean) {
  const [view, setView] = useState("signin");

  useEffect(() => {
    if (show) {
      setView("signin");
    }
  }, [show]);

  return {
    view,
    setView,
  };
}
