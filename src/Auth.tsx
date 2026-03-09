import { useMemo } from "react";
import { useAuth } from "react-oidc-context";
import type { Identity } from "spacetimedb";
import { SpacetimeDBProvider } from "spacetimedb/react";
import { DbConnection, type ErrorContext } from "./module_bindings";
import { SpacetimeDBReadyContext } from "./SpacetimeDBReadyContext";

const HOST = import.meta.env.VITE_SPACETIMEDB_HOST ?? "ws://localhost:3000";
const DB_NAME =
  import.meta.env.VITE_SPACETIMEDB_DB_NAME ?? "quickstart-chat-b4974";
const TOKEN_KEY = `${HOST}/${DB_NAME}/auth_token`;

const onConnect = (_conn: DbConnection, identity: Identity, token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  console.log(
    "Connected to SpacetimeDB with identity:",
    identity.toHexString(),
  );
};

const onDisconnect = () => {
  console.log("Disconnected from SpacetimeDB");
};

const onConnectError = (_ctx: ErrorContext, err: Error) => {
  console.log("Error connecting to SpacetimeDB:", err);
};

/** SpacetimeDB often expects the ID token (JWT) for identity; access_token may be opaque. */
function getToken(
  user: { access_token?: string; id_token?: string } | null | undefined,
): string | undefined {
  if (!user) return undefined;
  return user.access_token ?? user.id_token;
}

export function SpacetimeDBWithAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();

  const connectionBuilder = useMemo(() => {
    const token = getToken(auth.user ?? undefined);
    if (!auth.isAuthenticated || !token) return null;
    return DbConnection.builder()
      .withUri(HOST)
      .withDatabaseName(DB_NAME)
      .withToken(token)
      .onConnect(onConnect)
      .onDisconnect(onDisconnect)
      .onConnectError(onConnectError);
  }, [auth.isAuthenticated, auth.user]);

  if (!connectionBuilder) {
    return (
      <SpacetimeDBReadyContext.Provider value={false}>
        {children}
      </SpacetimeDBReadyContext.Provider>
    );
  }
  return (
    <SpacetimeDBProvider connectionBuilder={connectionBuilder}>
      <SpacetimeDBReadyContext.Provider value={true}>
        {children}
      </SpacetimeDBReadyContext.Provider>
    </SpacetimeDBProvider>
  );
}
