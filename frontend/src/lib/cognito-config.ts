const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN || "";
const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "";
const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "";
const envAuthority = process.env.NEXT_PUBLIC_COGNITO_AUTHORITY || "";

let authority = envAuthority;
if (!authority) {
  if (!userPoolId) {
    console.error("NEXT_PUBLIC_COGNITO_AUTHORITY or NEXT_PUBLIC_COGNITO_USER_POOL_ID is missing from the environment variables");
  } else {
    const region = userPoolId.split("_")[0];
    authority = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`;
  }
}

export const cognitoConfig = {
  authority,
  client_id: clientId,
  redirect_uri: typeof window !== "undefined" ? window.location.origin : "",
  post_logout_redirect_uri:
    typeof window !== "undefined" ? window.location.origin : "",
  response_type: "code" as const,
  scope: "openid email",
  automaticSilentRenew: true,
};

export { cognitoDomain };