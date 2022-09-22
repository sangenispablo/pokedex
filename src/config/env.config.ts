// esta funcion autoinvocada levanta las variables de entorno
// la estoy pasando al app.module por medio de ConfigModule
export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || '3002',
  defaultLimit: +process.env.DEFAULT_LIMIT || 20,
});
