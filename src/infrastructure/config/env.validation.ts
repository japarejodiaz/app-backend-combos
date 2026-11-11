import * as Joi from 'joi';

export const envValidationSchema = Joi.object({

    APP_NAME: Joi.string().required(),

    APP_PORT: Joi.number().required(),

    APP_ENV: Joi.string()
        .valid(
            'develop',
            'test',
            'production'
        )
        .required(),

    API_PREFIX: Joi.string().required(),

    DB_HOST: Joi.string().required(),

    DB_PORT: Joi.number().required(),

    DB_USERNAME: Joi.string().required(),

    DB_PASSWORD: Joi.string().required(),

    DB_DATABASE: Joi.string().required(),

    JWT_SECRET: Joi.string().required(),

    JWT_EXPIRES_IN: Joi.string().required(),

});