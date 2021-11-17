import { Joi } from 'celebrate';

export const addGameSchema = {
    body: Joi.object({
        name: Joi.string().required(),
        mainCategory: Joi.string().required(),
        image: Joi.string(),
        categories: Joi.array().items(Joi.object({ category: Joi.string().required() }))
    })
};

export const updateGameSchema = {
    body: Joi.object({
        name: Joi.string(),
        mainCategory: Joi.string(),
        image: Joi.string(),
        categories: Joi.array().items(Joi.object({ category: Joi.string().required() }))
    })
};
