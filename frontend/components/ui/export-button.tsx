"use client";

import { useCsvExport } from "@/hooks/useCsvExport";
import { Button } from "./button";
import { Loader2 } from "lucide-react";


export function ExportCsvButton({
  endpoint,
  filename,
  label,
}: {
  endpoint: string;
  filename: string;
  label: string;
}) {
  const { exportCsv, isPending } = useCsvExport(endpoint, filename);

  return (
    <Button
      onClick={exportCsv}
      size="lg"
      variant="outline"
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Exporting CSV...
        </>
      ) : (
        label
      )}
    </Button>
  );
}
