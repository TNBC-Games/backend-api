import { Joi } from 'celebrate';

export const registrationSchema = {
    body: Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })
};

export const loginSchema = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
};

// export const resetPasswordSchema = {
//     body: Joi.object({
//         password: Joi.string().min(6).required()
//     })
// };

// export const refreshTokenSChema = {
//     body: Joi.object({
//         refreshToken: Joi.string().required()
//     })
// };
