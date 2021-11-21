import { Joi } from 'celebrate';

export const updateUserSchema = {
    body: Joi.object({
        username: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string().min(6)
    })
};
