import "dotenv/config";

export enum EnvType {
  DEVELOPMENT = "development",
  TESTING = "testing",
  PRODUCTION = "production",
}

export const getEnvType = () => {
  const env = process.env.API_ENV;

  return env === "production"
    ? EnvType.PRODUCTION
    : env === "testing"
    ? EnvType.TESTING
    : EnvType.DEVELOPMENT;
};

export interface Config {
  hostName: string;
  jwtPrivateKey: string;
  database: {
    user: string;
    userPassword: string;
    name: string;
    host: string;
    port: number;
  };
  api: {
    port: number;
    env: EnvType;
    secretKey: string;
  };
  aws: {
    s3: {
      name: string;
      region: string;
      secretKey: string;
      secretAccessKey: string;
    };
  };
}

const config: Config = {
  hostName: String(process.env.HOST_NAME),
  jwtPrivateKey: String(process.env.JWT_PRIVATE_KEY),
  database: {
    name: String(process.env.DB_NAME),
    user: String(process.env.DB_USER),
    userPassword: String(process.env.DB_USER_PASSWORD),
    host: String(process.env.DB_HOST),
    port: Math.floor(Number(process.env.DB_PORT)),
  },
  api: {
    env: getEnvType(),
    port: Math.floor(Number(process.env.API_PORT)),
    secretKey: String(process.env.API_SECRET_KEY),
  },
  aws: {
    s3: {
      name: String(process.env.AWS_BUCKET_NAME),
      region: String(process.env.AWS_BUCKET_REGION),
      secretKey: String(process.env.AWS_SECRET_KEY),
      secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
    },
  },
};

export default config;
