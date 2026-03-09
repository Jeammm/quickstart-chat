export const oidcConfig = {
  authority: "https://auth.spacetimedb.com/oidc",
  client_id: "client_032f54YPp8By1cb4Lhwgew",
  redirect_uri: `${window.location.origin}/callback`, // Where the user is redirected after login
  post_logout_redirect_uri: `${window.location.origin}/logout/callback`, // Where the user is redirected after logout
  scope: "openid profile email",
  response_type: "code",
  automaticSilentRenew: true,
} as const;
