"use client";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FirebaseInitErrorProps {
  errorMessage: string;
}

export function FirebaseInitError({ errorMessage }: FirebaseInitErrorProps) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Alert variant="destructive" className="max-w-lg">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Firebase Configuration Error</AlertTitle>
        <AlertDescription>
           <p className="mb-2">Failed to initialize Firebase. Please check your configuration.</p>
          <p className="mb-2"><strong>Details:</strong> {errorMessage}</p>
          <p>Ensure your <code>.env.local</code> file has the correct Firebase project credentials as outlined in the <code>README.md</code> file.</p>
          <p className="mt-2">After correcting the configuration, you may need to restart the development server.</p>
        </AlertDescription>
      </Alert>
    </div>
  );
}
