import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ClerkProvider } from "@clerk/react";
import { env } from "./lib/env.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={env.clerkPublishableKey as string}>
      <App />
    </ClerkProvider>
  </StrictMode>,
);
