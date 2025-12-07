const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN || "";
const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "369r0jq8ac35oc8euioocqgrj2";
const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "us-east-1_DtnocJvlT";

const region = userPoolId.split("_")[0];

export const cognitoConfig = {
  authority: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`,
  client_id: clientId,
  redirect_uri: typeof window !== "undefined" ? window.location.origin : "",
  post_logout_redirect_uri:
    typeof window !== "undefined" ? window.location.origin : "",
  response_type: "code" as const,
  scope: "openid email",
  automaticSilentRenew: true,
};

export { cognitoDomain };