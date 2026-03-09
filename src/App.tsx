import { useAuth, useAutoSignin } from "react-oidc-context";

import "./App.css";
import { useSpacetimeDBReady } from "./SpacetimeDBReadyContext";
import { Chat } from "./Chat";

function App() {
  const auth = useAuth();
  const spacetimeReady = useSpacetimeDBReady();

  useAutoSignin();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }

  if (!auth.isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  if (!spacetimeReady) {
    return (
      <div className="App">
        <header className="App-header">
          Welcome, {auth.user?.profile.name} (id: {auth.user?.profile.sub})!
          <button onClick={() => auth.signoutRedirect()}>Sign Out</button>
        </header>
        <div>Connecting to chat…</div>
      </div>
    );
  }

  return (
    <div>
      <header className="App-header">
        Welcome, {auth.user?.profile.name} (id: {auth.user?.profile.sub})!
        <button onClick={() => auth.signoutRedirect()}>Sign Out</button>
      </header>
      <Chat />
    </div>
  );
}

export default App;
