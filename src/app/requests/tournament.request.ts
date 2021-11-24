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
