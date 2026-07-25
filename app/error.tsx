"use client";

import { useEffect } from "react";
import { Button } from "@mui/material";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Something went wrong!
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        We encountered an unexpected error while trying to load this page. Please
        try again or return to the homepage.
      </p>
      <div className="flex gap-4">
        <Button
          variant="contained"
          color="primary"
          onClick={() => reset()}
          className="bg-primary hover:bg-blue-600"
        >
          Try Again
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => (window.location.href = "/")}
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}
