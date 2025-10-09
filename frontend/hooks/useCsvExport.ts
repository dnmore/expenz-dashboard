"use client";
import * as React from "react";

export function useCsvExport(endpoint: string, filename: string) {
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const exportCsv = async () => {
    try {
      setIsPending(true);
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Failed to export CSV");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting CSV", error);
    } finally {
      setIsPending(false);
    }
  };

  return { exportCsv, isPending };
}
