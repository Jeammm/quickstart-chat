import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "react-oidc-context";
import { oidcConfig } from "./oidc.js";
import { OidcDebug } from "./OidcDebug.tsx";
import { SpacetimeDBWithAuth } from "./Auth.tsx";
import { LogoutCallback } from "./LogoutCallback.tsx";

function onSigninCallback() {
  window.history.replaceState({}, document.title, window.location.pathname);
}

const isLogoutCallback = window.location.pathname === "/logout/callback";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider {...oidcConfig} onSigninCallback={onSigninCallback}>
      <OidcDebug />
      {isLogoutCallback ? (
        <LogoutCallback />
      ) : (
        <SpacetimeDBWithAuth>
          <App />
        </SpacetimeDBWithAuth>
      )}
    </AuthProvider>
  </StrictMode>,
);
