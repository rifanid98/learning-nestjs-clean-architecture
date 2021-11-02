import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  TYPEORM_CONNECTION: Joi.string().required(),
  TYPEORM_HOST: Joi.string().required(),
  TYPEORM_USERNAME: Joi.string().required(),
  TYPEORM_PASSWORD: Joi.string().required(),
  TYPEORM_DATABASE: Joi.string().required(),
  TYPEORM_PORT: Joi.string().required(),
  TYPEORM_SYNCHRONIZE: Joi.string().required(),
  TYPEORM_LOGGING: Joi.string().required(),
  TYPEORM_AUTOLOAD_ENTITIES: Joi.string().required(),
  TYPEORM_ENTITIES: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
