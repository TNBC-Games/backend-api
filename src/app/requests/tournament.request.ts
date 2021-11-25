import { Joi } from 'celebrate';

export const createTournamentSchema = {
    body: Joi.object({
        name: Joi.string().required(),
        prize: Joi.number().required(),
        fee: Joi.number().required(),
        limit: Joi.number().required(),
        startDate: Joi.string().required(),
        info: Joi.string().required(),
        type: Joi.string().required(),
        rules: Joi.string(),
        howToApply: Joi.string().required(),
        game: Joi.string().required()
    })
};

export const updateTournamentSchema = {
    body: Joi.object({
        name: Joi.string(),
        prize: Joi.number(),
        fee: Joi.number(),
        limit: Joi.number(),
        startDate: Joi.string(),
        info: Joi.string(),
        type: Joi.string(),
        rules: Joi.string(),
        howToApply: Joi.string(),
        game: Joi.string()
    })
};
