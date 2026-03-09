import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

export function LogoutCallback() {
  const auth = useAuth();

  useEffect(() => {
    auth
      .removeUser()
      .catch((err) => {
        console.error("Error during logout callback:", err);
      })
      .finally(() => {
        window.history.replaceState({}, document.title, "/");
      });
  }, [auth]);

  return <div>Signing you out...</div>;
}

