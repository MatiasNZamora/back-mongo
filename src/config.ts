import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DB_NAME,
      port: process.env.DB_PORT,
    },
    mongo: {
      dbName: process.env.MONGODB,
      user: process.env.MONGO_ROOT_USER,
      password: process.env.MONGO_ROOT_PASS,
      port: parseInt(process.env.MONGO_PORT, 10),
      host: process.env.MONGO_HOST,
      connection: process.env.MONGO_CONNECTION,
    },
    apiKey: process.env.APIKEY,
    jwtSecret: process.env.JWTSECRET,
  };
});
