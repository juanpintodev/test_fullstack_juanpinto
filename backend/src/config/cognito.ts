import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const region = process.env.AWS_REGION || "us-east-1";
const userPoolId = process.env.COGNITO_USER_POOL_ID || "us-east-1_DtnocJvlT";
const cognitoIssuer = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`;

const client = jwksClient({
  jwksUri: `${cognitoIssuer}/.well-known/jwks.json`,
  requestHeaders: {},
  timeout: 30000,
});

function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      return callback(err);
    }
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
}

export interface CognitoDecodedToken {
  sub: string;
  email?: string;
  "cognito:username"?: string;
  email_verified?: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
}

export async function verifyCognitoToken(
  token: string
): Promise<CognitoDecodedToken> {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getKey,
      {
        issuer: cognitoIssuer,
        algorithms: ["RS256"],
      },
      (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded as CognitoDecodedToken);
      }
    );
  });
}

